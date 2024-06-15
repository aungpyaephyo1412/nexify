'use client';
import { logout } from '@/app/(user)/[slug]/_action';
import { Button } from '@/components/ui/button';

const SignOut = () => {
  return (
    <Button
      onClick={async () => await logout()}
      variant="outline"
      className="w-full cursor-pointer"
    >
      Logout
    </Button>
  );
};

export default SignOut;
