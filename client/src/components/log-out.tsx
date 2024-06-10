"use client";
import { logout } from "@/app/(auth)/_action";

const LogOut = () => {
  return (
    <button
      className="w-full bg-neutral-400 font-semibold px-4 py-2 rounded-full"
      onClick={async () => await logout()}
    >
      Log Out
    </button>
  );
};

export default LogOut;
