import Image from "next/image";
import IconChevronDown from "../assets/icon-chevron-down.svg";
import Link from "next/link";

export default function Invoice() {
  return (
    <Link href="/detail">
      <div className="flex items-center justify-between gap-12 px-8 w-auto bg-cool-grey rounded-lg h-20 hover:cursor-pointer border border-white/0 hover:border-white/20">
        <span className="font-semibold flex">
          <p className="text-white/70">#</p>XM9141
        </span>
        <span className="text-white/70">Due 15 Aug 2023</span>
        <span className="text-white/70">Thomas Wayne</span>
        <span className="text-white text-lg font-bold ml-auto">
          Rp 2.000.000
        </span>
        {/* <div className="bg-green/10 w-24 rounded-lg py-3 px-4 flex justify-center items-center gap-2">
        <div className="rounded-full w-2 h-2 bg-green"></div>
        <span className="text-green text-sm font-semibold">Paid</span>
      </div> */}
        <div className="bg-orange/10 w-24 rounded-lg py-3 flex justify-center items-center gap-2">
          <div className="rounded-full w-2 h-2 bg-orange"></div>
          <span className="text-orange text-sm font-semibold">Pending</span>
        </div>
        {/* <div className="bg-white/10 w-24 rounded-lg py-3 flex justify-center items-center gap-2">
        <div className="rounded-full w-2 h-2 bg-white"></div>
        <span className="text-white text-sm font-semibold">Draft</span>
      </div> */}

        <Image
          className="-rotate-90"
          src={IconChevronDown}
          height={15}
          width={15}
        />
      </div>
    </Link>
  );
}
