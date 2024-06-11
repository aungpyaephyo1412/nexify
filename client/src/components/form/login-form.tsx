"use client";
import { login } from "@/app/(auth)/_action";
import SubmitButton from "@/components/submit-button";
import ValidationInput from "@/components/validation-input";
import { userLoginSchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await login({ email: data.email, password: data.password });
        } catch (err) {
          setError("root", { message: "Email or password does not work!" });
        }
      })}
      className="space-y-5 p-5"
    >
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
        placeholder={"Enter email "}
        className="border border-gray-500"
      />
      <ValidationInput
        id="password"
        title="Password"
        isError={!!errors?.password?.message}
        errorMessage={errors?.password?.message as string}
        type={"password"}
        {...register("password")}
        placeholder={"Enter password"}
        className="border border-gray-500"
      />
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <div className="w-full flex justify-between items-center ">
        <Link
          className="text-red-500
         hover:underline font-medium text-sm"
          href={"/forgot-password"}
        >
          Forgot Password
        </Link>
        <Link
          className="text-blue-500 hover:underline font-medium text-sm"
          href={"/register"}
        >
          Create New Account
        </Link>
      </div>
      <SubmitButton
        className="w-full"
        name={"Login"}
        isLoading={isSubmitting}
      />
    </form>
  );
};

export default LoginForm;
