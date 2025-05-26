import Image from "next/image";
import { images } from "../constants/images";
import MenuBtns from "../components/menuBtns";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        alt="bgimage"
        src={images.bluishbg}
        fill
        className="object-cover"
        priority
      />
      {/* Optional: Add content on top of the image */}
      <div className="absolute flex flex-1 w-full pl-5 pr-10 pt-3">
        <MenuBtns />
      </div>
    </div>
  );
}
