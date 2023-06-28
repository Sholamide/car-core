"use client";

import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { ChangeEvent, Fragment, useState } from "react";

const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManufacturerProps) => {
  const [query, setQuery] = useState(""); // State for storing the search query

  // Filter the manufacturers based on the search query
  const filteredManufacturers =
    query === "" // If the search query is empty
      ? manufacturers // Return all manufacturers
      : manufacturers.filter(
          (manufacturer: string) =>
            manufacturer // return manufacturer that includes query value
              .toLowerCase() // convert manufacturer name to lowercase
              .replace(/\s+/g, "") // remove whitespace from manufacturer name
              .includes(query.toLowerCase().replace(/\s+/g, "")) // check if the manufacturer name includes the search query
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManuFacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              alt="car logo"
              width={20}
              height={20}
              className="ml-4"
              src="/car-logo.svg"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Lexus..."
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            afterLeave={() => setQuery("")}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as={Fragment}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="search-manufacturer__option"
                >
                  Create "{query}""
                </Combobox.Option>
              ) : (
                // Display the filtered manufacturers as options
                filteredManufacturers.map((manufacturer) => (
                  <Combobox.Option
                    key={manufacturer}
                    value={manufacturer}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        {/* Display the manufacturer name */}
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {manufacturer}
                        </span>
                        {selected ? ( // Show an active blue background color if the option is selected
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
