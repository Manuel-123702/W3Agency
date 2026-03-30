import { Facebook, Github, Instagram, Youtube } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
interface props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}
const socialLink = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/@reactjsBD",
    Icon: <Youtube className="text-red-500 w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://www.youtube.com/@reactjsBD",
    Icon: <Github className="w-5 h-5" />,
  },
  {
    title: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=237650921917&text=Hello,%20I%20visited%20your%20website%20and%20I%E2%80%99d%20like%20more%20information.",
    Icon: <FaWhatsapp className="text-green-500 w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.youtube.com/@reactjsBD",
    Icon: <Facebook className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Instagram",
    href: "https://www.youtube.com/@reactjsBD",
    Icon: <Instagram className="w-5 h-5 text-pink-500" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                key={item?.title}
                target="_blank"
                rel="noopener noreferrer"
                href={item?.href}
                className={cn(
                  "p-2 border rounded-full  hover:text-violet-600 hover:border-white hoverEffect",
                  iconClassName,
                )}
              >
                {item?.Icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "text-blue-400 bg-white font-semibold border border-white",
                tooltipClassName,
              )}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
