import defaultData from "../data.json";

import type { InvoiceSchema } from "../components/schemas/invoiceSchema";
import { useNavigate } from "react-router-dom";

function createInvoice(data: InvoiceSchema) {
  const existing = JSON.parse(localStorage.getItem("invoices") || "[]");
  existing.push(data);
  localStorage.setItem("invoices", JSON.stringify(existing));
}

function getInvoices() {
  let storedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  if (storedInvoices.length === 0) {
    localStorage.setItem("invoices", JSON.stringify(defaultData));
    storedInvoices = defaultData;
  }

  return storedInvoices;
}

function getInvoiceById(id: string) {
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
  const invoice = invoices.find((invoice: { id: string }) => invoice.id === id);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  return invoice;
}

function deleteInvoice(id: string) {
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
  const updated = invoices.filter(
    (invoice: { id: string }) => invoice.id !== id
  );

  localStorage.setItem("invoices", JSON.stringify(updated));

  window.location.href = "/invoices";
}

function updateInvoice() {}

export { createInvoice, getInvoices, getInvoiceById, deleteInvoice };
