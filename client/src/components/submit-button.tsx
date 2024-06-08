import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({
  isLoading,
  name,
  className,
}: {
  isLoading: boolean;
  name: string | null;
  className?: string;
}) => {
  return (
    <Button type="submit" disabled={isLoading} className={className}>
      {isLoading ? (
        <Loader2 size={18} className="text-blue-500 animate-spin" />
      ) : (
        name || "Submit"
      )}
    </Button>
  );
};

export default SubmitButton;
