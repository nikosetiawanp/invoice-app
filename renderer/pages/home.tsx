import React, { useState } from "react";
import Head from "next/head";

import Filter from "../components/Filter";
import Invoice from "../components/Invoice";
import Navbar from "../components/Navbar";

function Home() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <React.Fragment>
      <Head>
        <title>Invoice</title>
      </Head>
      <div className="w-screen h-screen flex">
        <Navbar />

        {/* VIEWPORT */}
        <section className="flex flex-col items-center w-full min-w-[1024px] h-full px-8 py-16 overflow-scroll">
          {/* MENU */}
          <div className="flex items-center gap-8 mb-8 w-full max-w-[1024px]">
            {/* LEFT SIDE */}
            <span className="flex flex-col gap-1">
              <h1 className="text-4xl font-bold">Invoices</h1>
              <h2 className="text-white/70 text-sm">
                There are 7 total invoices
              </h2>
            </span>
            {/* RIGHT SIDE */}
            <Filter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <button className="bg-purple hover:bg-purple-hover rounded-full h-12 p-2 pr-4 flex items-center gap-2">
              <div className="bg-white rounded-full text-purple w-8 h-8 flex items-center justify-center font-bold">
                +
              </div>
              <p className="text-sm font-bold">New Invoice</p>
            </button>
          </div>

          {/* INVOICE LIST */}
          <div className="flex flex-col gap-4 w-full max-w-[1024px]">
            <Invoice />
            <Invoice />
            <Invoice />
            <Invoice />
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default Home;
