import Image from "next/image";
import { Hero, SearchBar, CustomFilter, CarCard } from "../components";
import { getCars } from "@/utils";

export default async function Home() {
  const allCars = await getCars();

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
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>
        {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars.map((car) => (
                  <CarCard car={car} />
                ))}
              </div>
            </section>
          ) : ( 
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">
                Ooops!, no cars found
              </h2>
              <p className="">{allCars?.message}</p>
            </div>
          )}
      </div>
    </main>
  );
}
