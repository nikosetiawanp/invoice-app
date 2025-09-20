import Logo from "../assets/logo.svg";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex md:flex-col h-[72px] md:h-[80px] lg:h-full w-full lg:w-[100px] lg:rounded-r-[20px] bg-[#373B53]">
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
    </aside>
  );
}

export { Sidebar };
