'use client';
import { forgotPassword } from '@/app/(auth)/_action';
import Message from '@/components/message';
import SubmitButton from '@/components/submit-button';
import ValidationInput from '@/components/validation-input';
import { useAction } from 'next-safe-action/hooks';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const [user, setUser] = useState({
    email: '',
  });
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const {
    execute,
    result: { validationErrors, serverError },
    status,
  } = useAction(forgotPassword);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          execute(user);
        }}
      >
        <div className="mb-5 font-semibold text-neutral-800 text-lg">Forgot password</div>
        <div className="space-y-5">
          {serverError && <Message message={serverError} type={'error'} />}
          {!serverError && message && <Message message={message} type={'success'} />}
          <ValidationInput
            onChange={(e) => setUser((p) => ({ ...p, email: e.target.value }))}
            name={'email'}
            id="email"
            title="Enter your email address"
            type="email"
            placeholder="yourname@example.com"
            isError={!!validationErrors?.email}
            errorMessage={validationErrors?.email?.[0]}
          />
          <div className="w-full flex items-center justify-end">
            <SubmitButton
              isLoading={status === 'executing'}
              name={'Reset Password'}
              className="min-w-[134px]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
