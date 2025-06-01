import Image from 'next/image';
import React from 'react';
import { icons } from '../constants/icons';

const Socials = () => {
  return (
    <div className="w-full h-fit flex justify-center items-center mt-3">
      <div className="py-[0.5%] px-[2.5%] flex justify-center items-center gap-7 bg-white rounded-full">
        <Image
          alt="facebook"
          src={icons.facebook}
          className="w-[8vw] max-w-[50px] min-w-[24px] h-auto"
        />
        <Image
          alt="instagram"
          src={icons.instagram}
          className="w-[8vw] max-w-[50px] min-w-[24px] h-auto"
        />
        <Image
          alt="youtube"
          src={icons.youtube}
          className="w-[8vw] max-w-[50px] min-w-[24px] h-auto"
        />
        <Image
          alt="x"
          src={icons.x}
          className="w-[8vw] max-w-[50px] min-w-[24px] h-auto"
        />
      </div>
    </div>
  );
};

export default Socials;

