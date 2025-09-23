import { Dialog, Select } from "radix-ui";
import { Input } from "./ui/Input";
import clsx from "clsx";

import IconArrowDown from "../assets/icon-arrow-down.svg";
import IconDelete from "../assets/icon-delete.svg";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

import {
  Controller,
  useForm,
  type ControllerRenderProps,
  useFieldArray,
  type SubmitHandler,
  type SubmitErrorHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceSchema } from "./schemas/invoiceSchema";

import { generateUniqueId } from "../utils/idHelper";

function InvoiceForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    defaultValues: {
      id: generateUniqueId(),
      status: "pending",
      paymentTerms: 30,
      items: [],
      createdAt: new Date().toISOString(),
    },
    resolver: zodResolver(InvoiceSchema),
  });

  const onSubmit: SubmitHandler<InvoiceSchema> = (data) => {
    console.log("triggered");

    console.log("✅ validation success", data);
  };
  const onError: SubmitErrorHandler<InvoiceSchema> = (errors) => {
    console.log("❌ validation error", errors);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);

  const items = watch("items");

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="fixed left-0 top-0 bg-[#fff] flex flex-col p-6 pt-[96px] md:p-12 md:pt-[128px] lg:pl-[148px] lg:pt-12 md:rounded-r-[20px] w-full md:w-[615px] lg:w-[720px] h-screen">
        {/* Layout */}
        <div className="flex flex-col gap-5 overflow-auto scrollbar-hide">
          <Dialog.Title className="text-[24px] font-bold text-08">
            New Invoice
          </Dialog.Title>
          {/* Sender */}
          <span className="text-[15px] font-bold text-01">Bill From</span>

          <Input
            id={"sender-street-address"}
            type={"text"}
            label={"Street Address"}
            {...register("senderAddress.street")}
            error={errors.senderAddress?.street}
          />
          <div className="md:flex grid grid-cols-2 gap-5">
            <Input
              id={"sender-city"}
              type={"text"}
              label={"City"}
              {...register("senderAddress.city")}
              error={errors.senderAddress?.city}
            />
            <Input
              id={"sender-post-code"}
              type={"text"}
              label={"Post Code"}
              {...register("senderAddress.postCode")}
              error={errors.senderAddress?.postCode}
            />

            <div className="row-start-2 col-span-2 w-full">
              <Input
                id={"sender-country"}
                type={"text"}
                label={"Country"}
                {...register("senderAddress.country")}
                error={errors.senderAddress?.country}
              />
            </div>
          </div>
          {/* Client */}
          <span className="text-[15px] font-bold text-01">Bill To</span>
          <Input
            id={"client-name"}
            type={"text"}
            label={"Client's Name"}
            {...register("clientName")}
            error={errors.clientName}
          />
          <Input
            id={"client-email"}
            type={"email"}
            label={"Client's Email"}
            placeholder="e.g. email@example.com"
            {...register("clientEmail")}
            error={errors.clientEmail}
          />
          <Input
            id={"client-street-address"}
            type={"text"}
            label={"Street Address"}
            {...register("clientAddress.street")}
            error={errors.clientAddress?.street}
          />
          <div className="md:flex grid grid-cols-2 gap-5">
            <Input
              id={"client-city"}
              type={"text"}
              label={"City"}
              {...register("clientAddress.city")}
              error={errors.clientAddress?.city}
            />
            <Input
              id={"client-post-code"}
              type={"text"}
              label={"Post Code"}
              {...register("clientAddress.postCode")}
              error={errors.clientAddress?.postCode}
            />
            <div className="row-start-2 col-span-2 w-full">
              <Input
                id={"client-country"}
                type={"text"}
                label={"Country"}
                {...register("clientAddress.country")}
                error={errors.clientAddress?.country}
              />
            </div>
          </div>

          {/* Invoice Date & Payment Terms */}
          <div className="flex gap-5">
            <Controller
              name="paymentTerms"
              control={control}
              render={({ field }) => <SelectPaymentTerm field={field} />}
            />
          </div>

          <Input
            id={"project-description"}
            type={"text"}
            label={"Project Description"}
            placeholder="e.g. Graphic Design Service"
            {...register("description")}
            error={errors.description}
          />

          <span className="text-[#777f98] text-[18px] font-bold">
            Item List
          </span>
          <div className="grid grid-cols-[1fr_2fr_1fr_1fr] md:grid-cols-[4fr_2fr_3fr_1fr_1fr] gap-4">
            {screenWidth >= 768 && (
              <React.Fragment>
                <span className="text-[13px] text-07">Item Name</span>
                <span className="text-[13px] text-07">Qty.</span>
                <span className="text-[13px] text-07">Price</span>
                <span className="text-[13px] text-07 text-left">Total</span>
                <span className=""></span>
              </React.Fragment>
            )}

            {fields.map((field, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={clsx(
                      "col-span-4 md:col-span-1",
                      index > 0 && "mt-4 md:mt-0"
                    )}
                  >
                    <Input
                      id={"item-name"}
                      type={"text"}
                      label={screenWidth < 768 ? "Item Name" : ""}
                      {...register(`items.${index}.name` as const)}
                      defaultValue={field.name}
                      error={errors.items?.[index]?.name}
                      hideErrorMessage
                    />
                  </div>
                  <Input
                    id={"quantity"}
                    type={"number"}
                    label={screenWidth < 768 ? "Qty." : ""}
                    {...register(`items.${index}.quantity` as const, {
                      valueAsNumber: true,
                    })}
                    defaultValue={field.quantity}
                    error={errors.items?.[index]?.quantity}
                    hideErrorMessage
                  />
                  <Input
                    id={"price"}
                    type={"number"}
                    label={screenWidth < 768 ? "Price" : ""}
                    placeholder="0.00"
                    {...register(`items.${index}.price` as const, {
                      valueAsNumber: true,
                    })}
                    defaultValue={field.price}
                    error={errors.items?.[index]?.price}
                    hideErrorMessage
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-[13px] text-07 md:hidden">Total</span>
                    <div className="flex h-full items-center">
                      <span className="text-[15px] text-07 font-bold">
                        {items?.[index]?.price * items?.[index]?.quantity || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center items-end h-full pb-2">
                    <button
                      className="hover:cursor-pointer hover:bg-11 p-3 rounded-full"
                      onClick={() => remove(index)}
                    >
                      <img src={IconDelete} alt="icon-delete" />
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <Button
            variant="secondary"
            onClick={() => append({ name: "", quantity: 0, price: 0 })}
            fullWidth
          >
            + Add New Item
          </Button>

          <div className="flex justify-between">
            <Button variant="secondary">Discard</Button>
            <div className="flex gap-4">
              <Button variant="tertiary">Save as Draft</Button>
              <Button variant="primary" type="submit">
                Save & Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

type SelectPaymentTermProps = {
  field: ControllerRenderProps<InvoiceSchema, "paymentTerms">;
};
function SelectPaymentTerm({ field }: SelectPaymentTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Select.Root
      value={String(field.value)}
      onValueChange={(val) => field.onChange(Number(val))}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={""} className="text-[13px] text-06">
          Payment Terms
        </label>
        <Select.Trigger
          className={clsx(
            "flex justify-between items-center h-[48px] border border-05 rounded-sm p-4 text-[15px] font-bold text-08 placeholder:text-08/40 w-full hover:cursor-pointer hover:border-01"
          )}
        >
          <Select.Value />
          <Select.Icon>
            <img
              src={IconArrowDown}
              alt="icon-arrow-down"
              className={clsx(isOpen && "rotate-180")}
            />
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
                      className={clsx(
                        "py-3 px-5 font-bold text-08 hover:text-01 hover:cursor-pointer",
                        "data-[state=checked]:text-01"
                      )}
                    >
                      <Select.ItemText>Net {term} days</Select.ItemText>
                    </Select.Item>
                    {index < 3 && (
                      <Select.Separator className="h-[1px] bg-05" />
                    )}
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
