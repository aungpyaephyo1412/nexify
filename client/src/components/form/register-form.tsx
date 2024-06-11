"use client";
import { login } from "@/app/(auth)/_action";
import SubmitButton from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ValidationInput from "@/components/validation-input";
import safeFetch from "@/lib/safeFetch";
import { RegisterReturnSchema, userAuthSchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userAuthSchema),
  });
  return (
    <form
      className="space-y-5 p-5"
      onSubmit={handleSubmit(async (data) => {
        const { error } = await safeFetch(
          RegisterReturnSchema,
          "/auth/register",
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
        await login({ email: data.email, password: data.password });
      })}
    >
      <h1 className="text-xl font-semibold text-center">
        Create a new account
      </h1>
      <p className="text-xs text-center text-gray-600">{`It's quick and easy.`}</p>
      {errors.root && (
        <p className="text-sm bg-red-300 border border-gray-500 py-2 text-center px-4">
          {errors.root.message}
        </p>
      )}
      <ValidationInput
        title={"Name"}
        isError={!!errors?.name?.message}
        errorMessage={errors?.name?.message as string}
        placeholder={"Enter your name"}
        {...register("name")}
        className="border border-gray-500"
      />
      <div className="grid grid-cols-2 gap-5">
        <ValidationInput
          title={"Email"}
          isError={!!errors?.email?.message}
          errorMessage={errors?.email?.message as string}
          type={"email"}
          placeholder={"Enter email address"}
          {...register("email")}
          className="border border-gray-500"
        />
        <ValidationInput
          title={"Password"}
          isError={!!errors?.password?.message}
          errorMessage={errors?.password?.message as string}
          type={"password"}
          placeholder={"Enter password"}
          {...register("password")}
          className="border border-gray-500"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={"gender"} className="text-sm capitalize">
          Gender
        </Label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <Select onValueChange={onChange}>
              <SelectTrigger className="w-full border border-gray-500">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="CUSTOM">Custom</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {errors?.gender && (
        <p className="text-xs text-red-500">
          {errors?.gender?.message as string}
        </p>
      )}
      <div className="w-full flex justify-end items-center">
        <Link
          href={"/login"}
          className="text-blue-500 hover:underline font-medium text-sm"
        >
          Already have an account?
        </Link>
      </div>
      <SubmitButton
        className="w-full"
        name={"Register"}
        isLoading={isSubmitting}
      />
    </form>
  );
};

export default RegisterForm;
