'use client';
import Message from '@/components/message';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Error = () => {
  return (
    <div className="h-[200px] flex justify-center items-center gap-5 flex-col">
      <Message message={'Something went wrong!,your token is expired!'} type={'error'} />
      <Button asChild variant={'link'}>
        <Link href={'/forgot-password'}>Get your new token</Link>
      </Button>
    </div>
  );
};

export default Error;
