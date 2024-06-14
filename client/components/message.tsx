'use client';
import { cn } from '@/lib/utils';

const Message = ({ message, type }: { message: string; type: 'error' | 'success' }) => {
  return (
    <p
      className={cn(
        'w-full text-sm  border border-gray-500 py-2 text-center px-4',
        type === 'success' ? 'bg-green-300' : 'bg-red-300',
      )}
    >
      {message}
    </p>
  );
};

export default Message;
