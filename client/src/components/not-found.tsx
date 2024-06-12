import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const NotFound = ({
  text,
  className,
  children,
}: {
  text?: string;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "size-full flex justify-center items-center py-9 font-semibold",
        className
      )}
    >
      {text || "404 | Not Found"}
      {children}
    </div>
  );
};

export default NotFound;
