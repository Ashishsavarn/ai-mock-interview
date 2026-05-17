import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white" >
      <div className="pt-24 px-10 pb-10">
        <div className="">
          <h2 className="font-bold text-3xl mb-2" >Dashboard</h2>
          <h2 className="text-gray-300 text-lg mb-6" >Create and start your AI Mockup Interview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-6" >
          <AddNewInterview/>
        </div>

        <div className="">
          <InterviewList/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
