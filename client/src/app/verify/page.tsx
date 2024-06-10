import { auth } from "@/auth";
import VerifyForm from "@/components/verify-form";

export const metadata = {
  title: "Verify Account",
};
const Page = async () => {
  const session = await auth();

  return <VerifyForm email={session!.user.email} />;
};

export default Page;
