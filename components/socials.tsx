import Image from 'next/image';
import React from 'react';
import {icons} from "../constants/icons"

const Socials = () => {
  return (
    <div className="w-full h-fit flex justify-center items-center mt-[.5%]">
      <div className="py-[0.5%] px-[2.5%] flex justify-center items-center gap-7 bg-gray-700 rounded-full">
        <div className='p-2 px-4 rounded-[50%] bg-sky-200 text-2xl w-fit h-fit flex justify-center items-center'>
          <div>𝄞</div>
        </div>
        <div className='py-3.5 px-3.5 rounded-[50%] bg-cyan-300 text-2xl w-fit h-fit flex justify-center items-center'>
          <div>
            <Image
              src={icons.note1}
              alt="Menu"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className='py-3.5 px-3.5 rounded-[50%] bg-indigo-200 text-2xl w-fit h-fit flex justify-center items-center'>
          <div>
          <div>
            <Image
              src={icons.note2}
              alt="Menu"
              width={20}
              height={20}
            />
          </div>
          </div>
        </div>
        <div className='p-2 px-4 rounded-[50%] bg-rose-200 text-2xl w-fit h-fit flex justify-center items-center'>
          <div>𝄢</div>
        </div>
      </div>
    </div>
  );
};

export default Socials;

