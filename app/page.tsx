import React from 'react';
import { images } from '../constants/images';
import TypeAndEditBtn from './components/typeAndEditBtn';
import MenuBtns from './components/menuBtns';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col justify-between bg-cover bg-center text-white px-8 py-6"
      style={{ backgroundImage: `url(${images.bluishbg.src})` }}
    >
      {/* Top Section */}
      <MenuBtns />

      {/* Bottom Section */}
      <TypeAndEditBtn />
    </main>
  );
}
