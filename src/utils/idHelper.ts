function generateId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";

  let id =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];

  for (let i = 0; i < 4; i++) {
    id += nums[Math.floor(Math.random() * 10)];
  }

  return id;
}

function generateUniqueId() {
  const existing = JSON.parse(localStorage.getItem("items") || "[]");
  const id = generateId();

  if (existing.some((item: any) => item.id === id)) {
    return generateUniqueId();
  }

  return id;
}

export { generateUniqueId };
