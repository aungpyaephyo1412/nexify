"use client";
import { setCookie } from "@/app/(auth)/_action";
import { redirectTo } from "@/app/verify/_action";
import SubmitButton from "@/components/submit-button";
import ValidationInput from "@/components/validation-input";
import safeFetch from "@/lib/safeFetch";
import { forgotPasswordSchema, RegisterReturnSchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  useEffect(() => {
    if (message) {
      const timeOutId = setTimeout(async () => {
        await redirectTo("/forgot-password");
      }, 5000);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [message]);
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const { error } = await safeFetch(
          RegisterReturnSchema,
          "/auth/forgot-password",
          {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (error) {
          setError("root", {
            message: "Something went wrong!",
          });
          return;
        }
        reset();
        await setCookie("forgot-mail", JSON.stringify({ email: data.email }));
        await redirectTo("/forgot-password?message=Check your email");
      })}
      className="space-y-5 p-5"
    >
      {message && (
        <p className="text-sm bg-green-300 border border-gray-500 py-2 text-center px-4">
          {message}
        </p>
      )}
      {errors.root && (
        <p className="text-sm bg-red-300 border border-gray-500 py-2 text-center px-4">
          {errors.root.message}
        </p>
      )}
      <ValidationInput
        id="email"
        title="Email"
        isError={!!errors?.email?.message}
        errorMessage={errors?.email?.message as string}
        {...register("email")}
        placeholder={"Enter email"}
        className="border border-gray-500"
      />
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <div className="w-full flex justify-end items-center ">
        <Link
          className="text-blue-500 hover:underline font-medium text-sm"
          href={"/login"}
        >
          Login
        </Link>
      </div>
      <SubmitButton
        className="w-full"
        name={"Reset Password"}
        isLoading={isSubmitting}
      />
    </form>
  );
};

export default LoginForm;
