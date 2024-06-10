import { ReactNode } from "react";

const AuthTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-neutral-300 w-full min-h-dvh">
      <div className="w-full max-w-screen-sm mx-auto py-7 px-3 lg:px-6">
        <h1 className="text-center text-[30px] lg:text-[60px] font-semibold text-green-500 w-full mb-8">
          Loopfed
        </h1>
        <div className="bg-neutral-200 shadow-md rounded">{children}</div>
      </div>
    </div>
  );
};

export default AuthTemplate;
