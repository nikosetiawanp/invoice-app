import "./App.css";
import { DropdownMenu } from "radix-ui";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";

import IconArrowDown from "./assets/icon-arrow-down.svg";
import IconArrowRight from "./assets/icon-arrow-right.svg";
import IconCheck from "./assets/icon-check.svg";
import IconPlus from "./assets/icon-plus.svg";
import IllustrationEmpty from "./assets/illustration-empty.svg";

import clsx from "clsx";

import data from "./data.json";

function App() {
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  return (
    <main className="flex flex-col lg:flex-row w-screen h-screen bg-11">
      <Sidebar />
      <div className="flex justify-center w-full h-full py-8 px-6 md:py-12 lg:py-16">
        <section className="flex flex-col items-center w-full h-auto gap-8 md:gap-14 md:max-w-[675px] lg:max-w-[730px]">
          {/* Header */}
          <header className="flex justify-between w-full">
            {/* Left */}
            <div className="flex flex-col h-auto">
              <span className="text-[24px] md:text-[36px] font-bold text-08">
                Invoices
              </span>

              {/* Text Mobile */}
              <span className="text-body text-06 md:hidden">7 invoices</span>
              {/* Text Desktop */}
              <span className="text-body text-06 hidden md:block">
                There are 7 total invoices
              </span>
            </div>
            {/* Right */}
            <div className="flex items-center gap-[40px]">
              <Filter
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
              />
              <button className="flex items-center gap-4 p-2 pr-4 text-heading-s bg-01 hover:bg-02 text-[#fff] rounded-full hover:cursor-pointer">
                <div className="w-[32px] h-[32px] bg-[#fff] flex justify-center items-center rounded-full">
                  <img src={IconPlus} alt="" />
                </div>
                <span className="hidden md:block">New Invoice</span>{" "}
                <span className="md:hidden">New</span>
              </button>
            </div>
          </header>

          {/* Invoices */}
          <div className="flex flex-col w-full gap-4">
            {data.map((invoice, index) => {
              return (
                <>
                  {/* Tablet & Desktop */}
                  <div
                    key={index + "-desktop"}
                    className="hidden md:flex items-center gap-8 rounded-lg p-4 w-full bg-[#fff] shadow-[0_10px_10px_10px_#48549F0D] border border-[#fff]  hover:border-01  hover:cursor-pointer"
                  >
                    <span className="text-[15px] font-bold text-08">
                      #{invoice.id}
                    </span>
                    <span className="text-[13px] text-06 font-medium">
                      Due {invoice.paymentDue}
                    </span>
                    <span className="text-[13px] text-06 font-medium">
                      {invoice.clientName}
                    </span>
                    <span className="text-[15px] font-bold text-08 ml-auto">
                      £ {invoice.total}
                    </span>
                    <PaymentStatus
                      status={invoice.status as "paid" | "pending" | "draft"}
                    />
                    <img src={IconArrowRight} alt="" />
                  </div>
                  {/* Mobile */}
                  <div
                    key={index + "-mobile"}
                    className="md:hidden flex justify-between items-center gap-8 rounded-lg p-4 w-full bg-[#fff] shadow-[0_10px_10px_10px_#48549F0D] border border-[#fff]  hover:border-01  hover:cursor-pointer"
                  >
                    {/* Left */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[15px] font-bold text-08">
                        #{invoice.id}
                      </span>
                      <span className="text-[13px] text-06 font-medium">
                        Due {invoice.paymentDue}
                      </span>
                      <span className="text-[15px] font-bold text-08">
                        £ {invoice.total}
                      </span>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-6">
                      <span className="text-[13px] text-06 font-medium">
                        {invoice.clientName}
                      </span>
                      <PaymentStatus
                        status={invoice.status as "paid" | "pending" | "draft"}
                      />
                    </div>
                    <img
                      className="hidden md:block"
                      src={IconArrowRight}
                      alt="icon-arrow-right"
                    />
                  </div>
                </>
              );
            })}
          </div>

          {/* No Item */}
          {data.length <= 0 && (
            <div className="flex flex-col items-center justify-center w-full max-w-[240px] h-full gap-4">
              <img
                className="mb-8"
                src={IllustrationEmpty}
                alt="illustration-empty"
              />
              <span className="text-heading-m text-08 text-center">
                There is nothing here
              </span>
              <span className="text-body text-06 text-center">
                Create an invoice by clicking the <b>New Invoice</b> button and
                get started
              </span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

type Invoice = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  status: "paid" | "pending" | "draft";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
};
function PaymentStatus({ status }: { status: "paid" | "pending" | "draft" }) {
  return (
    <div
      className={clsx(
        "w-[104px] h-[40px] rounded-[6px] flex items-center justify-center gap-2 text-[15px] font-bold",
        status == "paid" && "bg-[#33d69f]/5 text-[#33d69f]",
        status == "pending" && "bg-[#ff8f00]/5 text-[#ff8f00]",
        status == "draft" && "bg-[#373b53]/5 text-[#373b53]"
      )}
    >
      <div
        className={clsx(
          "rounded-full w-[8px] h-[8px]",
          status == "paid" && "bg-[#33d69f]",
          status == "pending" && "bg-[#ff8f00]",
          status == "draft" && "bg-[#373b53]"
        )}
      ></div>
      <span>
        {status == "paid" && "Paid"}
        {status == "pending" && "Pending"}
        {status == "draft" && "Draft"}
      </span>
    </div>
  );
}

type FilterProps = {
  appliedFilters: string[];
  setAppliedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};
function Filter({ appliedFilters, setAppliedFilters }: FilterProps) {
  const filters = ["Draft", "Pending", "Paid"];
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="text-08 text-heading-s flex items-center gap-4 hover:cursor-pointer">
          <span className="hidden lg:block">Filter by status</span>
          <span className="lg:hidden">Filter</span>
          <img src={IconArrowDown} alt="icon-arrow-down" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-[#fff] p-6 rounded-lg shadow-xl flex flex-col gap-2 w-[200px]">
          {filters.map((filter, index) => {
            const checked = appliedFilters.includes(filter);
            const applyFilter = () => {
              if (checked) {
                setAppliedFilters((prev) =>
                  prev.filter((item) => item !== filter)
                );
              } else {
                setAppliedFilters((prev) => [...prev, filter]);
              }
            };
            return (
              <DropdownMenu.Item
                key={index}
                className="hover:cursor-pointer group flex items-center gap-4"
                onClick={() => applyFilter()}
              >
                <div
                  className={clsx(
                    "w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border",
                    checked && "border-01 bg-01",
                    !checked && "bg-05 border-05 group-hover:border-01"
                  )}
                >
                  {checked && <img src={IconCheck} alt="icon-check" />}
                </div>
                <span className="text-[15px] font-bold mt-1">{filter}</span>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default App;
