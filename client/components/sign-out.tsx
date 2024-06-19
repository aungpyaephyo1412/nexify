'use client';
import { logout } from '@/app/(user)/[slug]/_action';
import { Button } from '@/components/ui/button';

const SignOut = () => {
  return (
    <Button size={'sm'} onClick={async () => await logout()} variant="outline">
      Logout
    </Button>
  );
};

export default SignOut;
