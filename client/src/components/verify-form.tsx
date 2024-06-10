"use client";
import { logout } from "@/app/(auth)/_action";
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
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  return (
    <form
      className="w-full space-y-5"
      onSubmit={handleSubmit(async (data) => {
        const { data: d, error } = await safeFetch(
          RegisterReturnSchema,
          "/auth/verify",
          {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ ...data, email }),
          }
        );
        if (error) {
          setError("root", {
            message: "Something went wrong!",
          });
          return;
        }
        reset();
        await session.update({
          user: {
            isVerified: true,
          },
        });
        router.push("/home");
        // await logout({
        //   redirectTo: "/login?message=Verify your account,Enter login again",
        // });
      })}
    >
      <Controller
        name="token"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputOTP
            {...field}
            className="w-full"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup itemType={"number"} className="w-full">
              <InputOTPSlot index={0} className="w-full" />
              <InputOTPSlot index={1} className="w-full" />
              <InputOTPSlot index={2} className="w-full" />
              <InputOTPSlot index={3} className="w-full" />
              <InputOTPSlot index={4} className="w-full" />
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
