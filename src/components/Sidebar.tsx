import Logo from "../assets/logo.svg";
import ImageAvatar from "../assets/image-avatar.jpg";
import { Divider } from "./ui/Divider";
import { useEffect, useState } from "react";

function Sidebar() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <aside className="fixed left-0 top-0 z-50 flex lg:flex-col h-[72px] md:h-[80px] lg:h-full w-full lg:w-[100px] lg:rounded-r-[20px] bg-[#373B53]">
      {/* Logo */}
      <div className="relative bg-01 rounded-r-[20px] h-[72px] md:h-[80px] lg:h-[100px] w-[72px] md:w-[80px] lg:w-[100px] flex flex-col justify-between">
        <div></div>
        <div className="bg-02 rounded-tl-[20px] rounded-br-[20px] bottom-0  h-1/2"></div>
        <img
          src={Logo}
          alt="logo"
          className="w-[28px] md:w-[32px] lg:w-[40px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="flex items-center px-6 lg:px-0 lg:w-full lg:py-8 gap-6 lg:gap-8 lg:flex-col lg:items-center ml-auto lg:mt-auto">
        <span className="text-[#fff] dark:text-[#000]">{theme}</span>
        {/* Toggle theme */}
        <button
          className="hover:cursor-pointer w-[20px] h-[20px] group"
          onClick={() => toggleTheme()}
        >
          {/* Moon icon */}
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-07 group-hover:fill-05 dark:hidden"
          >
            <path
              d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.581.46A7.516 7.516 0 018.74 11.06a7.516 7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559 1.226-2.197a.652.652 0 00-.102-.92.703.703 0 00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000 9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156 2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 0 003.579-5.597.62.62 0 00-.46-.793z"
              fill=""
              fill-rule="nonzero"
            />
          </svg>
          {/* Sun icon */}
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-07 group-hover:fill-05 hidden dark:block"
          >
            <path
              d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08 1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09 1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0 11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817 4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924 4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96 0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0 01.112 1.912l-.112.007H.96a.96.96 0 01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010 1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0 011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05 5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0 .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z"
              fill=""
              fill-rule="nonzero"
            />
          </svg>
        </button>
        {/* Divider */}
        <Divider orientation="vertical" className="lg:hidden" />
        <Divider orientation="horizontal" className="hidden lg:block" />

        {/* Avatar */}
        <div className="w-[32px] h-[32px] rounded-full overflow-auto">
          <img className="w-full" src={ImageAvatar} alt="icon-moon" />
        </div>
      </div>
    </aside>
  );
}

export { Sidebar };
