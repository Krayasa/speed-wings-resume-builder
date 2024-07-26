"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/speed_wings_human_resource.webp";
import { cx } from "lib/cx";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-full w-full items-center justify-between">
        <Link href="/">
          <span className="sr-only">
            Speed Wings Human Resource Resume Builder
          </span>
          <Image
            src={logoSrc}
            alt="Speed Wings Human Resource Resume Builder"
            className="h-20 w-full"
            priority
          />
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {[
            ["/resume-builder", "ATS Resume Builder"],
            ["/resume-parser", "ATS Resume Parser"],
          ].map(([href, text]) => (
            <Link
              key={text}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
              href={href}
            >
              {text}
            </Link>
          ))}
          {/* <div className="ml-1 mt-1">
            <iframe
              src="www.speedwingshr.com"
              width="100"
              height="20"
              className="overflow-hidden border-none"
              title="GitHub"
            />
          </div> */}
        </nav>
      </div>
    </header>
  );
};
