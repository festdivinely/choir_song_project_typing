import React from "react";
import { images } from "../constants/images";

const FooterComp = () => {
  return (
    <section className="relative flex items-center justify-center w-full h-[50%] bg-white">
      <div className="mt-25 w-full h-fit flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-start items-start gap-1">
            <div
              className="w-fit h-fit -mt-3"
              style={{
                backgroundImage: `url(${images.chosenlogo.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: 50,
                height: 50,
              }}
            />
            <div className="flex flex-col justify-center items-center">
              {/* Fixed heading */}
              <h2 className="text-xl bg-linear-to-b from-red-400 to-green-400 bg-clip-text text-transparent opacity-100">
                The Lord&apos;s Chosen Charismatic
              </h2>

              <p className="text-lg">Revival Movement</p>
              <p className="text-lg">Youth Choir Department</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterComp;
