'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Zap, LineChart, MessageSquare, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the Contect component
const Contect = dynamic(() => import('./_components/Contect'), { ssr: false });

const page = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <Head>
        <title>AI Mock Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section */}
        <header className="w-full py-4 sm:py-6 backdrop-blur-md bg-black/30 fixed top-0 z-50">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              AI Mock Interview
            </motion.h1>
            <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-between mt-4 md:mt-0 space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <a href="#features" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#testimonials" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Testimonials</a>
                <a href="#contact" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Contact</a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
                Master Your Interview Skills with{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  AI
                </span>
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
                Experience the future of interview preparation with our advanced AI-powered platform
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
                <Link
                  href="/dashboard"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white border border-gray-600 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 md:px-0">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Powerful Features</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
                Everything you need to prepare for your next interview
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "AI-Powered Interviews",
                  description: "Experience realistic interview scenarios powered by advanced AI technology"
                },
                {
                  icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Instant Feedback",
                  description: "Get immediate, personalized feedback to improve your performance"
                },
                {
                  icon: <LineChart className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Performance Analytics",
                  description: "Track your progress with detailed analytics and insights"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 md:px-0 bg-gray-800/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Success Stories</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
                Hear from our users who transformed their interview skills
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  quote: "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview.",
                  author: "Alex Johnson",
                  role: "Software Engineer"
                },
                {
                  quote: "The feedback was spot on and helped me improve my answers. Highly recommend this service!",
                  author: "Sarah Williams",
                  role: "Product Manager"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-4" />
                  <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">{testimonial.quote}</p>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.author}</h4>
                    <p className="text-sm sm:text-base text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 md:px-0">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Get in Touch</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
                Have questions? We'd love to hear from you
              </p>
            </motion.div>
            <Contect />
          </div>
        </section>
      </main>

      <footer className="py-6 sm:py-8 bg-black/50 backdrop-blur-sm text-center">
        <p className="text-sm sm:text-base text-gray-400">© 2025 AI Mock Interview. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page
