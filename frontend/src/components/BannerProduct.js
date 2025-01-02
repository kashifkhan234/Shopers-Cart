import React, { useEffect, useState } from "react";
import image1 from "../Assets/Banner/image1.webp";
import image2 from "../Assets/Banner/image2.webp";
import image3 from "../Assets/Banner/image3.webp";
import image4 from "../Assets/Banner/image4.webp";
import image5 from "../Assets/Banner/image5.webp";

import image1Mobile from "../Assets/Banner/image1_Mobile.webp";
import image2Mobile from "../Assets/Banner/image2_Mobile.webp";
import image3Mobile from "../Assets/Banner/image3_Mobile.webp";
import image4Mobile from "../Assets/Banner/image4_Mobile.webp";
import image5Mobile from "../Assets/Banner/image5_Mobile.webp";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImage = [image1, image2, image3, image4, image5];
  const mobileImage = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];
  const nextImage = () => {
    if (desktopImage.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };
  const preveImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImage.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="mx-auto px-2 md:px-16 rounded">
      <div className="h-40 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={preveImage}
              className="bg-white rounded-full p-1 shadow-md"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white rounded-full p-1 shadow-md"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* Desktop & Tablet verson */}
        <div className="md:flex h-full w-full overflow-hidden hidden">
          {desktopImage.map((imageURl, index) => {
            return (
              <div
                className="h-full w-full min-h-full min-w-full  transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>
        {/* Mobile Verson */}
        <div className="flex h-full w-full overflow-hidden md:hidden object-cover">
          {mobileImage.map((imageURl, index) => {
            return (
              <div
                className="h-full w-full min-h-full min-w-full  transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
