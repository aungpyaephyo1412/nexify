import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};

export default Provider;
