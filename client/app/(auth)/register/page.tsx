'use client';
import { register } from '@/app/(auth)/_action';
import Message from '@/components/message';
import SubmitButton from '@/components/submit-button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ValidationInput from '@/components/validation-input';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const Page = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
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
  } = useAction(register);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          execute(user);
          reset();
        }}
      >
        <div className="mb-5 font-semibold text-neutral-800 text-lg">Register your account!</div>
        <div className="space-y-5">
          {serverError && <Message message={serverError} type={'error'} />}
          <ValidationInput
            name="name"
            id="name"
            title="Enter your name"
            isError={!!validationErrors?.email}
            errorMessage={validationErrors?.name?.[0]}
            onChange={handleChange}
          />
          <ValidationInput
            name="email"
            id="email"
            title="Enter your email address"
            type="email"
            isError={!!validationErrors?.email}
            errorMessage={validationErrors?.email?.[0]}
            onChange={handleChange}
          />
          <ValidationInput
            name="password"
            id="password"
            title="Enter your password"
            type="password"
            isError={!!validationErrors?.password}
            errorMessage={validationErrors?.password?.[0]}
            onChange={handleChange}
          />
          <div className="space-y-2">
            <Label htmlFor={'gender'} className="text-sm capitalize">
              Gender
            </Label>
            <Select
              onValueChange={(value) => {
                setUser((p) => ({
                  ...p,
                  gender: value,
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Custom</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors?.gender && (
              <p className="text-xs text-red-500">{validationErrors?.gender?.[0]}</p>
            )}
          </div>
          <div className="w-full flex justify-end items-center ">
            <Link className="text-blue-500 hover:underline font-semibold text-sm" href={'/login'}>
              Already Registered?
            </Link>
          </div>
          <SubmitButton isLoading={status === 'executing'} name={'Register'} className="w-full" />
        </div>
      </form>
    </div>
  );
};

export default Page;
