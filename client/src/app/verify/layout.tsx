import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.user.isVerified) {
    redirect("/home");
  }
  return (
    <div className="bg-neutral-300 w-full min-h-screen grid items-center px-3">
      <div className="w-full grid h-full max-w-screen-sm mx-auto gap-9 items-center py-20">
        <div className="space-y-5 self-start">
          <h1 className="text-[35px] lg:text-[65px] font-semibold text-blue-500 text-center lg:text-start">
            Loopfeed
          </h1>
          <p className="text-sm text-center lg:text-start">
            Loopfeed helps you connect and share with the people in your life
          </p>
          <p className="text-sm text-center lg:text-start">
            You need to verify your email address with your verification code,
            check your email inbox.
          </p>
        </div>
        <div className="w-full rounded-xl">
          <h1 className="mb-5">Enter your verification code....</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
