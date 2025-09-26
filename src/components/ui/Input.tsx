import clsx from "clsx";
import type { FieldError } from "react-hook-form";

type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "search"
  | "tel"
  | "url"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "datetime-local"
  | "file"
  | "hidden"
  | "range"
  | "color"
  | "submit"
  | "reset"
  | "button";

type InputProps = {
  id: string;
  type: InputType;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  defaultValue?: any;
  hideErrorMessage?: boolean;
};

function Input({
  id,
  type,
  label,
  placeholder,
  error,
  hideErrorMessage,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center w-full">
        <label
          htmlFor={id}
          className={clsx(
            "text-[13px]",
            !error && "text-07 dark:text-06",
            error && "text-09"
          )}
        >
          {label}
        </label>
        <span className="text-[10px] text-09 font-semibold">
          {error && !hideErrorMessage && error.message}
        </span>
      </div>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...rest}
        className={clsx(
          "h-[48px] border rounded-sm p-4 text-[15px] font-bold dark:bg-03 text-08 dark:text-[#fff] placeholder:text-08/40 dark:placeholder:text-[#fff]/40 w-full focus:outline-0  focus:border-01",
          !error && "border-05 dark:border-04",
          error && "border-09"
        )}
      />
    </div>
  );
}

export { Input };
