"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useLoadingStore } from '../lib/songStore';

function TypeAndEditBtn() {
  const router = useRouter();
  const setPageLoading = useLoadingStore((state) => state.setPageLoading);

  return (
    <section className="flex justify-center items-center gap-x-4 sm:gap-x-10 md:gap-x-16 my-4">
      <div
        onClick={() => {
          setPageLoading(true);
          router.push("/type");
        }}
        className="bg-gradient-to-br from-cyan-300 to-cyan-500 shadow-md cursor-pointer flex flex-col border border-white/30 rounded-lg p-10 gap-1 text-center max-w-[140px] sm:max-w-xs transition-transform hover:scale-105 text-white"
      >
        <h1 className="text-base font-semibold">TYPE</h1>
        <h4 className="text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          Help us do some choir songs typing
        </h4>
      </div>

      <div
        onClick={() => {
          setPageLoading(true);
          router.push("/typed");
        }}
        className="bg-gradient-to-br from-cyan-300 to-cyan-500 shadow-md cursor-pointer flex flex-col border border-white/30 rounded-lg p-10 gap-1 text-center max-w-[140px] sm:max-w-xs transition-transform hover:scale-105 text-white"
      >
        <h1 className="text-base font-semibold">EDIT</h1>
        <h4 className="text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          Help us proofread typed songs
        </h4>
      </div>
    </section>
  );
}

export default TypeAndEditBtn;
