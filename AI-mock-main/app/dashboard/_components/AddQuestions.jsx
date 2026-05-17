"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { Question } from "@/utils/schema";
import { useRouter } from "next/navigation";

const AddQuestions = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [questionJsonResponse, setQuestionJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(
      "Data",
      jobPosition,
      jobDesc,
      typeQuestion,
      company,
      jobExperience
    );

    const InputPrompt = `
    Job Positions: ${jobPosition},
    Job Description: ${jobDesc},
    Years of Experience: ${jobExperience},
    Which type of question: ${typeQuestion},
    This company previous question: ${company},
    Based on this information, please provide 5 interview questions with answers in JSON format.
    Each question and answer should be fields in the JSON. Ensure "Question" and "Answer" are fields.
}  
  `;
    console.log("InputPrompt:", InputPrompt);

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockQuestionJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim();
      // console.log("Parsed data", JSON.parse(MockQuestionJsonResp));
      
      console.log("JSON RESPONSE", MockQuestionJsonResp);
      // console.log("Parsed RESPONSE", JSON.parse(MockQuestionJsonResp))

      if (MockQuestionJsonResp) {
        const resp = await db
          .insert(Question)
          .values({
            mockId: uuidv4(),
            MockQuestionJsonResp: MockQuestionJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            typeQuestion: typeQuestion,
            company: company,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("YYYY-MM-DD"),
          })
          .returning({ mockId: Question.mockId });

        console.log("Inserted ID:", resp);

        if (resp) {
          setOpenDialog(false);

          router.push("/dashboard/pyq/" + resp[0]?.mockId);
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error.message);
      alert("There was an error processing the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="p-10 rounded-lg border border-gray-700 bg-gray-800/50 hover:bg-gray-700/60 hover:scale-105 hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center text-gray-300 hover:text-white"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New Questions</h2>
      </div>

      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">What model questions are you seeking</DialogTitle>
            <DialogDescription className="text-gray-300">
              <form onSubmit={onSubmit}>
                <div className="my-4">
                  <h2 className="text-white mb-4">
                    Add Details about your job position, job descritpion and
                    years of experience
                  </h2>

                  <div className="mt-4">
                    <label className="block text-gray-300 mb-1">Job Role/job Position</label>
                    <Input
                      className="mt-1 w-full px-4 py-3 text-lg border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      value={jobPosition}
                      placeholder="Ex. Full stack Developer"
                      required
                      onChange={handleInputChange(setJobPosition)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-gray-300 mb-1">
                      Job Description/ Tech stack (In Short)
                    </label>
                    <Textarea
                      className="w-full px-4 py-3 text-lg border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      value={jobDesc}
                      placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                      required
                      onChange={handleInputChange(setJobDesc)}
                      rows="4"
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-gray-300 mb-1">
                      Type of Questions (In Short)
                    </label>
                    <Input
                      className="placeholder-opacity-50 w-full px-4 py-3 text-lg border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      value={typeQuestion}
                      placeholder="Ex. CPP, Leetcode, Domain based"
                      required
                      onChange={handleInputChange(setTypeQuestion)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-gray-300 mb-1">
                      Company are you seeking
                    </label>
                    <Input
                      className="mt-1 w-full px-4 py-3 text-lg border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      value={company}
                      placeholder="Ex. Microsoft, Apple, Google, Mercedes"
                      required
                      onChange={handleInputChange(setCompany)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-gray-300 mb-1">Years of Experience</label>
                    <Input
                      className="mt-1 w-full px-4 py-3 text-lg border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="Ex. 5"
                      value={jobExperience}
                      max="50"
                      type="number"
                      required
                      onChange={handleInputChange(setJobExperience)}
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-end mt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    className="text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}
                    className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin mr-2" />
                        Generating From AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuestions;
