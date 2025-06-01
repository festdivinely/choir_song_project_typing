"use client";
import React from "react";
import { useRouter } from "next/navigation";

function TypeAndEditBtn() {
  const router = useRouter();

  return (
    <section className="flex justify-center items-center gap-x-4 sm:gap-x-10 md:gap-x-16 my-4">
      <div
        onClick={() => router.push("/type")}
        className="bg-blue-200/20 backdrop-blur-md shadow-md cursor-pointer flex flex-col border border-amber-100 rounded-lg p-3 gap-1 text-center max-w-[140px] sm:max-w-xs transition-transform hover:scale-105"
      >
        <h1 className="text-base font-semibold">TYPE</h1>
        <h4 className="text-xs sm:text-sm overflow-hidden text-ellipsis" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          Help us do some choir songs typing
        </h4>
      </div>

      <div
        onClick={() => router.push("/edit")}
        className="bg-blue-100/20 backdrop-blur-md shadow-md cursor-pointer flex flex-col border border-amber-100 rounded-lg p-3 gap-1 text-center max-w-[140px] sm:max-w-xs transition-transform hover:scale-105"
      >
        <h1 className="text-base font-semibold">EDIT</h1>
        <h4 className="text-xs sm:text-sm overflow-hidden text-ellipsis" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          Help us proofread <span className="hidden sm:inline">already </span>typed songs
        </h4>
      </div>
    </section>
  );
}

export default TypeAndEditBtn;
