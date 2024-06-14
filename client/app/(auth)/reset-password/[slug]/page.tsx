'use client';
import { resetPassword } from '@/app/(auth)/_action';
import Message from '@/components/message';
import SubmitButton from '@/components/submit-button';
import ValidationInput from '@/components/validation-input';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const Page = () => {
  const { slug } = useParams();
  const [user, setUser] = useState({
    confirmPassword: '',
    password: '',
    code: slug.toString(),
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
  } = useAction(resetPassword);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          execute(user);
        }}
      >
        <div className="mb-5 font-semibold text-neutral-800 text-lg">Create new password</div>
        <div className="space-y-5">
          {serverError && <Message message={serverError} type={'error'} />}
          <ValidationInput
            name={'password'}
            id="password"
            title="Enter your new password"
            type="password"
            onChange={handleChange}
            isError={!!validationErrors?.password}
            errorMessage={validationErrors?.password?.[0]}
          />
          <ValidationInput
            name="confirmPassword"
            id="confirmPassword"
            title="Enter your new password again"
            type="password"
            onChange={handleChange}
            isError={!!validationErrors?.confirmPassword}
            errorMessage={validationErrors?.confirmPassword?.[0]}
          />
          <div className="w-full flex justify-end items-center ">
            <Link className="text-blue-500 hover:underline font-semibold text-sm" href={'/login'}>
              Login
            </Link>
          </div>
          <SubmitButton isLoading={status === 'executing'} name={'Login'} className="w-full" />
        </div>
      </form>
    </div>
  );
};

export default Page;
