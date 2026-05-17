import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddQuestions from "../_components/AddQuestions";
import QuestionList from "../_components/QuestionList";

const Questions = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white" >
      <div className="pt-24 px-10 pb-10">
        <h2 className="font-bold text-3xl mb-2" >Master Your Interviews</h2>
        <h2 className="text-gray-300 text-lg mb-6" >Comprehensive Question Preparation with AI</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-6" >
          <AddQuestions/>
        </div>

        <QuestionList/>
      </div>
    </div>
  );
};

export default Questions;