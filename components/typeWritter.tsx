"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { icons } from "../constants/icons";

const sentences = [
  "Lorem ipsum dolor sit amet.",
  "Consectetur adipiscing elit.",
  "Vestibulum ante ipsum primis.",
  "Curabitur vel sem at nulla tincidunt.",
];

const TypewriterText = () => {
  const [text, setText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const currentSentence = sentences[sentenceIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentSentence.length) {
      timeout = setTimeout(() => {
        setText(currentSentence.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);

        if (charIndex === currentSentence.length) {
          setIsTypingComplete(true);
        }
      }, 100);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(currentSentence.slice(0, charIndex));
        setCharIndex((prev) => prev - 1);
        setIsTypingComplete(false);
      }, 50);
    } else {
      timeout = setTimeout(() => {
        if (!isDeleting) {
          setIsDeleting(true);
        } else {
          setIsDeleting(false);
          setSentenceIndex((prev) => (prev + 1) % sentences.length);
          setCharIndex(0);
        }
      }, isDeleting ? 400 : 1200);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, sentenceIndex]);

  return (
    <div className="w-1/2 flex justify-start items-center mt-8">
      <div className="relative text-lg sm:text-xl md:text-3xl font-medium flex items-center whitespace-nowrap">
        {/* Container with relative positioning */}
        <div className="relative inline-block">
          <span className="transition-all duration-100 ease-linear">{text}</span>
          <Image
            src={icons.writtinghand}
            alt="Typing"
            width={24}
            height={24}
            className={`absolute top-0 transition-all duration-200 ease-in-out ${
              isTypingComplete ? "translate-x-2" : "translate-x-0"
            }`}
            style={{ left: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypewriterText;
