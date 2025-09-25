import clsx from "clsx";

type Variant = "primary" | "secondary" | "tertiary" | "destructive";

type ButtonProps = {
  variant?: Variant;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

function Button({
  variant,
  children,
  onClick,
  className,
  fullWidth,
  type,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "text-[15px] font-bold py-3 px-5 rounded-full hover:cursor-pointer",
        variant === "primary" && "bg-01 hover:bg-02 text-[#fff]",
        variant === "secondary" && "bg-11 hover:bg-05 text-07",
        variant === "tertiary" && "bg-[#373b53] text-05 hover:bg-03",
        variant === "destructive" && "bg-09 text-[#fff]",
        fullWidth && "w-full",
        disabled && "bg-06 hover:bg-06 hover:cursor-normal",
        className
      )}
      onClick={onClick}
      type={type ?? "button"}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { Button };
