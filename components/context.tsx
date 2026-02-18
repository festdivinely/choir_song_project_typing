import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Context = () => {
  return (
    <section className="relative text-white flex items-center justify-center px-4 py-3 w-full mt-[2%]">
      <div className="relative z-10 text-center max-w-10xl w-full">
        <div className="font-bold text-white opacity-40 mb-[.5%] text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
          Sacred songs
        </div>

        {/* Title */}
        <div className="font-bold leading-none whitespace-nowrap overflow-hidden text-ellipsis">
          <h1 className="block max-[369px]:block sm:hidden text-[5.2vw]">
            Youth Choir Songs
          </h1>
          <h1 className="hidden max-[369px]:hidden sm:block md:hidden text-[4vw]">
            A Global Archive of Youth Choir Music
          </h1>
          <h1 className="hidden md:block lg:hidden text-[3.1vw]">
            Discover Hoy Ghost inspired Youth Choir Songs
          </h1>
          <h1 className="hidden lg:block xl:hidden text-[2.4vw]">
            Explore Sacred and Contemporary Global Youth Choir Works
          </h1>
          <h1 className="hidden xl:block text-[2vw]">
            A Global Platform for Sacred and Contemporary Youth Choir Music
          </h1>
        </div>

        {/* Description */}
        <div className="mt-3 text-gray-200 font-light text-[3.4vw] sm:text-sm md:text-base leading-snug">
          <p className="block max-[369px]:block sm:hidden">
            Compose. Share. Save Youth choir songs from every land and heart.
          </p>
          <p className="hidden max-[369px]:hidden sm:block md:hidden">
            Discover, Compose, share, and preserve global choir music. Unite
            through harmony and heritage.
          </p>
          <p className="hidden md:block lg:hidden">
            Find sacred, Holy Ghost Inspired choral pieces from every culture.
            Join a movement to preserve and celebrate global harmony.
          </p>
          <p className="hidden lg:block xl:hidden">
            A living archive of sacred, Holy Ghost Inspred choir songs. Voices
            from every culture come together in shared harmony and inspiration.
          </p>
          <p className="hidden xl:block">
            Discover sacred and contemporary choir pieces submitted by global
            voices. This is a digital sanctuary of harmony, culture, and
            inspiration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Context;
