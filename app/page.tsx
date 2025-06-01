import MenuBtns from "../components/menuBtns";
import Context from "../components/context";
import PictureBox from "../components/pictureBox";
import FooterComp from "../components/footerComp";
import Social from "../components/socials";

export default function Home() {
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
