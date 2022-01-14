import { ReactNode } from "react";

export const Tag = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <li
      className={`bg-cod-gray-500 rounded shadow-sm shadow-amaranth-500 hover:shadow-amaranth-400 ${className}`}
    >
      {children}
    </li>
  );
};
