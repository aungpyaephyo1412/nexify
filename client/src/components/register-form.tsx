"use client";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import ValidationInput from "@/components/validation-input";
import { userAuthSchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userAuthSchema),
  });
  console.log(errors);
  return (
    <form
      className="space-y-5 p-5"
      onSubmit={handleSubmit((data) => {
        console.log("data", data);
        return null;
      })}
    >
      <ValidationInput
        isError={!!errors?.email?.message}
        errorMessage={errors?.email?.message as string}
        type={"email"}
        {...register("email")}
        placeholder={"Enter email or username"}
        className="text-white h-12"
      />
      <ValidationInput
        isError={!!errors?.password?.message}
        errorMessage={errors?.password?.message as string}
        type={"password"}
        {...register("password")}
        placeholder={"Enter password"}
        className="text-white h-12"
      />
      <SubmitButton
        className="w-full"
        name={"Register"}
        isLoading={isSubmitting}
      />
      <hr />
      <Button
        type={"submit"}
        variant={"destructive"}
        asChild
        className="w-full relative"
      >
        <Link href={"/login"} className="absolute inset-0">
          Login
        </Link>
      </Button>
    </form>
  );
};

export default RegisterForm;
