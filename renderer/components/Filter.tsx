import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import IconChevronDown from "../assets/icon-chevron-down.svg";
import { useState } from "react";

interface Status {
  id: number;
  name: string;
}

const status = [
  { id: 0, name: "All" },
  { id: 1, name: "Paid" },
  { id: 2, name: "Pending" },
  { id: 3, name: "Draft" },
];

export default function Filter(props: {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Listbox value="selectedFilter" onChange={props.setSelectedFilter}>
      <div className="relative ml-auto flex items-center">
        Status :
        <Listbox.Button
          className={`outline-none hover:bg-cool-grey rounded-full ml-2 px-2 py-1 flex items-center gap-2`}
        >
          {props.selectedFilter}{" "}
          <Image src={IconChevronDown} height={15} width={15} />
        </Listbox.Button>
        <Listbox.Options
          className={`bg-dark-blue border border-white/20 rounded-lg overflow-hidden absolute right-0 top-10`}
        >
          {status.map((status) => (
            <Listbox.Option
              className={`p-2 px-4 text-sm text-center hover:cursor-pointer hover:bg-cool-grey ${
                props.selectedFilter === status.name && "text-purple"
              }`}
              key={status.id}
              value={status.name}
            >
              {status.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
