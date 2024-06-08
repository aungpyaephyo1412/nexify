import AuthTemplate from "@/components/auth-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Page = () => {
  return (
    <AuthTemplate>
      <form className="space-y-5 p-5">
        <Input
          placeholder={"Enter email or username"}
          className="text-white h-12"
        />
        <Input placeholder={"Enter password"} className="text-white h-12" />
        <Button variant={"secondary"} className="w-full">
          Login
        </Button>
        <Link
          href={"/forgot-password"}
          className="text-blue-500 hover:underline w-full text-center block"
        >
          Forgot Password
        </Link>
        <hr />
        <div className="w-full justify-center items-center flex">
          <Button variant={"destructive"} asChild>
            <Link href={"/register"}>Create New Account</Link>
          </Button>
        </div>
      </form>
    </AuthTemplate>
  );
};

export default Page;
