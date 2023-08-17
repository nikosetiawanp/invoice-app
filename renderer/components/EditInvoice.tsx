import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import IconTrash from "../assets/icon-trash.svg";

export default function EditInvoice() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 ml-auto"
      >
        Edit
      </button>
      <Dialog
        className={`bg-black/50 fixed top-0 left-16 w-full h-full flex justify-start items-center`}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel
          className={`bg-dark-blue p-12 h-full rounded-r-2xl flex flex-col gap-8 shadow-lg w-full max-w-3xl overflow-y-scroll`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="submit"
            className="flex flex-col gap-10"
          >
            <Dialog.Title className={`font-semibold flex text-2xl`}>
              Edit &nbsp; <p className="text-white/70">#</p>XM9141
            </Dialog.Title>

            {/* BILL FROM */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-purple mb-4">
                Bill From
              </span>
              {/* STREET ADDRESS */}
              <label
                htmlFor="streetAddressFrom"
                className="mb-2 text-white/50 text-sm"
              >
                Street address
              </label>
              <input
                {...register("streetAddressFrom")}
                id="streetAddressFrom"
                placeholder="Street address"
                className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
              />

              {/* CITY POSTCODE COUNTRY */}
              <div className="flex gap-4 w-full">
                {/* CITY */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="cityFrom"
                    className="mb-2 text-white/50 text-sm"
                  >
                    City
                  </label>
                  <input
                    {...register("cityFrom")}
                    id="cityFrom"
                    placeholder="City"
                    className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                  />
                </div>
                {/* POST CODE */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="postCodeFrom"
                    className="mb-2 text-white/50 text-sm"
                  >
                    Post Code
                  </label>
                  <input
                    {...register("postCodeFrom")}
                    id="postCodeFrom"
                    placeholder="Post code"
                    className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                  />
                </div>
                {/* COUNTRY */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="countryFrom"
                    className="mb-2 text-white/50 text-sm"
                  >
                    Country
                  </label>
                  <input
                    {...register("countryFrom")}
                    id="countryFrom"
                    placeholder="Country"
                    className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            {/* BILL TO */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-purple mb-4">
                Bill To
              </span>

              {/* CLIENT NAME */}
              <label
                htmlFor="clientName"
                className="mb-2 text-white/50 text-sm"
              >
                Client's Name
              </label>
              <input
                {...register("clientName")}
                id="clientName"
                placeholder="Client's name"
                className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
              />

              {/* CLIENT EMAIL */}
              <label
                htmlFor="clientEmail"
                className="mb-2 text-white/50 text-sm"
              >
                Client's Email
              </label>
              <input
                {...register("clientEmail")}
                id="clientEmail"
                placeholder="Client's email"
                className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
              />
              {/* STREET ADDRESS */}
              <label
                htmlFor="streetAddressTo"
                className="mb-2 text-white/50 text-sm"
              >
                Street address
              </label>
              <input
                {...register("streetAddressTo")}
                id="streetAddressTo"
                placeholder="Street address"
                className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
              />

              {/* CITY POSTCODE COUNTRY */}
              <div className="flex gap-4 w-full">
                {/* CITY */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="cityTo"
                    className="mb-2 text-white/50 text-sm"
                  >
                    City
                  </label>
                  <input
                    {...register("cityTo")}
                    id="cityTo"
                    placeholder="City"
                    className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                  />
                </div>
                {/* POST CODE */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="postCodeTo"
                    className="mb-2 text-white/50 text-sm"
                  >
                    Post Code
                  </label>
                  <input
                    {...register("postCodeTo")}
                    id="postCodeTo"
                    placeholder="Post code"
                    className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                  />
                </div>
                {/* COUNTRY */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="countryTo"
                    className="mb-2 text-white/50 text-sm"
                  >
                    Country
                  </label>
                  <input
                    {...register("countryTo")}
                    id="countryTo"
                    placeholder="Country"
                    className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            {/* DATE, PAYMENT, & DESCRIPTION */}
            <div className="flex flex-col gap-4 w-full">
              {/* DATE & PAYMENT TERMS */}
              <div className="flex gap-4 w-full">
                {/* DATE */}
                <div className="flex flex-col w-full">
                  <label htmlFor="date" className="mb-2 text-white/50 text-sm">
                    Invoice Date
                  </label>
                  <input
                    {...register("date")}
                    type="date"
                    id="date"
                    className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50 hover:cursor-text"
                  />
                </div>
                {/* PAYMENT TERMS */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="paymentTerm"
                    className="mb-2 text-white/50 text-sm"
                  >
                    Payment Terms
                  </label>
                  <input
                    {...register("paymentTerm")}
                    id="paymentTerm"
                    placeholder="Payment term"
                    className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="mb-2 text-white/50 text-sm"
                >
                  Description
                </label>
                <input
                  {...register("description")}
                  id="description"
                  placeholder="Description"
                  className="outline-none px-4 py-3 mb-4 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                />
              </div>
            </div>

            {/* ITEM LIST */}
            <div className="flex flex-col">
              <span className="text-white/50 text-2xl font-bold mb-4">
                Item List
              </span>
              {/* ITEM NAME, QTY, PRICE, TOTAL, TRASH */}
              <div className="grid grid-cols-12 gap-4 w-full">
                {/* LABELS */}
                <span className="col-span-4 text-sm text-white/50">
                  Item Name
                </span>
                <span className="col-span-2 text-sm text-white/50">Qty.</span>
                <span className="col-span-2 text-sm text-white/50">Price</span>
                <span className="col-span-3 text-sm text-white/50">Total</span>
                <span className=""></span>

                {/* ROW */}
                {/* ITEM NAME */}
                <input
                  {...register("itemName")}
                  id="itemName"
                  placeholder="Item name"
                  className="col-span-4 outline-none px-4 py-3 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                />

                {/* QTY */}
                <input
                  {...register("quantity")}
                  id="quantity"
                  placeholder="0"
                  className="col-span-2 outline-none px-4 py-3 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                />

                {/* PRICE */}
                <input
                  {...register("price")}
                  id="price"
                  placeholder="0"
                  className="col-span-2 outline-none px-4 py-3 rounded-lg bg-cool-grey text-sm border border-white/5 focus:border-white/20 font-bold placeholder:font-light placeholder:text-white/50"
                />

                {/* TOTAL */}
                <span className="flex items-center col-span-3 w-full text-right font-bold text-sm text-white/50">
                  300.000
                </span>

                {/* TRASH */}
                <button className="w-[40px] h-[40px] flex justify-center items-center rounded-lg opacity-50 hover:opacity-100 hover:bg-cool-grey">
                  <Image src={IconTrash} width={20} height={20} />
                </button>
                {/* END OF ROW */}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-cool-grey hover:bg-cool-grey-hover text-white text-sm font-semibold rounded-full py-3 px-6"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-purple hover:bg-purple-hover text-white text-sm font-semibold rounded-full py-3 px-6"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
