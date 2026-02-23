import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 left-0 h-screen w-full bg-black/80 z-50 shadow-xl text-white/80
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div
        ref={sidebarRef} 
      className="min-w-72 max-w-96 bg-black h-screen p-7 flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="hover:text-white"/>
          <button
            onClick={onClose}
            className="hover:text-blue-950 hoverEffect"
            aria-label="Close menu"
            title="Close menu">
            <X />
          </button>        </div>

        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData.map((item) => (
            <Link href={item?.href} key={item?.title} 
            className={`hover:text-violet-400 hoverEffect
              ${pathname === item?.href && "text-blue-400"}
            `}>
            {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div> 
  );
};

export default SideMenu;
