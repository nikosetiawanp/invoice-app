import { Link, useParams } from "react-router-dom";
import IconArrowLeft from "../assets/icon-arrow-left.svg";
import { PaymentStatus } from "../components/PaymentStatus";
import { Button } from "../components/ui/Button";
import React from "react";
import {
  deleteInvoice,
  getInvoiceById,
  updateInvoice,
} from "../utils/localStorageHelper";
import type { InvoiceSchema } from "../components/schemas/invoiceSchema";
import { format } from "date-fns";
import { calculateDueDate } from "../utils/dateHelper";
import { Dialog } from "radix-ui";
import { InvoiceForm } from "../components/InvoiceForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function InvoiceDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: invoice } = useQuery<InvoiceSchema>({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id!),
    enabled: !!id,
  });

  const updateStatus = (updatedStatus: "pending" | "paid") => {
    invoice && updateInvoice({ ...invoice, status: updatedStatus });
    queryClient.invalidateQueries({
      queryKey: ["invoice", invoice?.id],
    });
  };

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
          {invoice?.status && <PaymentStatus status={invoice?.status} />}
        </div>
        <div className="ml-auto gap-2 hidden md:flex">
          <InvoiceForm mode="update" invoice={invoice} />
          {/* <Button variant="secondary">Edit</Button> */}
          <DeleteInvoice id={id || ""} />

          {invoice?.status === "draft" && (
            <Button variant="primary" onClick={() => updateStatus("pending")}>
              Mark as Pending
            </Button>
          )}
          {invoice?.status === "pending" && (
            <Button variant="primary" onClick={() => updateStatus("paid")}>
              Mark as Paid
            </Button>
          )}
        </div>
      </header>

      {/* The Invoice */}
      <div className="w-full flex bg-[#fff] flex-col font-medium gap-6 p-8 rounded-lg bg-white shadow-[0_4px_10px_2px_#48549F0D]">
        {/* Invoice Header */}
        <div className="flex flex-col gap-8 md:flex-row justify-between items-start">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <span className="text-08 text-[15px] font-bold">
              <b className="text-06">#</b>
              {invoice?.id}
            </span>
            <span className="text-[13px] text-07">{invoice?.description}</span>
          </div>
          {/* Right */}
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[13px] text-07">
              {invoice?.senderAddress?.street}
            </span>
            <span className="text-[13px] text-07">
              {invoice?.senderAddress?.city}
            </span>
            <span className="text-[13px] text-07">
              {invoice?.senderAddress?.postCode}
            </span>
            <span className="text-[13px] text-07">
              {invoice?.senderAddress?.country}
            </span>
          </div>
        </div>

        {/* Invoice Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Invoice Date */}
          <div className="flex flex-col gap-1 col-start-1 row-start-1">
            <span className="text-[13px] text-07">Invoice Date</span>
            <span className="text-[15px] font-bold text-08">
              {invoice?.createdAt && format(invoice?.createdAt, "dd MMM yyyy")}
            </span>
          </div>
          {/* Payment Due */}
          <div className="flex flex-col gap-1 col-start-1 row-start-2">
            <span className="text-[13px] text-07">Payment Due</span>
            <span className="text-[15px] font-bold text-08">
              {invoice?.createdAt &&
                format(
                  calculateDueDate(invoice?.createdAt, invoice?.paymentTerms),
                  "dd MMM yyyy"
                )}
            </span>
          </div>
          <div className="flex flex-col gap-1 col-start-2 row-span-2">
            <span className="text-[13px] text-07">Bill To</span>
            <span className="text-[15px] text-08 font-bold">
              {invoice?.clientName}
            </span>
            <div className="flex flex-col gap-0">
              <span className="text-[13px] text-07">
                {invoice?.clientAddress?.street}
              </span>
              <span className="text-[13px] text-07">
                {invoice?.clientAddress?.city}
              </span>
              <span className="text-[13px] text-07">
                {invoice?.clientAddress?.postCode}
              </span>
              <span className="text-[13px] text-07">
                {invoice?.clientAddress?.country}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-2 row-start-3 md:col-start-3 md:col-span-1 md:row-start-1">
            <span className="text-[13px] text-07">Sent to</span>
            <span className="text-[15px] text-08 font-bold">
              {invoice?.clientEmail}
            </span>
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col rounded-lg bg-11">
          {/* Items Mobile */}
          <div className="flex flex-col p-4 gap-4 md:hidden">
            {invoice?.items?.map((item, index) => {
              return (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[15px] text-08 font-bold">
                      {item.name}
                    </span>
                    <span className="text-[15px] text-07 font-bold">
                      £ {item.quantity} x {item.price}
                    </span>
                  </div>
                  <span className="text-[15px] text-08 font-bold">
                    £ {item.quantity * item.price}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Items Tablet & Desktop */}
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

            {/* Items Tablet & Desktop */}
            {invoice?.items?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span className="text-[15px] font-bold text-08">
                    {item.name}
                  </span>
                  <span className="text-[15px] text-07 font-bold text-center">
                    {item.quantity}
                  </span>
                  <span className="text-[15px] text-07 font-bold text-right">
                    £ {item.price}
                  </span>
                  <span className="text-[15px] text-08 font-bold text-right">
                    £ {item.quantity * item.price}
                  </span>
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex justify-between items-center p-4 bg-04 rounded-b-lg">
            <span className="text-[13px] text-[#fff]">Grand Total</span>
            <span className="text-[24px] text-[#fff] font-bold">
              £{" "}
              {invoice?.items
                .map((item) => item.quantity * item.price)
                .reduce((a, b) => a + b, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#fff] md:hidden w-full p-4 fixed bottom-0 left-0 shadow-2xl">
        <div className="fw-full gap-2 flex justify-center md:hidden">
          <InvoiceForm mode="update" invoice={invoice} />
          <DeleteInvoice id={id || ""} />
          {invoice?.status === "draft" && (
            <Button variant="primary" onClick={() => updateStatus("pending")}>
              Mark as Pending
            </Button>
          )}
          {invoice?.status === "pending" && (
            <Button variant="primary" onClick={() => updateStatus("paid")}>
              Mark as Paid
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function DeleteInvoice({ id }: { id: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="destructive">Delete</Button>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed flex p-8 justify-center items-center left-0 top-0 z-50 w-screen h-screen bg-[#000]/50">
        <Dialog.Content className="flex flex-col justify-start bg-[#fff] rounded-lg p-8 max-w-[480px] md:p-12">
          <Dialog.Title className="text-[24px] text-08 font-bold text-left">
            Confirm Deletion
          </Dialog.Title>
          <Dialog.Description className="text-[13px] text-06 text-left">
            Are you sure you want to delete invoice #{id}? This action cannot be
            undone.
          </Dialog.Description>
          <div className="flex justify-end items-center w-full mt-4 gap-3">
            <Dialog.Close asChild>
              <Button variant="secondary">Cancel</Button>
            </Dialog.Close>
            <Button variant="destructive" onClick={() => deleteInvoice(id)}>
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}

export { InvoiceDetailPage };
