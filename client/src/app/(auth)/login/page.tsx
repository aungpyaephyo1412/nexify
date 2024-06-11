import AuthTemplate from "@/components/auth-template";
import LoginForm from "@/components/form/login-form";

const Page = ({
  searchParams: { message },
}: {
  searchParams: { message: string };
}) => {
  return (
    <AuthTemplate>
      {message && (
        <h1 className="text-sm font-semibold mb-5 p-5 pb-0">{message}</h1>
      )}
      <LoginForm />
    </AuthTemplate>
  );
};

export default Page;
