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
            !error && "text-07",
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
          "h-[48px] border rounded-sm p-4 text-[15px] font-bold text-08 placeholder:text-08/40 w-full",
          !error && "border-05",
          error && "border-09"
        )}
      />
    </div>
  );
}

export { Input };
