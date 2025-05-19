import React from 'react';
import { images } from '../constants/images';
import { icons } from '../constants/icons';
import Image from 'next/image';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col justify-between bg-cover bg-center text-white px-8 py-6"
      style={{ backgroundImage: `url(${images.bluishbg.src})` }}
    >
      {/* Top Section */}
      <section className="flex justify-between items-center flex-nowrap gap-x-10 sm:gap-x-14 md:gap-x-20 lg:gap-x-24">
        {/* Left - Welcome */}
        <div className="w-1/2 min-w-[200px]">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome</h1>
        </div>

        {/* Right - Menu */}
        {/* Full Menu - visible only on md and up */}
        <div className="hidden md:flex flex-nowrap justify-end items-center gap-x-4 sm:gap-x-10 md:gap-x-12 lg:gap-x-10">
          <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
            <Image
              src={icons.thoughts}
              alt="Support"
              width={30}
              height={30}
              className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg]"
            />
            <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">Ur thought</h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
            <Image
              src={icons.contactus}
              alt="Contact"
              width={30}
              height={30}
              className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg]"
            />
            <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">Contact</h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
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

      {/* Bottom Section */}
      <section className="flex justify-center items-center flex-nowrap gap-x-6 sm:gap-x-12 md:gap-x-20 mt-10">
        <div className="flex flex-col border border-amber-100 rounded-xl p-4 gap-1.5 items-center text-center max-w-xs">
          <h1 className="text-xl font-semibold">TYPE</h1>
          <h4 className="text-sm">Help us do some choir songs typing</h4>
        </div>
        <div className="flex flex-col border border-amber-100 rounded-xl p-4 gap-1.5 items-center text-center max-w-xs">
          <h1 className="text-xl font-semibold">EDIT</h1>
          <h4 className="text-sm">Help us proofread already typed songszz</h4>
        </div>
      </section>
    </main>
  );
}
