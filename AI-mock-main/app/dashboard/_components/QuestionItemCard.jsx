import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };
  return (
    <div className="border border-gray-700 bg-gray-800/50 hover:bg-gray-700/60 hover:shadow-xl transition-all cursor-pointer rounded-lg p-4">
      <h2 className='font-bold text-white text-lg mb-1' >{question?.jobPosition}</h2>
      <h2 className='text-sm text-gray-400 mb-2' >
        {question?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-500">Created At: {question.createdAt}</h2>

      <div className="flex justify-between mt-4 gap-4 ">
        <Button onClick={onStart} size="sm" className="w-full text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;
