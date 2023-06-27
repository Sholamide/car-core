"use client";
import { CarProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import CarDetails from "./CarDetails";

export interface CarCardProps {
  car: CarProps;
}
const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const carRent = calculateCarRent(city_mpg, year);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-semibold">/per day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              alt="steering wheel"
              width={20}
              height={20}
              src="/steering-wheel.svg"
            />
            <p className="text-[14px]">
              {transmission == "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image alt="tire" width={20} height={20} src="/tire.svg" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image alt="gas" width={20} height={20} src="/gas.svg" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            containerStyles="w-full transition duration-300 py-[16px] rounded-full bg-primary-blue"
            rightIcon="/right-arrow.svg"
            handleClick={()=> setIsOpen(true)}
            title="View More"
          />
        </div>
      </div>
            <CarDetails isOpen={isOpen} car={car} isClose={()=> setIsOpen(false)} />
      
    </div>
  );
};

export default CarCard;
