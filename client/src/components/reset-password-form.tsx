"use client";
import { resetPassword } from "@/app/(auth)/_action";
import SubmitButton from "@/components/submit-button";
import ValidationInput from "@/components/validation-input";
import { userResetPasswordSchema } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userResetPasswordSchema),
  });
  const { slug } = useParams();
  console.log(slug);
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await resetPassword({ token: slug, newPassword: data.password });
        } catch (err) {
          setError("root", { message: "Something went wrong!" });
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
        id="newpassword"
        title="New password"
        type={"password"}
        isError={!!errors?.password?.message}
        errorMessage={errors?.password?.message as string}
        {...register("password")}
        placeholder={"Enter new password "}
        className="border border-gray-500"
      />
      <ValidationInput
        id="cpassword"
        title="Confirm Password"
        isError={!!errors?.confirm?.message}
        errorMessage={errors?.confirm?.message as string}
        type={"password"}
        {...register("confirmPassword")}
        placeholder={"Re Enter password"}
        className="border border-gray-500"
      />
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <SubmitButton
        className="w-full"
        name={"Reset Password"}
        isLoading={isSubmitting}
      />
    </form>
  );
};

export default ResetPasswordForm;
