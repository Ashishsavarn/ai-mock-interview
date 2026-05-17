"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic, WebcamIcon } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { WebCamContext } from "@/app/dashboard/layout";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define constants for retry logic
const MAX_TRANSCRIPTION_RETRIES = 3;
const BASE_DELAY_MS = 1000; // 1 second

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Initialize the Gemini AI client
  // Ensure NEXT_PUBLIC_GEMINI_API_KEY is correctly set in your .env file
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  useEffect(() => {
    // Only process answer if recording has stopped and there's content
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer, isRecording]); // Depend on both userAnswer and isRecording

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast("Recording started...");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast("Recording stopped. Transcribing...");
    }
  };

  // --- Transcribe Audio with Retry Logic ---
  const transcribeAudio = async (audioBlob) => {
    setLoading(true);
    let retries = 0;

    // Helper function to perform the transcription API call
    const callTranscriptionAPI = async (base64Audio) => {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const result = await model.generateContent([
        "Transcribe the following audio:",
        { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
      ]);
      
      return result.response.text();
    };

    while (retries < MAX_TRANSCRIPTION_RETRIES) {
      try {
        // Convert audio blob to base64 inside the loop for clarity
        const base64Audio = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
          };
          reader.onerror = reject;
        });

        const transcription = await callTranscriptionAPI(base64Audio);
        setUserAnswer((prevAnswer) => (prevAnswer ? prevAnswer + " " + transcription : transcription));
        setLoading(false);
        toast("Transcription successful!");
        return; // Exit on success

      } catch (error) {
        // Check for 503 error (or any error where you want to retry)
        if (error.message.includes('503') || error.message.includes('overloaded')) {
          retries++;
          if (retries < MAX_TRANSCRIPTION_RETRIES) {
            // Exponential backoff: 1s, 2s, 4s, etc.
            const delay = BASE_DELAY_MS * Math.pow(2, retries - 1);
            console.warn(`Transcription failed with 503 error. Retrying in ${delay / 1000}s... (Attempt ${retries}/${MAX_TRANSCRIPTION_RETRIES})`);
            toast(`Server busy. Retrying transcription in ${delay / 1000}s...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            console.error("Transcription failed after all retries:", error);
            toast("Transcription failed after multiple retries. The server is very busy. Please try again later.");
            setLoading(false);
            return; // Exit after max retries
          }
        } else {
          // Handle other errors (e.g., API key, invalid data)
          console.error("Error transcribing audio:", error);
          toast("An unexpected error occurred during transcription. Please check the console.");
          setLoading(false);
          return; // Exit on non-retryable error
        }
      }
    }
  };
  // --- End Transcribe Audio with Retry Logic ---


  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      
      // Build the prompt for feedback
      const currentQuestion = mockInterviewQuestion[activeQuestionIndex]?.Question;
      const feedbackPrompt =
        `Question: ${currentQuestion}, User Answer: ${userAnswer}. ` +
        `Based on the question and user answer, please provide a rating (1-10) and feedback as an area of improvement ` +
        `in just 3 to 5 lines to help the user improve. The response must be in JSON format with fields: "rating" and "feedback".`;

      // Send message to get feedback
      const result = await chatSession.sendMessage(feedbackPrompt);

      let MockJsonResp = result.response.text();
      console.log(MockJsonResp);

      // Clean and parse JSON response
      MockJsonResp = MockJsonResp.replace("```json", "").replace("```", "").trim();

      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(MockJsonResp);
      } catch (e) {
        console.error("Failed to parse JSON:", e, "Raw response:", MockJsonResp);
        throw new Error("Invalid JSON response from AI model.");
      }

      // Insert data into the database
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: currentQuestion,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      if (resp) {
        toast("User Answer recorded and feedback generated successfully!");
      }
      
      // Reset state for the next question
      setUserAnswer("");
      setLoading(false);

    } catch (error) {
      console.error(error);
      toast("An error occurred while saving the user answer and generating feedback.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden h-full">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 mt-4 w-full max-w-md aspect-video">
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            style={{ height: "100%", width: "100%", zIndex: 10, objectFit: 'cover', borderRadius: '0.5rem' }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
            <WebcamIcon size={64} className="mb-4" />
            <span className="text-lg">Enable Video Web Cam and Microphone to Start</span>
          </div>
        )}
      </div>
      <div className="md:flex mt-4 md:mt-8 md:gap-5 w-full max-w-md">
        <div className="my-4 md:my-0 w-full">
          <Button 
            onClick={() => setWebCamEnabled((prev) => !prev)}
            className="w-full px-8 py-4 text-lg font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
          className={`w-full px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ${isRecording ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'}`}
        >
          {isRecording ? (
            <h2 className="flex gap-2 items-center">
              <Mic size={20} /> Stop Recording...
            </h2>
          ) : (
            <h2 className="flex gap-2 items-center">
              <Mic size={20} /> Record Answer
            </h2>
          )}
        </Button>
      </div>
      {/* Optional: Display transcribed answer for debugging/user verification */}
       {userAnswer && !loading && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg w-full max-w-md">
          <h3 className="font-bold text-gray-800 dark:text-gray-200">Transcribed Answer:</h3>
          <p className="text-gray-700 dark:text-gray-300">{userAnswer}</p>
        </div>
      )}
      {loading && (
        <div className="mt-4 p-4 w-full max-w-md">
            <p className="text-blue-500">Processing answer and generating feedback...</p>
        </div>
      )}
    </div>
  );
};

export default RecordAnswerSection;