import React from 'react';
import TypeAndEditBtn from './typeAndEditBtn';

function PictureBox() {
  return (
    <>
      {/* Card-like box with shadow and slight overlap */}
      <section className="relative flex items-center justify-center w-full h-[80%] px-[10%] pt-[1.5%] -mb-[80px]">
        <div className="relative z-10 text-center max-w-10xl w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-xl">
          <TypeAndEditBtn />
        </div>
      </section>
    </>
  );
}

export default PictureBox;

