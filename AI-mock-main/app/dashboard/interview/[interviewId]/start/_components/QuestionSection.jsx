import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="flex flex-col justify-between p-6 rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm text-white h-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                key={index}
                className={`p-2 rounded-full text-center text-xs md:text-sm cursor-pointer transition-colors duration-200 ${
                  activeQuestionIndex == index
                    ? "bg-blue-600 text-white shadow-lg" // Active state with vibrant blue and shadow
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600" // Inactive state with subtle hover
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-xl md:text-2xl font-semibold text-gray-200">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>
        <Volume2
          className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
          size={24}
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
          }
        />
        <div className="border rounded-lg p-5 bg-blue-900/20 backdrop-blur-sm border-blue-700 mt-8">
          <h2 className="flex gap-2 items-center text-blue-400 mb-3">
            <Lightbulb size={20} className="text-blue-400" />
            <strong className="font-semibold">Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-300">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
