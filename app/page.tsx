import React from 'react';
import { images } from '../constants/images';
import MenuBtns from "../components/menuBtns"
import TypewriterText from "../components/typeWritter"
import TypeAndEditBtn from "../components/typeAndEditBtn"

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col justify-between bg-cover bg-center text-white px-8 py-6"
      style={{ backgroundImage: `url(${images.bluishbg.src})` }}
    >
      {/* Top Section */}
      <MenuBtns />

      <TypewriterText />

      {/* Bottom Section */}
      <TypeAndEditBtn />
    </main>
  );
}
