import clsx from "clsx";

function PaymentStatus({ status }: { status: "paid" | "pending" | "draft" }) {
  return (
    <div
      className={clsx(
        "w-[104px] h-[40px] rounded-[6px] flex items-center justify-center gap-4 text-[15px] font-bold",
        status == "paid" && "bg-[#33d69f]/5 text-[#33d69f]",
        status == "pending" && "bg-[#ff8f00]/5 text-[#ff8f00]",
        status == "draft" && "bg-[#373b53]/5 text-[#373b53]"
      )}
    >
      <div
        className={clsx(
          "rounded-full w-[8px] h-[8px]",
          status == "paid" && "bg-[#33d69f]",
          status == "pending" && "bg-[#ff8f00]",
          status == "draft" && "bg-[#373b53]"
        )}
      ></div>
      <span>
        {status == "paid" && "Paid"}
        {status == "pending" && "Pending"}
        {status == "draft" && "Draft"}
      </span>
    </div>
  );
}

export { PaymentStatus };
