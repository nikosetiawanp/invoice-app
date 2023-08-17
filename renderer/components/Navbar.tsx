import Profile from "../components/Profile";
import LogoElectron from "../assets/logo-electron.svg";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-16 bg-cool-grey h-screen flex flex-col items-center sticky left-0 shadow-xl z-50">
      <div className="w-16 h-16 bg-purple flex justify-center items-center">
        <Image src={LogoElectron} width={40} height={40} />
      </div>
      <div className="flex justify-center items-center w-16 h-16 border-t border-white/20 mt-auto">
        <Profile />
      </div>
    </nav>
  );
}
