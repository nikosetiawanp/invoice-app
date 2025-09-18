import { Select } from "radix-ui";
import { Input } from "./ui/Input";
import clsx from "clsx";

import IconArrowDown from "../assets/icon-arrow-down.svg";
import React from "react";

function InvoiceForm() {
  return (
    <div className="absolute w-full h-screen bg-[#000]/50 top-[72px] md:top-[80px] lg:left-[100px] lg:top-0">
      {/* Paper */}
      <div className="bg-[#fff] flex flex-col p-6 md:p-12 md:rounded-r-[20px] w-full md:w-[615px] lg:w-[720px] h-screen">
        {/* Layout */}
        <div className="flex flex-col gap-5 overflow-auto">
          <span className="text-[24px] font-bold text-08">New Invoice</span>
          {/* Sender */}
          <span className="text-[15px] font-bold text-01">Bill From</span>

          <Input
            id={"sender-street-address"}
            name="senderStreetAddress"
            type={"text"}
            label={"Street Address"}
            value={""}
            onChange={() => {}}
          />
          <div className="md:flex grid grid-cols-2 gap-5">
            <Input
              id={"sender-city"}
              name="senderCity"
              type={"text"}
              label={"City"}
              value={""}
              onChange={() => {}}
            />
            <Input
              id={"sender-post-code"}
              name="senderPostCode"
              type={"text"}
              label={"Post Code"}
              value={""}
              onChange={() => {}}
            />
            <div className="row-start-2 col-span-2 w-full">
              <Input
                id={"sender-country"}
                name="senderCountry"
                type={"text"}
                label={"Country"}
                value={""}
                onChange={() => {}}
              />
            </div>
          </div>
          {/* Client */}
          <span className="text-[15px] font-bold text-01">Bill To</span>
          <Input
            id={"client-name"}
            name="clientName"
            type={"text"}
            label={"Client's Name"}
            value={""}
            onChange={() => {}}
          />
          <Input
            id={"client-email"}
            name="clientEmail"
            type={"email"}
            label={"Client's Email"}
            value={""}
            onChange={() => {}}
            placeholder="e.g. email@example.com"
          />
          <Input
            id={"client-street-address"}
            name="clientStreetAddress"
            type={"text"}
            label={"Street Address"}
            value={""}
            onChange={() => {}}
          />
          <div className="md:flex grid grid-cols-2 gap-5">
            <Input
              id={"client-city"}
              name="clientCity"
              type={"text"}
              label={"City"}
              value={""}
              onChange={() => {}}
            />
            <Input
              id={"client-post-code"}
              name="clientPostCode"
              type={"text"}
              label={"Post Code"}
              value={""}
              onChange={() => {}}
            />
            <div className="row-start-2 col-span-2 w-full">
              <Input
                id={"client-country"}
                name="clientCountry"
                type={"text"}
                label={"Country"}
                value={""}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Invoice Date & Payment Terms */}
          <div className="flex gap-5">
            <SelectPaymentTerm />
          </div>

          <Input
            id={"project-description"}
            name="projectDescription"
            type={"text"}
            label={"Project Description"}
            value={""}
            onChange={() => {}}
            placeholder="e.g. Graphic Design Service"
          />

          <span className="text-[#777f98] text-[18px] font-bold">
            Item List
          </span>
        </div>
      </div>
    </div>
  );
}

function SelectPaymentTerm() {
  return (
    <Select.Root>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={""} className="text-[13px] text-06">
          Payment Terms
        </label>
        <Select.Trigger
          className={clsx(
            "flex justify-between items-center h-[48px] border border-05 rounded-sm p-4 text-[15px] font-bold text-08 placeholder:text-08/40 w-full hover:cursor-pointer hover:border-01"
          )}
        >
          <Select.Value placeholder="Net 30 days" defaultValue={30} />
          <Select.Icon>
            <img src={IconArrowDown} alt="icon-arrow-down" />
          </Select.Icon>
        </Select.Trigger>
      </div>
      <Select.Portal>
        <Select.Content
          position="popper"
          className="bg-[#fff] rounded-lg shadow-xl min-w-[var(--radix-select-trigger-width)]"
        >
          <Select.Viewport>
            <Select.Group>
              {[1, 7, 14, 30].map((term, index) => {
                return (
                  <React.Fragment key={index}>
                    <Select.Item
                      value={term.toString()}
                      className="py-3 px-5 font-bold text-08 hover:text-01 hover:cursor-pointer"
                    >
                      <Select.ItemText>Net {term} days</Select.ItemText>
                    </Select.Item>
                    <Select.Separator className="h-[1px] bg-05" />
                  </React.Fragment>
                );
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export { InvoiceForm };
