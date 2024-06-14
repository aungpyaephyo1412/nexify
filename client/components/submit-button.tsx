import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const SubmitButton = ({
  form,
  isLoading,
  name,
  className,
}: {
  form?: string;
  isLoading: boolean;
  name: string | null;
  className?: string;
}) => {
  return (
    <Button form={form} type="submit" disabled={isLoading} className={className}>
      {isLoading ? <Loader2 size={18} className="text-blue-500 animate-spin" /> : name || 'Submit'}
    </Button>
  );
};

export default SubmitButton;
