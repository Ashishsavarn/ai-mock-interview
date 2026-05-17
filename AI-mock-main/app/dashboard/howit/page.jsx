import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - AI Mock Interview</title>
        <meta
          name="description"
          content="Learn how our AI Mock Interview works."
        />
      </Head>
      <main className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white pt-24 px-10 pb-10">
        <h1 className="text-4xl font-bold text-center mb-8">How It Works</h1>
        <section className="space-y-8 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-gray-700">
              <AccordionTrigger className="text-xl md:text-2xl font-semibold text-white hover:text-gray-300">
                Step 1: Prepare for the Interview
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 bg-gray-800/50 p-4 rounded-md">
                <p>
                  Get ready by selecting the type of interview and providing
                  some details about the job position.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-gray-700">
              <AccordionTrigger className="text-xl md:text-2xl font-semibold text-white hover:text-gray-300">
                {" "}
                Step 2: Start the AI Interview
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 bg-gray-800/50 p-4 rounded-md">
                <p>
                  Our AI will ask you a series of questions and evaluate your
                  responses in real-time.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-gray-700">
              <AccordionTrigger className="text-xl md:text-2xl font-semibold text-white hover:text-gray-300">
                Step 3: Receive Feedback
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 bg-gray-800/50 p-4 rounded-md">
                <p>
                  Get detailed feedback on your performance, including strengths
                  and areas for improvement.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </>
  );
};

export default HowItWorks;
