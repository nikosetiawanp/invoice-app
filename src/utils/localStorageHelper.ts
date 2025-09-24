import defaultData from "../data.json";

import type { InvoiceSchema } from "../components/schemas/invoiceSchema";

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

export { createInvoice, getInvoices, getInvoiceById };
