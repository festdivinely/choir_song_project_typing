"use client"
import MenuBtns from "../components/menuBtns";
import Context from "../components/context";
import PictureBox from "../components/pictureBox";
import FooterComp from "../components/footerComp";
import Social from "../components/socials";
import { useLoadingStore } from '../lib/songStore';
import Spinner from "../components/spinner";
import { useEffect } from 'react';


export default function Home() {
  const isPageLoading = useLoadingStore((state) => state.isPageLoading);
  const setPageLoading = useLoadingStore((state) => state.setPageLoading);

    useEffect(() => {
      setPageLoading(false);
      return () => {
        setPageLoading(null);
      };
    }, [setPageLoading]);

    if (isPageLoading === true) {
      return (
        <div className="flex items-center justify-center w-screen h-screen bg-cyan-700">
          <Spinner />
        </div>
      );
    }
    

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-700">
      <div className="absolute flex flex-1 flex-col w-full h-full pt-3">
        <MenuBtns />
        <Context />
        <Social />
        <PictureBox />
        <FooterComp />
      </div>
    </div>
  );
}
