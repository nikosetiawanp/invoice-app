import clsx from "clsx";

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
  name: string;
  type: InputType;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

function Input({ id, type, label, value, onChange, placeholder }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-[13px] text-06">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
        className={clsx(
          "h-[48px] border border-05 rounded-sm p-4 text-[15px] font-bold text-08 placeholder:text-08/40 w-full"
        )}
      />
    </div>
  );
}

export { Input };
