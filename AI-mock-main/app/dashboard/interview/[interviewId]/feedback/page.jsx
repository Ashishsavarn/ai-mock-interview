"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0
      );
      // console.log("total",totalRating);
      // console.log("length",feedbackList.length);
      return (totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white pt-24 px-10 pb-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-400 my-5 text-center">
          No Interview feedback Record Found
        </h2>
      ) : (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-500 mb-2">Congratulations!</h2>
          <h2 className="font-bold text-2xl mb-4">Here is your interview feedback</h2>
          <h2 className="text-lg my-3">
            Your overall interview rating:{' '}
            <strong
              className={`text-xl ${
                overallRating >= 7
                  ? "text-green-500"
                  : overallRating >= 4
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {overallRating}
              <span className="text-gray-400">/10</span>
            </strong>
          </h2>
          <h2 className="text-sm text-gray-400 mb-8">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-5 border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50 backdrop-blur-sm">
                <CollapsibleTrigger className="p-4 bg-gray-700 hover:bg-gray-600 transition-all cursor-pointer flex justify-between gap-7 w-full text-left text-white font-semibold">
                  {item.question} <ChevronDown className="h-5 w-5 transform group-[data-state=open]:rotate-180" />{" "}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-300 space-y-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-sm">
                      <strong>Rating: </strong>
                      <span
                        className={`font-semibold ${item.rating >= 7
                          ? "text-green-500"
                          : item.rating >= 4
                          ? "text-yellow-500"
                          : "text-red-500"}`}
                      >
                        {item.rating}
                      </span>
                    </h2>
                    <h2 className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-sm">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-sm">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-sm">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Button onClick={() => router.replace("/dashboard")}
          className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
