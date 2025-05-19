"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { icons } from "../../constants/icons";
import Image from "next/image";

function MenuBtns() {
  const router = useRouter();

  return (
    <section className="flex justify-between items-center flex-nowrap gap-x-10 sm:gap-x-14 md:gap-x-20 lg:gap-x-24">
      {/* Left - Welcome */}
      <div
        className="w-1/2 min-w-[200px] cursor-pointer"
        onClick={() => router.push("/")}
      >
        <h1 className="text-4xl md:text-5xl font-bold">Welcome</h1>
      </div>

      {/* Right - Menu (visible only on md and up) */}
      <div className="hidden md:flex flex-nowrap justify-end items-center gap-x-4 sm:gap-x-10 md:gap-x-12 lg:gap-x-10">
        {/* Ur Thought */}
        <div
          className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer"
          onClick={() => router.push("/urThought")}
        >
          <Image
            src={icons.thoughts}
            alt="Support"
            width={30}
            height={30}
            className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg]"
          />
          <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">Ur thought</h1>
        </div>

        {/* Contact */}
        <div
          className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer"
          onClick={() => router.push("/contact")}
        >
          <Image
            src={icons.contactus}
            alt="Contact"
            width={30}
            height={30}
            className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg]"
          />
          <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">Contact</h1>
        </div>

        {/* About */}
        <div
          className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer"
          onClick={() => router.push("/about")}
        >
          <Image
            src={icons.info}
            alt="About"
            width={30}
            height={30}
            className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg]"
          />
          <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">About</h1>
        </div>
      </div>

      {/* Hamburger Menu - visible only on small screens */}
      <div className="block md:hidden">
        <Image
          src={icons.hamburger}
          alt="Menu"
          width={35}
          height={35}
          className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg] cursor-pointer"
        />
      </div>
    </section>
  );
}

export default MenuBtns;
