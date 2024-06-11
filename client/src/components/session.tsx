"use client"
import { useSession } from "next-auth/react";

const Session = () => {
  const session = useSession({required : true})
  console.log(session);
  return (
    <>

    </>
  );
};

export default Session;