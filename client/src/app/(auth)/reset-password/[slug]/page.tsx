import AuthTemplate from "@/components/auth-template";
import NotFound from "@/components/not-found";
import ResetPasswordForm from "@/components/reset-password-form";
import { Button } from "@/components/ui/button";
import safeFetch from "@/lib/safeFetch";
import { RegisterReturnSchema } from "@/types/user.types";
import Link from "next/link";

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { data, error } = await safeFetch(
    RegisterReturnSchema,
    `/auth/verify/${slug}`,
    {
      cache: "no-store",
    }
  );
  if (error)
    return (
      <NotFound
        text={"Invalid Reset Token, Create new reset token!"}
        className={"min-h-dvh flex-col"}
      >
        <div className="mt-7">
          <Button variant={"link"}>
            <Link href={"/forgot-password"}>Forgot password</Link>
          </Button>
        </div>
      </NotFound>
    );
  return (
    <AuthTemplate>
      <ResetPasswordForm />
    </AuthTemplate>
  );
};

export default Page;
