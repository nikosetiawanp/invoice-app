import clsx from "clsx";

type DividerProps = {
  orientation: "vertical" | "horizontal";
  className?: string;
};

function Divider({ orientation, className }: DividerProps) {
  return (
    <div
      className={clsx(
        "bg-[#494E6E]",
        orientation === "vertical" && "w-[1px] h-full",
        orientation === "horizontal" && "h-[1px] w-full",
        className
      )}
    ></div>
  );
}

export { Divider };
