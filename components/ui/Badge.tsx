import { ReactNode } from "react";
import clsx from "clsx";

export default function Badge({
  children,
  color = "gray",
}: {
  children: ReactNode;
  color?: "gray" | "indigo" | "red" | "green";
}) {
  const variants = {
    gray: "bg-gray-100 text-gray-700 ring-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",
    indigo:
      "bg-indigo-500/10 text-indigo-500 ring-indigo-500/20",
    red: "bg-red-500/10 text-red-500 ring-red-500/20",
    green:
      "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
  };

  return (
    <span
      className={clsx(
        "rounded-md px-2 py-0.5 text-[10px] font-medium leading-none ring-1 ring-inset",
        variants[color]
      )}
    >
      {children}
    </span>
  );
}
