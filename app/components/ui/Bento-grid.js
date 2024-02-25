import { cn } from "@/utils/cn";
import Link from "next/link";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, href, header }) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "h-full cursor-pointer row-span-1 rounded-xl  group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4  bg-white border border-transparent justify-between flex flex-col space-y-4",
          className
        )}
      >
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-mono font-bold text-neutral-600  mb-2 mt-2">
            {title}
          </div>
        </div>
      </div>
    </Link>
  );
};
