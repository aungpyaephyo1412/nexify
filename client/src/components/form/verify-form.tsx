"use client";
import { logout } from "@/app/(auth)/_action";
import { redirectTo } from "@/app/verify/_action";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import safeFetch from "@/lib/safeFetch";
import { RegisterReturnSchema, userVerifySchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";

const VerifyForm = ({ email }: { email: string }) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userVerifySchema),
  });
  const session = useSession({ required: true });
  return (
    <form
      className="w-full space-y-5"
      onSubmit={handleSubmit(async (data) => {
        const { error, data: d } = await safeFetch(
          RegisterReturnSchema,
          "/auth/verify",
          {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ token: data.token.toString(), email }),
          }
        );
        if (d && error == null) {
          reset();
          await session.update({
            user: {
              isVerified: true,
            },
          });
          await redirectTo("/home");
        }
        setError("root", {
          message: "Something went wrong!",
        });
      })}
    >
      {errors.root && (
        <p className="text-sm bg-red-300 border border-gray-500 py-2 text-center px-4">
          {errors.root.message}
        </p>
      )}
      <Controller
        name="token"
        control={control}
        render={({ field }) => (
          <InputOTP
            {...field}
            className="w-full"
            maxLength={9}
            minLength={9}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup itemType={"number"} className="w-full">
              <InputOTPSlot index={0} className="w-full border-gray-500" />
              <InputOTPSlot index={1} className="w-full border-gray-500" />
              <InputOTPSlot index={2} className="w-full border-gray-500" />
              <InputOTPSlot index={3} className="w-full border-gray-500" />
              <InputOTPSlot index={4} className="w-full border-gray-500" />
              <InputOTPSlot index={5} className="w-full border-gray-500" />
              <InputOTPSlot index={6} className="w-full border-gray-500" />
              <InputOTPSlot index={7} className="w-full border-gray-500" />
              <InputOTPSlot index={8} className="w-full border-gray-500" />
            </InputOTPGroup>
          </InputOTP>
        )}
      />
      {errors.token?.message && (
        <p className="text-sm text-red-500">{errors.token.message as string}</p>
      )}
      <div className="w-full flex items-center justify-end gap-5">
        <Button
          type={"button"}
          onClick={async () => await logout()}
          variant={"outline"}
        >
          Logout
        </Button>
        <SubmitButton isLoading={isSubmitting} name={"Verify your account"} />
      </div>
    </form>
  );
};

export default VerifyForm;
