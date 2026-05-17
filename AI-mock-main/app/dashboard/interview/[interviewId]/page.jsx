"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from 'react';
import { WebCamContext } from "../../layout";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
  // const [webCamEnabled, setWebCamEnebled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);
  
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
      
    setInterviewData(result[0]);
  };
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white pt-24 px-10 pb-10">
      <h2 className="font-bold text-3xl mb-8 text-center">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-6 rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm gap-4">
            <h2 className="text-lg text-gray-300">
              <strong className="text-white">Job Role/Job Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg text-gray-300">
              <strong className="text-white">Job Description/Job Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg text-gray-300">
              <strong className="text-white">Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-6 border rounded-lg border-yellow-600 bg-yellow-900/20 backdrop-blur-sm">
            <h2 className="flex gap-2 items-center text-yellow-400 mb-3">
              <Lightbulb className="text-yellow-400" size={20} />
              <strong className="font-semibold">Information</strong>
            </h2>
            <h2 className="mt-2 text-yellow-300 text-sm">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <div className=" flex items-center justify-center p-5 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                height={300}
                width={300}
                mirrored={true}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <WebcamIcon className="h-72 w-full my-6 p-20 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-gray-200" />
            </div>
          )}
          <div className="mt-4">
            <Button
              className={`w-full px-8 py-4 text-lg font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300`}
              onClick={() => setWebCamEnabled((prev) => !prev)}
            >
              {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 md:justify-end md:items-end max-w-5xl mx-auto">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
