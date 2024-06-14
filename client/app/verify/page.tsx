'use client';
import { verify } from '@/app/(auth)/_action';
import Message from '@/components/message';
import SubmitButton from '@/components/submit-button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useSession } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useState } from 'react';

const Page = () => {
  const session = useSession({ required: true });
  const [user, setUser] = useState({
    email: session?.data?.user?.email,
    token: '',
  });
  const {
    execute,
    result: { validationErrors, serverError },
    status,
  } = useAction(verify);
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          execute(user);
        }}
      >
        <div className="mb-5 font-semibold text-neutral-800 text-lg">Verify your account</div>
        <p className="mb-7 text-sm">Check your email we sent your email verification code.....</p>
        <div className="space-y-5">
          {serverError && <Message message={serverError} type={'error'} />}
          <InputOTP
            onChange={(newValue) => {
              setUser((prevState) => ({
                ...prevState,
                token: newValue,
              }));
            }}
            className="w-full"
            maxLength={4}
            minLength={4}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup itemType={'number'} className="w-full">
              <InputOTPSlot index={0} className="w-full border-gray-500" />
              <InputOTPSlot index={1} className="w-full border-gray-500" />
              <InputOTPSlot index={2} className="w-full border-gray-500" />
              <InputOTPSlot index={3} className="w-full border-gray-500" />
            </InputOTPGroup>
          </InputOTP>
          {validationErrors?.token && (
            <p className="text-xs text-red-500">{validationErrors?.token?.[0]}</p>
          )}
          <div className="w-full flex justify-end items-center ">
            {/*<button type={"button"} className="text-red-500 hover:underline font-semibold text-sm">*/}
            {/*  Resend OTP code*/}
            {/*</button>*/}
            <Link className="text-blue-500 hover:underline font-semibold text-sm" href={'/login'}>
              Login
            </Link>
          </div>
          <SubmitButton
            isLoading={status === 'executing'}
            name={'Verify account'}
            className="w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
