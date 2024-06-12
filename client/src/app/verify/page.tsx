import VerifyForm from "@/components/form/verify-form";
import { auth } from "../../../auth";

export const metadata = {
  title: "Verify Account",
};
const Page = async () => {
  const session = await auth();
  return <VerifyForm email={session!.user.email} />;
};

export default Page;
