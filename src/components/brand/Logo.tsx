import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  priority?: boolean;
}

export function Logo({
  className,
  iconOnly = false,
  size = "md",
  href = "/",
  priority = false,
}: LogoProps) {
  const sizeClasses = {
    sm: "h-8 sm:h-9",
    md: "h-11 sm:h-12.5",
    lg: "h-14 sm:h-16",
    xl: "h-20 sm:h-24",
  };

  const Content = (
    <div
      className={cn(
        "inline-flex items-center select-none group cursor-pointer",
        className
      )}
    >
      <Image
        src="/images/campuslink_logo_v3.png"
        alt="CampusLink Placement Cell Portal"
        width={1052}
        height={306}
        priority={priority || size === "md"}
        className={cn(
          sizeClasses[size],
          "w-auto max-h-[52px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
        )}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-hidden inline-flex items-center">
        {Content}
      </Link>
    );
  }

  return Content;
}
