"use client";
import React from "react";
import { useRouter } from "next/navigation";

function TypeAndEditBtn() {
  const router = useRouter();

  return (
    <section className="flex justify-center items-center flex-nowrap gap-x-6 sm:gap-x-12 md:gap-x-20 mt-10 mb-10">
      {/* TYPE Box */}
      <div
        onClick={() => router.push("/type")}
        className="bg-blue-200/20 backdrop-blur-md shadow-lg cursor-pointer flex flex-col border border-amber-100 rounded-xl p-4 gap-1.5 items-center text-center max-w-xs transition-transform hover:scale-105"
      >
        <h1 className="text-xl font-semibold">TYPE</h1>
        <h4
          className="text-sm overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          Help us do some choir songs typing
        </h4>
      </div>

      {/* EDIT Box */}
      <div
        onClick={() => router.push("/edit")}
        className="bg-blue-100/20 backdrop-blur-md shadow-lg cursor-pointer flex flex-col border border-amber-100 rounded-xl p-4 gap-1.5 items-center text-center max-w-xs transition-transform hover:scale-105"
      >
        <h1 className="text-xl font-semibold">EDIT</h1>
        <h4
          className="text-sm overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          Help us proofread <span className="hidden sm:inline">already </span>typed songs
        </h4>
      </div>
    </section>
  );
}

export default TypeAndEditBtn;
