import { Dialog, Select } from "radix-ui";
import { Input } from "./ui/Input";
import clsx from "clsx";

import IconPlus from "../assets/icon-plus.svg";
import IconArrowDown from "../assets/icon-arrow-down.svg";

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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

import { format } from "date-fns";

import IconCalendar from "../assets/icon-calendar.svg";
import { createInvoice, updateInvoice } from "../utils/localStorageHelper";
import { useQueryClient } from "@tanstack/react-query";

type InvoiceFormProps = {
  mode: "create" | "update";
  invoice?: InvoiceSchema;
};

function InvoiceForm({ mode, invoice }: InvoiceFormProps) {
  const defaultValues: InvoiceSchema = {
    id: generateUniqueId(),
    description: "",
    paymentTerms: 30 as 1 | 7 | 14 | 30,
    clientName: "",
    clientEmail: "",
    status: "pending",
    senderAddress: { street: "", city: "", postCode: "", country: "" },
    clientAddress: { street: "", city: "", postCode: "", country: "" },
    items: [],
    createdAt: new Date(),
  };

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    defaultValues: defaultValues,
    resolver: zodResolver(InvoiceSchema),
  });

  const onSubmit: SubmitHandler<InvoiceSchema> = (data) => {
    if (mode === "create") {
      createInvoice(data);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    }

    if (mode === "update") {
      updateInvoice(data);
      queryClient.invalidateQueries({ queryKey: ["invoice", data.id] });
    }

    console.log("✅ validation success", data);
    setOpen(false);
  };
  const onError: SubmitErrorHandler<InvoiceSchema> = (errors) => {
    console.error("❌ validation error", errors);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const [open, setOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);

  useEffect(() => {
    if (mode === "update" && invoice) {
      reset({ ...invoice, createdAt: new Date(invoice.createdAt as Date) });
    }
  }, [invoice, mode, reset]);

  const items = watch("items");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {mode === "create" && (
        <Dialog.Trigger className="flex items-center gap-4 p-2 pr-4 text-heading-s bg-01 hover:bg-02 text-[#fff] rounded-full hover:cursor-pointer">
          <div className="w-[32px] h-[32px] bg-[#fff] flex justify-center items-center rounded-full">
            <img src={IconPlus} alt="" />
          </div>
          <span className="hidden md:block">New Invoice</span>
          <span className="md:hidden">New</span>
        </Dialog.Trigger>
      )}

      {mode === "update" && (
        <Dialog.Trigger className="rounded-full">
          <Button variant="secondary">Edit</Button>
        </Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed w-screen h-full bg-[#000]/50 top-[72px] md:top-[80px] lg:left-0 lg:top-0" />
        <Dialog.Content>
          <form onSubmit={handleSubmit(onSubmit as any, onError)}>
            <div className="fixed left-0 top-0 bg-[#fff] dark:bg-12 flex flex-col p-6 pt-[96px] md:p-12 md:pt-[128px] lg:pl-[148px] lg:pt-12 md:rounded-r-[20px] w-full md:w-[615px] lg:w-[720px] h-screen">
              {/* Layout */}
              <div className="flex flex-col gap-5 overflow-auto scrollbar-hide pb-40 md:pb-0">
                {mode === "create" && (
                  <Dialog.Title className="text-[24px] font-bold text-08 dark:text-[#fff]">
                    New Invoice
                  </Dialog.Title>
                )}

                {mode === "update" && (
                  <Dialog.Title className="text-[24px] font-bold text-08 dark:text-[#fff]">
                    Edit <b className="text-06">#</b>
                    {invoice?.id}
                  </Dialog.Title>
                )}

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
                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor={""} className="text-[13px] text-06">
                      Invoice Date
                    </label>
                    <Controller
                      name="createdAt"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value as Date}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
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

                <span className="col-span-4 text-[#777f98] text-[18px] font-bold">
                  Item List
                </span>
                {fields.length > 0 && (
                  <div className="grid grid-cols-[1fr_2fr_1fr_1fr] md:grid-cols-[4fr_2fr_3fr_1fr_1fr] gap-4">
                    {screenWidth >= 768 && (
                      <React.Fragment>
                        <span className="text-[13px] text-07 dark:text-06">
                          Item Name
                        </span>
                        <span className="text-[13px] text-07 dark:text-06">
                          Qty.
                        </span>
                        <span className="text-[13px] text-07 dark:text-06">
                          Price
                        </span>
                        <span className="text-[13px] text-07 dark:text-06 text-left">
                          Total
                        </span>
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
                            <span className="text-[13px] text-07 dark:text-06 md:hidden">
                              Total
                            </span>
                            <div className="flex h-full items-center">
                              <span className="text-[15px] text-07 dark:text-06 font-bold">
                                {items?.[index]?.price *
                                  items?.[index]?.quantity || 0}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center items-end h-full pb-2">
                            <button
                              className="group hover:cursor-pointer p-3 rounded-full"
                              onClick={() => remove(index)}
                            >
                              <svg
                                width="13"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-06 group-hover:fill-09"
                              >
                                <path
                                  d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                                  fill=""
                                  fill-rule="nonzero"
                                />
                              </svg>
                            </button>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}

                <Button
                  variant="secondary"
                  onClick={() => append({ name: "", quantity: 0, price: 0 })}
                  fullWidth
                >
                  + Add New Item
                </Button>

                {/* Form actions mobile*/}
                {mode === "create" && (
                  <div className="hidden md:flex justify-between w-full">
                    <Dialog.Close asChild>
                      <Button
                        variant="secondary"
                        onClick={() => reset(defaultValues)}
                      >
                        Discard
                      </Button>
                    </Dialog.Close>
                    <div className="flex gap-4">
                      <Button
                        variant="tertiary"
                        type="submit"
                        onClick={() => {
                          setValue("status", "draft");
                          handleSubmit(onSubmit, onError);
                        }}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => {
                          setValue("status", "pending");
                          handleSubmit(onSubmit, onError);
                        }}
                      >
                        Save & Send
                      </Button>
                    </div>
                  </div>
                )}

                {mode === "update" && (
                  <div className="hidden md:flex gap-4 justify-end items-center w-full">
                    <Dialog.Close asChild>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          reset({
                            ...invoice,
                            createdAt: new Date(invoice?.createdAt as Date),
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => {
                        handleSubmit(onSubmit, onError);
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}

                {/* Mobile */}
                <div className="bg-[#fff] dark:bg-03 md:hidden w-screen p-4 fixed left-0 bottom-0 drop-shadow-2xl flex">
                  {mode === "create" && (
                    <div className="flex justify-center max-[375px]:gap-1 gap-2 w-full">
                      <Dialog.Close asChild>
                        <Button
                          variant="secondary"
                          onClick={() => reset(defaultValues)}
                        >
                          Discard
                        </Button>
                      </Dialog.Close>
                      <div className="flex max-[375px]:gap-1 gap-2">
                        <Button
                          variant="tertiary"
                          type="submit"
                          onClick={() => {
                            setValue("status", "draft");
                            handleSubmit(onSubmit, onError);
                          }}
                        >
                          Save as Draft
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={() => {
                            setValue("status", "pending");
                            handleSubmit(onSubmit, onError);
                          }}
                        >
                          Save & Send
                        </Button>
                      </div>
                    </div>
                  )}

                  {mode === "update" && (
                    <div className="flex gap-4 justify-end items-center w-full">
                      <Dialog.Close asChild>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            reset({
                              ...invoice,
                              createdAt: new Date(invoice?.createdAt as Date),
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Button
                        type="submit"
                        variant="primary"
                        onClick={() => {
                          handleSubmit(onSubmit, onError);
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
            "flex justify-between items-center h-[48px] border border-05 dark:border-04 dark:bg-03 rounded-sm p-4 text-[15px] font-bold text-08 dark:text-[#fff] placeholder:text-08/40 w-full hover:cursor-pointer hover:border-01"
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
          className="bg-[#fff] dark:bg-04 rounded-lg shadow-xl min-w-[var(--radix-select-trigger-width)]"
        >
          <Select.Viewport>
            <Select.Group>
              {[1, 7, 14, 30].map((term, index) => {
                return (
                  <React.Fragment key={index}>
                    <Select.Item
                      value={term.toString()}
                      className={clsx(
                        "py-3 px-5 font-bold text-08 dark:text-05 hover:text-01 dark:hover:text-02 hover:cursor-pointer",
                        "data-[state=checked]:text-01 dark:data-[state=checked]:text-02"
                      )}
                    >
                      <Select.ItemText>Net {term} days</Select.ItemText>
                    </Select.Item>
                    {index < 3 && (
                      <Select.Separator className="h-[1px] bg-05 dark:bg-03" />
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

type DatePickerProps = {
  value?: Date;
  onChange: (date?: Date) => void;
};
function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          data-empty={!value}
          className={clsx(
            "flex data-[empty=true]:text-05 items-center text-nowrap justify-between bg-white border  dark:bg-03 hover:border-01 dark:border-04 rounded-sm w-full text-08 dark:text-[#fff] max-h-[46px]",
            !open && "border-05",
            open && "border-01"
          )}
        >
          <span>{value ? format(value, "PPP") : <span>Pick a date</span>}</span>
          <img src={IconCalendar} alt="icon-calendar" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-0 shadow-none z-50"
        side="bottom"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          buttonVariant={"default"}
          className={"shadow-lg rounded-xl font-sans"}
          showOutsideDays
          disabled={{ after: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { InvoiceForm };
