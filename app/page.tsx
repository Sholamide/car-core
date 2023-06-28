"use client";

import { useEffect, useState } from "react";
import {
  Hero,
  SearchBar,
  CustomFilter,
  CarCard,
  ShowMore,
} from "../components";
import { getCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";
import { CarState } from "@/types";

export default function Home() {
  const [allCars, setAllCars] = useState<CarState>([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  //filter states
  const [year, setYear] = useState(2022);
  const [fuel, setFuel] = useState("");

  //limit state
  const [limit, setLimit] = useState(10);

  const getAllCars = async () => {
    setLoading(true);
    try {
      const result = await getCars({
        manufacturer: manufacturer.toLowerCase() || "",
        year: year || 2022,
        fuel: fuel.toLowerCase() || "",
        limit: limit || 10,
        model: model.toLowerCase() || "",
      });

      setAllCars(result);
    } catch {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCars();
  }, [fuel, manufacturer, limit, year, model]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div id="discover" className="mt-12 max-width padding-x padding-y">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p className="">Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter options={fuels} setFilter={setFuel} />
            <CustomFilter
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>
        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center ">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  className="object-contain"
                  height={50}
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              Ooops!, no cars found
            </h2>
            {/* <Link href="/">
              <p className="px-6 cursor-pointer py-3 bg-primary-blue rounded-xl text-sm text-white">
                Refresh
              </p>
            </Link> */}
          </div>
        )}
      </div>
    </main>
  );
}
