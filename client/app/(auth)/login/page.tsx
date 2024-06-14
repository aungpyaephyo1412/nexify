'use client';
import { login } from '@/app/(auth)/_action';
import Message from '@/components/message';
import SubmitButton from '@/components/submit-button';
import ValidationInput from '@/components/validation-input';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const Page = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };
  const {
    execute,
    result: { validationErrors, serverError },
    status,
    reset,
  } = useAction(login);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          execute(user);
          reset();
        }}
      >
        <div className="mb-5 font-semibold text-neutral-800 text-lg">Login to your account!</div>
        <div className="space-y-5">
          {serverError && <Message message={serverError} type={'error'} />}
          {!serverError && message && <Message message={message} type={'success'} />}
          <ValidationInput
            name={'email'}
            id="email"
            title="Enter your email address"
            type="email"
            onChange={handleChange}
            placeholder="yourname@example.com"
            isError={!!validationErrors?.email}
            errorMessage={validationErrors?.email?.[0]}
          />
          <ValidationInput
            name="password"
            id="password"
            title="Enter your password"
            type="password"
            onChange={handleChange}
            isError={!!validationErrors?.password}
            errorMessage={validationErrors?.password?.[0]}
          />
          <div className="w-full flex justify-between items-center ">
            <Link
              className="text-red-500 hover:underline font-semibold text-sm"
              href={'/forgot-password'}
            >
              Forgot Password
            </Link>
            <Link
              className="text-blue-500 hover:underline font-semibold text-sm"
              href={'/register'}
            >
              Create New Account
            </Link>
          </div>
          <SubmitButton isLoading={status === 'executing'} name={'Login'} className="w-full" />
        </div>
      </form>
    </div>
  );
};

export default Page;
