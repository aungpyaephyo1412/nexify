import { auth } from "@/auth";
import VerifyForm from "@/components/verify-form";

export const metadata = {
  title: "Verify Account",
};
const Page = async () => {
  const session = await auth();
  console.log(session);
  return <VerifyForm email={session!.user.email} />;
};

export default Page;
