"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { icons } from "../constants/icons";
import Image from "next/image";

function MenuBtns() {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isVerySmall, setIsVerySmall] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // show hamburger under md
      setIsVerySmall(width < 350); // show logo under 350px

      // Close menu on resize up
      if (width >= 768) setMenuOpen(false);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    {
      label: "Ur thought",
      icon: icons.thoughts,
      path: "/urThought",
    },
    {
      label: "Contact",
      icon: icons.contactus,
      path: "/contact",
    },
    {
      label: "About",
      icon: icons.info,
      path: "/about",
    },
  ];

  const handleNavClick = (path: string) => {
    setMenuOpen(false);
    router.push(path);
  };

  return (
    <section className="relative flex flex-1 justify-between items-center w-full flex-nowrap gap-x-4 sm:gap-x-10 md:gap-x-20 lg:gap-x-24 text-white">
      {/* Left - Welcome or Logo */}
      <div
        className="w-1/2 min-w-[100px] cursor-pointer flex items-center"
        onClick={() => router.push("/")}
      >
        {isVerySmall ? (
          <Image src={icons.logo} alt="Logo" width={30} height={30} />
        ) : (
          <h1 className="text-3xl md:text-5xl font-bold">Welcome</h1>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-end items-center gap-x-4 sm:gap-x-10 md:gap-x-12 lg:gap-x-10">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
            onClick={() => handleNavClick(item.path)}
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={30}
              height={30}
              className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg]"
            />
            <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">{item.label}</h1>
          </div>
        ))}
      </div>

      {/* Hamburger & Dropdown */}
      {isMobile && (
        <div className="relative z-50 flex flex-col items-end">
          <Image
            src={menuOpen ? icons.cancel : icons.hamburger}
            alt="Menu"
            width={35}
            height={35}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg] cursor-pointer transition-transform duration-300"
          />

          {/* Dropdown menu */}
          <div
            className={`absolute top-full mt-2 right-0 w-48 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg transition-all duration-300 ${
              menuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {navItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 mb-4 last:mb-0 cursor-pointer"
                onClick={() => handleNavClick(item.path)}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={25}
                  height={25}
                  className="invert brightness-0 sepia saturate-100 hue-rotate-[200deg]"
                />
                <span className="text-base font-semibold text-white whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default MenuBtns;
