import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import IconChevronDown from "../assets/icon-chevron-down.svg";
import Delete from "../components/Delete";
import EditInvoice from "../components/EditInvoice";

export default function Detail() {
  return (
    <React.Fragment>
      <Head>
        <title>Invoice</title>
      </Head>

      <div className="w-screen h-screen flex">
        <Navbar />

        {/* VIEWPORT */}
        <section className="flex flex-col items-center w-full min-w-[1024px] h-full px-8 py-16 overflow-scroll">
          {/* CONTAINER */}
          <div className="flex flex-col gap-8">
            {/* MENU */}
            <Link href={`/home`}>
              <span className="text-sm hover:cursor-pointer hover:bg-cool-grey w-fit p-2 rounded-full flex items-center gap-2">
                <Image
                  src={IconChevronDown}
                  className="rotate-90"
                  width={15}
                  height={15}
                />
                Go back
              </span>
            </Link>
            <div className="flex items-center gap-4 w-full max-w-[1024px] bg-cool-grey p-8 rounded-lg">
              <p className="text-sm">Status</p>
              <div className="bg-orange/10 w-24 rounded-lg py-3 flex justify-center items-center gap-2">
                <div className="rounded-full w-2 h-2 bg-orange"></div>
                <span className="text-orange text-sm font-semibold">
                  Pending
                </span>
              </div>
              <EditInvoice />

              {/* <button className="text-sm px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 ml-auto">
                Edit
              </button> */}
              <Delete />
              {/* <button className="text-sm px-8 py-4 rounded-full bg-red hover:bg-red-hover">
                Delete
              </button> */}
              <button className="text-sm px-8 py-4 rounded-full bg-purple hover:bg-purple-hover">
                Mark as Paid
              </button>
            </div>

            {/* INVOICE DETAIL */}
            <div className="flex flex-col gap-8 mb-8 w-full max-w-[1024px] bg-cool-grey p-16 rounded-lg">
              {/* FIRST ROW */}
              <div className="flex justify-between">
                <div>
                  <span className="font-semibold flex text-xl">
                    <p className="text-white/70">#</p>XM9141
                  </span>
                  <p className="text-sm text-white/50">Graphic Design</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm text-white/50">19 Union Terrace</p>
                  <p className="text-sm text-white/50">London</p>
                  <p className="text-sm text-white/50">E1 3EZ</p>
                  <p className="text-sm text-white/50">United Kingdom</p>
                </div>
              </div>

              {/* SECOND ROW */}
              <div className="flex gap-48 mb-8">
                {/* FIRST COLUMN */}
                <div className="flex flex-col gap-8">
                  {/* INVOICE DATE */}
                  <div>
                    <p className="text-sm text-white/50">Invoice Date</p>
                    <span className="font-semibold flex text-xl">
                      21 Aug 2023
                    </span>
                  </div>
                  {/* INVOICE DUE */}
                  <div>
                    <p className="text-sm text-white/50">Invoice Due</p>
                    <span className="font-semibold flex text-xl">
                      21 Sep 2023
                    </span>
                  </div>
                </div>
                {/* SECOND COLUMN */}
                <div>
                  <p className="text-sm text-white/50">Bill To</p>
                  <span className="font-semibold flex text-xl my-2">
                    Alex Grim
                  </span>
                  <p className="text-sm text-white/50">84 Church Way</p>
                  <p className="text-sm text-white/50">Bradford</p>
                  <p className="text-sm text-white/50">BD19PB</p>
                  <p className="text-sm text-white/50">United Kingdom</p>
                </div>
                {/* THIRD COLUMN */}
                <div>
                  <p className="text-sm text-white/50">Sent To</p>
                  <span className="font-semibold flex text-xl">
                    alexgrim@email.com
                  </span>
                </div>
              </div>

              {/* THIRD ROW */}
              <table className="w-full bg-white/5 rounded-lg overflow-hidden">
                {/* HEADER TABLE */}
                <tr>
                  <th className="text-white/50 font-medium p-8 text-start min-w-[300px]">
                    Item Name
                  </th>
                  <th className="text-white/50 font-medium p-8">QTY.</th>
                  <th className="text-white/50 font-medium p-8 text-end">
                    Price
                  </th>
                  <th className="text-white/50 font-medium p-8 text-end">
                    Total
                  </th>
                </tr>
                {/* CONTENT */}
                <tr>
                  <th className="text-white font-medium px-8 pb-8 text-start">
                    Banner Design
                  </th>
                  <th className="text-white font-medium px-8 pb-8">2</th>
                  <th className="text-white font-medium px-8 pb-8 text-end">
                    Rp 500.000
                  </th>
                  <th className="text-white font-medium px-8 pb-8 text-end">
                    Rp 1.000.000
                  </th>
                </tr>
                <tr>
                  <th className="text-white font-medium px-8 pb-8 text-start min-w-[300px]">
                    Banner Design
                  </th>
                  <th className="text-white font-medium px-8 pb-8">2</th>
                  <th className="text-white font-medium px-8 pb-8 text-end">
                    Rp 500.000
                  </th>
                  <th className="text-white font-medium px-8 pb-8 text-end">
                    Rp 1.000.000
                  </th>
                </tr>{" "}
                <tr>
                  <th className="text-white font-medium px-8 pb-8 text-start">
                    Banner Design
                  </th>
                  <th className="text-white font-medium px-8 pb-8">2</th>
                  <th className="text-white font-medium px-8 pb-8 text-end">
                    Rp 500.000
                  </th>
                  <th className="text-white font-medium px-8 pb-8 text-end">
                    Rp 1.000.000
                  </th>
                </tr>
                <tr>
                  <th className="bg-black text-white/50 font-medium p-8 text-start">
                    Amount due
                  </th>
                  <th className="bg-black text-white font-medium p-8 text-end"></th>
                  <th className="bg-black text-white font-medium p-8 text-end"></th>
                  <th className="bg-black text-white font-medium p-8 text-end text-2xl">
                    Rp 3.000.000
                  </th>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
