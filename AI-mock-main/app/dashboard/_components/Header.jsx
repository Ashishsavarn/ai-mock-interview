"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { Brain } from 'lucide-react';

const Header = () => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="w-full py-4 backdrop-blur-md bg-black/30 fixed top-0 z-50">
      <div className="container mx-auto flex gap-4 items-center justify-between px-6">
        <Link className="hidden md:flex items-center gap-2" href="/dashboard">
          <Brain size={32} className="text-blue-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AI Mock Interview</span>
        </Link>
        <ul className="hidden md:flex gap-6">
          <Link href="/dashboard">
            <li
              className={`hover:text-white transition-colors cursor-pointer ${
                path == "/dashboard" ? "text-white font-bold" : "text-gray-300"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <Link href="/dashboard/question">
            <li
              className={`hover:text-white transition-colors cursor-pointer ${
                path == "/dashboard/question" ? "text-white font-bold" : "text-gray-300"
              }`}
            >
              Questions
            </li>
          </Link>
          <Link href="/dashboard/upgrade">
            <li
              className={`hover:text-white transition-colors cursor-pointer ${
                path == "/dashboard/upgrade" ? "text-white font-bold" : "text-gray-300"
              }`}
            >
              Upgrade
            </li>
          </Link>

          <Link href="/dashboard/howit">
            <li
              className={`hover:text-white transition-colors cursor-pointer ${
                path == "/dashboard/howit" ? "text-white font-bold" : "text-gray-300"
              }`}
            >
              How it works?
            </li>
          </Link>
        </ul>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex gap-10 items-center" >
          <ModeToggle  />
          {isUserButtonLoaded ? <UserButton afterSignOutUrl="/" /> : <SkeletonLoader />}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800/90 backdrop-blur-sm px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/dashboard">
            <li
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700 transition-colors ${
                path == "/dashboard" ? "text-white bg-gray-700" : "text-gray-300"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <Link href="/dashboard/question">
            <li
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700 transition-colors ${
                path == "/dashboard/question" ? "text-white bg-gray-700" : "text-gray-300"
              }`}
            >
              Questions
            </li>
          </Link>
          <Link href="/dashboard/upgrade">
            <li
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700 transition-colors ${
                path == "/dashboard/upgrade" ? "text-white bg-gray-700" : "text-gray-300"
              }`}
            >
              Upgrade
            </li>
          </Link>
          <Link href="/dashboard/howit">
            <li
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700 transition-colors ${
                path == "/dashboard/howit" ? "text-white bg-gray-700" : "text-gray-300"
              }`}
            >
              How it works?
            </li>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
