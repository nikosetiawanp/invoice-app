import { Link, useParams } from "react-router-dom";
import IconArrowLeft from "../assets/icon-arrow-left.svg";
import { PaymentStatus } from "../components/PaymentStatus";
import { Button } from "../components/ui/Button";
import React from "react";

function InvoiceDetailPage() {
  const { id } = useParams(); // id is a string

  return (
    <section className="flex flex-col w-full h-auto gap-8 md:gap-14 md:max-w-[675px] lg:max-w-[730px]">
      {/* Navigation */}
      <div className="flex">
        <Link
          className="flex items-center gap-4 text-[15px] font-bold text-08"
          to={"/invoices"}
        >
          <img src={IconArrowLeft} alt="icon-arrow-left" /> Go back
        </Link>
      </div>

      {/* Header */}
      <header className="w-full flex bg-[#fff] items-center text-07 font-medium p-6 rounded-lg bg-white shadow-[0_4px_10px_2px_#48549F0D]">
        <div className="w-full md:w-auto flex gap-2 justify-between md:justify-start items-center">
          <span className="text-[13px]">Status</span>
          <PaymentStatus status={"paid"} />
        </div>
        <div className="ml-auto gap-2 hidden md:flex">
          <Button variant="secondary">Edit</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="primary">Mark as Paid</Button>
        </div>
      </header>

      {/* The Invoice */}
      <div className="w-full flex bg-[#fff] flex-col font-medium gap-6 p-8 rounded-lg bg-white shadow-[0_4px_10px_2px_#48549F0D]">
        {/* Invoice Header */}
        <div className="flex flex-col gap-8 md:flex-row justify-between items-start">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <span className="text-08 text-[15px] font-bold">#{id}</span>
            <span className="text-[13px] text-07">Graphic Design</span>
          </div>
          {/* Right */}
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[13px] text-07">19 Union Terrace</span>
            <span className="text-[13px] text-07">London</span>
            <span className="text-[13px] text-07">E1 3EZ</span>
            <span className="text-[13px] text-07">United Kingdom</span>
          </div>
        </div>

        {/* Invoice Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Invoice Date */}
          <div className="flex flex-col gap-1 col-start-1 row-start-1">
            <span className="text-[13px] text-07">Invoice Date</span>
            <span className="text-[15px] font-bold text-08">21 Aug 2021</span>
          </div>
          {/* Payment Due */}
          <div className="flex flex-col gap-1 col-start-1 row-start-2">
            <span className="text-[13px] text-07">Payment Due</span>
            <span className="text-[15px] font-bold text-08">20 Sep 2021</span>
          </div>
          <div className="flex flex-col gap-1 col-start-2 row-span-2">
            <span className="text-[13px] text-07">Bill To</span>
            <span className="text-[15px] text-08 font-bold">Alex Grim</span>
            <div className="flex flex-col gap-0">
              <span className="text-[13px] text-07">84 Church Way</span>
              <span className="text-[13px] text-07">Bradford</span>
              <span className="text-[13px] text-07">BD1 9PB</span>
              <span className="text-[13px] text-07">United Kingdom</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-2 row-start-3 md:col-start-3 md:col-span-1 md:row-start-1">
            <span className="text-[13px] text-07">Sent to</span>
            <span className="text-[15px] text-08 font-bold">
              alexgrim@gmail.com
            </span>
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col rounded-lg bg-11">
          {/* Items Mobile */}
          <div className="flex flex-col p-4 gap-4 md:hidden">
            {[1, 2].map((item, index) => {
              return (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[15px] text-08 font-bold">
                      Banner Design
                    </span>
                    <span className="text-[15px] text-07 font-bold">
                      £ 1 x 156.00
                    </span>
                  </div>
                  <span className="text-[15px] text-08 font-bold">
                    £ 156.00
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid-cols-4 p-4 gap-4 hidden md:grid">
            <span className="text-[13px] text-07 font-medium">Item Name</span>
            <span className="text-[13px] text-07 font-medium text-center">
              QTY.
            </span>
            <span className="text-[13px] text-07 font-medium text-right">
              Price
            </span>
            <span className="text-[13px] text-07 font-medium text-right">
              Total
            </span>

            {[1, 2].map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span className="text-[15px] font-bold text-08">
                    Banner Design
                  </span>
                  <span className="text-[15px] text-07 font-bold text-center">
                    2
                  </span>
                  <span className="text-[15px] text-07 font-bold text-right">
                    £ 200.00
                  </span>
                  <span className="text-[15px] text-08 font-bold text-right">
                    £ 400.00
                  </span>
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex justify-between items-center p-4 bg-04 rounded-b-lg">
            <span className="text-[13px] text-[#fff]">Grand Total</span>
            <span className="text-[24px] text-[#fff] font-bold">£ 156.00</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#fff] w-full p-4 absolute bottom-0 left-0">
        <div className="fw-full gap-2 flex justify-center md:hidden">
          <Button variant="secondary">Edit</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="primary" fullWidth>
            Mark as Paid
          </Button>
        </div>
      </div>
    </section>
  );
}

export { InvoiceDetailPage };
