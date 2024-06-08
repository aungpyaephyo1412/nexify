import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

interface Props extends InputProps {
  isError?: boolean;
  errorMessage?: string;
}

const ValidationInput = forwardRef<HTMLInputElement, Props>(
  ({ isError, errorMessage, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-1">
        <Label htmlFor={props.id} className="text-sm capitalize">
          {props.title}
        </Label>
        {props.type === "password" ? (
          <div className="relative">
            <Input
              {...props}
              type={open ? "text" : "password"}
              ref={ref}
              className={cn(
                props.className,
                "pr-[10px]",
                isError && "border-red-500"
              )}
            />
            <button
              type="button"
              className="absolute top-[15px] right-[10px]"
              onClick={() => setOpen((prevState) => !prevState)}
            >
              {open ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        ) : (
          <Input
            {...props}
            ref={ref}
            className={cn(props.className, isError && "border-red-500")}
          />
        )}
        {isError && (
          <p className="text-xs text-red-500 py-2">
            {errorMessage || "Error in this field"}
          </p>
        )}
      </div>
    );
  }
);

ValidationInput.displayName = "ValidationInput";

export default ValidationInput;
