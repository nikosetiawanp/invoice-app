import { DropdownMenu } from "radix-ui";
import IconArrowDown from "../assets/icon-arrow-down.svg";
import IconArrowRight from "../assets/icon-arrow-right.svg";
import IconCheck from "../assets/icon-check.svg";
import IllustrationEmpty from "../assets/illustration-empty.svg";
import clsx from "clsx";

import { useState } from "react";
import { Link } from "react-router-dom";
import { PaymentStatus } from "../components/PaymentStatus";
import { InvoiceForm } from "../components/InvoiceForm";
import { InvoiceSchema } from "../components/schemas/invoiceSchema";
import { getInvoices } from "../utils/localStorageHelper";
import { format } from "date-fns";
import { calculateDueDate } from "../utils/dateHelper";
import { useQuery } from "@tanstack/react-query";

function InvoicesPage() {
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const query = useQuery({ queryKey: ["invoices"], queryFn: getInvoices });
  const filteredInvoices =
    appliedFilters.length === 0
      ? query?.data
      : query?.data?.filter((invoice: InvoiceSchema) =>
          appliedFilters.includes(invoice.status)
        );

  return (
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
            There are {query.data?.length} total invoices
          </span>
        </div>
        {/* Right */}
        <div className="flex items-center gap-[40px]">
          <Filter
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
          />

          {/* Dialog */}
          <InvoiceForm mode="create" />
        </div>
      </header>

      {/* Invoices */}
      <div className="flex flex-col w-full gap-4">
        {filteredInvoices?.map((invoice: InvoiceSchema, index: number) => {
          const arrayOfTotals = invoice.items?.map(
            (item) => item.price * item.quantity
          );
          const total = arrayOfTotals.reduce((a, b) => a + b, 0);
          return (
            <Link key={index} to={"/invoices/" + invoice.id}>
              {/* Tablet & Desktop */}
              <div className="hidden md:flex items-center gap-8 rounded-lg p-4 w-full bg-[#fff] shadow-[0_10px_10px_10px_#48549F0D] border border-[#fff]  hover:border-01  hover:cursor-pointer">
                <span className="text-[15px] font-bold text-08 w-[80px]">
                  <b className="text-07">#</b>
                  {invoice.id}
                </span>
                <span className="text-[13px] text-06 font-medium">
                  Due{" "}
                  {invoice?.createdAt &&
                    format(
                      calculateDueDate(invoice.createdAt, invoice.paymentTerms),
                      "dd MMM yyyy"
                    )}
                </span>
                <span className="text-[13px] text-06 font-medium">
                  {invoice.clientName}
                </span>
                <span className="text-[15px] font-bold text-08 ml-auto">
                  £ {total}
                </span>
                <PaymentStatus
                  status={invoice.status as "paid" | "pending" | "draft"}
                />
                <img src={IconArrowRight} alt="" />
              </div>

              {/* Mobile */}
              <div className="md:hidden flex justify-between items-center gap-8 rounded-lg p-4 w-full bg-[#fff] shadow-[0_10px_10px_10px_#48549F0D] border border-[#fff]  hover:border-01  hover:cursor-pointer">
                {/* Left */}
                <div className="flex flex-col gap-2">
                  <span className="text-[15px] font-bold text-08">
                    <b className="text-07">#</b>
                    {invoice.id}
                  </span>
                  <span className="text-[13px] text-06 font-medium">
                    {invoice?.createdAt &&
                      format(
                        calculateDueDate(
                          invoice.createdAt,
                          invoice.paymentTerms
                        ),
                        "dd MMM yyyy"
                      )}
                  </span>
                  <span className="text-[15px] font-bold text-08">
                    £{" "}
                    {invoice?.items
                      .map((item) => item.quantity * item.price)
                      .reduce((a, b) => a + b, 0)}
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
            </Link>
          );
        })}
      </div>

      {/* No Item */}
      {filteredInvoices?.length <= 0 && (
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
            Create an invoice by clicking the <b>New Invoice</b> button and get
            started
          </span>
        </div>
      )}
    </section>
  );
}

type FilterProps = {
  appliedFilters: string[];
  setAppliedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

function Filter({ appliedFilters, setAppliedFilters }: FilterProps) {
  const filters = ["draft", "pending", "paid"];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu.Root onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenu.Trigger>
        <div className="text-08 text-heading-s flex items-center gap-4 hover:cursor-pointer">
          <span className="hidden lg:block">Filter by status</span>
          <span className="lg:hidden">Filter</span>
          <img
            src={IconArrowDown}
            alt="icon-arrow-down"
            className={clsx(isOpen && "rotate-180")}
          />
        </div>
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
                onSelect={(e) => {
                  e.preventDefault();
                  applyFilter();
                }}
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
                <span className="text-[15px] font-bold mt-1">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </span>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export { InvoicesPage };
