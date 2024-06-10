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
                "pr-[50px]",
                isError && "border-red-500"
              )}
            />
            <div className="absolute inset-y-0 py-1 right-1">
              <button
                type="button"
                className="size-full hover:bg-black/10 px-4 py-2 rounded"
                onClick={() => setOpen((prevState) => !prevState)}
              >
                {open ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
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
