import { Select } from "radix-ui";
import { Input } from "./ui/Input";
import clsx from "clsx";

import IconArrowDown from "../assets/icon-arrow-down.svg";
import IconDelete from "../assets/icon-delete.svg";

import React, { useState } from "react";
import { Button } from "./ui/Button";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceSchema } from "./schemas/invoiceSchema";

function InvoiceForm() {
  type Item = {
    id: number;
    name: string;
    quantity: string;
    price: string;
  };
  const [items, setItems] = useState<Item[]>([]);
  const item = {
    name: "",
    quantity: 0,
    price: 0,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(InvoiceSchema),
  });

  const onSubmit: SubmitHandler<InvoiceSchema> = (data: InvoiceSchema) => {
    console.log(data);
  };

  return (
    <div className="fixed left-0 top-0 bg-[#fff] flex flex-col p-6 pt-[96px] md:p-12 md:pt-[128px] lg:pl-[148px] lg:pt-12 md:rounded-r-[20px] w-full md:w-[615px] lg:w-[720px] h-screen">
      {/* Layout */}
      <div className="flex flex-col gap-5 overflow-auto scrollbar-hide">
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

        <span className="text-[#777f98] text-[18px] font-bold">Item List</span>

        {/* Mobile */}
        <div className="flex flex-col gap-2 md:hidden">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4"
              >
                <div className="col-span-4">
                  <Input
                    id={"item-name"}
                    name={"itemName"}
                    type={"text"}
                    label={"Item Name"}
                    value={""}
                    onChange={() => {}}
                  />
                </div>
                <Input
                  id={"quantity"}
                  name={"quantity"}
                  type={"number"}
                  label={"Qty."}
                  value={""}
                  onChange={() => {}}
                />
                <Input
                  id={"price"}
                  name={"price"}
                  type={"number"}
                  label={"Price"}
                  value={""}
                  onChange={() => {}}
                />
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] text-07">Total</span>
                  <div className="flex h-full items-center">
                    <span className="text-[15px] text-07 font-bold">
                      156.00
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-end h-full pb-2">
                  <button className="hover:cursor-pointer hover:bg-11 p-3 rounded-full">
                    <img src={IconDelete} alt="icon-delete" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & Desktop */}
        <div className="hidden md:grid grid-cols-[4fr_1fr_2fr_1fr_1fr] gap-4 gap-y-2">
          <span className="text-[13px] text-07">Item Name</span>{" "}
          <span className="text-[13px] text-07">Qty.</span>
          <span className="text-[13px] text-07">Price</span>
          <span className="text-[13px] text-07 text-center">Total</span>
          <span></span>
          {items.map((item, index) => {
            const deleteItem = () =>
              setItems(
                items.filter((existingItem) => existingItem.id !== item.id)
              );
            return (
              <React.Fragment key={index}>
                <Input
                  id={""}
                  name={""}
                  type={"text"}
                  label={""}
                  value={""}
                  onChange={() => {}}
                />
                <Input
                  id={""}
                  name={""}
                  type={"text"}
                  label={""}
                  value={""}
                  onChange={() => {}}
                />
                <Input
                  id={""}
                  name={""}
                  type={"text"}
                  label={""}
                  value={""}
                  onChange={() => {}}
                />
                <div className="flex justify-center items-center">
                  <span className="text-[15px] text-06 font-bold text-center">
                    150.00
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <button className="hover:cursor-pointer hover:bg-11 p-3 rounded-full">
                    <img src={IconDelete} alt="icon-delete" />
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <Button
          variant="secondary"
          onClick={() => setItems((prev) => [...prev, item])}
          fullWidth
        >
          + Add New Item
        </Button>

        <div className="flex justify-between">
          <Button variant="secondary">Discard</Button>
          <div className="flex gap-4">
            <Button variant="tertiary">Save as Draft</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
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
