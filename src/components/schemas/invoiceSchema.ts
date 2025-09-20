import * as z from "zod/v4";

export const InvoiceSchema = z.object({
  id: z.string().min(1, "can't be empty"),
  createdAt: z.string(),
  paymentDue: z.string(),
  description: z.string().min(1, "can't be empty"),
  paymentTerms: z.enum(["1", "7", "14", "30"]),
  clientName: z.string().min(1, "can't be empty"),
  clientEmail: z.email(),
  status: z.enum(["paid", "pending", "draft"]),
  senderAddress: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    postCode: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
  }),
  clientAddress: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    postCode: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
    items: z.array(
      z.object({
        name: z.string().min(1, "can't be empty"),
        quantity: z.number().min(0),
        price: z.number().min(0),
      })
    ),
  }),
});

export type InvoiceSchema = z.infer<typeof InvoiceSchema>;
