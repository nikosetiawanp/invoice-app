import clsx from "clsx";

type Variant = "primary" | "secondary" | "destructive";

type ButtonProps = {
  variant?: Variant;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  fullWidth?: boolean;
};

function Button({
  variant,
  children,
  onClick,
  className,
  fullWidth,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "text-[15px] font-bold py-3 px-5 rounded-full hover:cursor-pointer",
        variant === "primary" && "bg-01 hover:bg-02 text-[#fff]",
        variant === "secondary" && "bg-11 hover:bg-05 text-07",
        variant === "destructive" && "bg-09 text-[#fff]",
        fullWidth && "w-full",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
