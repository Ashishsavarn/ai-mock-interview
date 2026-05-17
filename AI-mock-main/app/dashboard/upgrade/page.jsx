"use client";
import React from "react";
import PricingPlan from "../_components/PricingPlan";
import { useUser } from "@clerk/nextjs";

const Upgrade = () => {
  const { user } = useUser();
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white" >
      <div className="pt-24 px-10 pb-10">
        <h1 className="text-center font-bold mb-5 text-white text-3xl" >Upgrade Your Plan</h1>
        <p className="text-center text-gray-300 text-lg mb-10">Choose the plan that's right for you.</p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-center md:gap-10">
          {PricingPlan.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-700 p-6 shadow-lg sm:px-8 lg:p-10 bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="text-center">
                <h2 className="text-lg font-medium text-white">
                  {item.duration}
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-white sm:text-4xl">
                    {" "}
                    {item.price}${" "}
                  </strong>

                  <span className="text-sm font-medium text-gray-400">
                    / {item.duration}
                  </span>
                </p>
              </div>

              <ul className="mt-8 space-y-4 text-gray-300">
                {/* Assuming item.features is an array of strings */}
                {item.features && item.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                     <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-blue-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={
                  item.link +
                  "?prefilled_email=" +
                  user?.primaryEmailAddress?.emailAddress
                }
                target="_blank"
                className="mt-8 block rounded-full border border-blue-500 bg-gradient-to-r from-blue-600 to-purple-700 px-12 py-3 text-center text-sm font-medium text-white hover:from-blue-700 hover:to-purple-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:text-gray-200"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
