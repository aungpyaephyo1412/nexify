"use client";
import { login } from "@/app/(auth)/_action";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import ValidationInput from "@/components/validation-input";
import { userAuthSchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userAuthSchema),
  });
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await login({ identifier: data.email, password: data.password });
        } catch (err) {
          setError("root", { message: "Email or password does not work!" });
        }
      })}
      className="space-y-5 p-5"
    >
      <ValidationInput
        isError={!!errors?.email?.message}
        errorMessage={errors?.email?.message as string}
        type={"email"}
        {...register("email")}
        placeholder={"Enter email or username"}
        className="h-12"
      />
      <ValidationInput
        isError={!!errors?.password?.message}
        errorMessage={errors?.password?.message as string}
        type={"password"}
        {...register("password")}
        placeholder={"Enter password"}
        className="h-12"
      />
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <SubmitButton
        className="w-full"
        name={"Login"}
        isLoading={isSubmitting}
      />
      <hr />
      <div className="grid grid-cols-2 gap-5">
        <Button asChild variant="outline">
          <Link href={"/forgot-password"}>Forgot Password</Link>
        </Button>
        <Button variant={"secondary"} className="w-full" asChild>
          <Link href={"/register"}>Create New Account</Link>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
