import React from 'react';
import MenuBtns from "../components/menuBtns"
import TypewriterText from "../components/typeWritter"
import TypeAndEditBtn from "../components/typeAndEditBtn"
import bluishbg from "../assets/images/bluishbg.png"

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col justify-between bg-cover bg-center text-white px-8 py-6"
      style={{ backgroundImage: `url(${bluishbg})` }}
    >
      {/* Top Section */}
      <MenuBtns />

      <TypewriterText />

      {/* Bottom Section */}
      <TypeAndEditBtn />
    </main>
  );
}
