function calculateDueDate(createdAt: Date, paymentTerms: number) {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + paymentTerms);
  return date.toISOString().split("T")[0];
}

export { calculateDueDate };
