import { ReactNode } from "react";

const AuthTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-black grid items-center px-3">
      <div className="w-full grid lg:grid-cols-2 max-w-screen-lg mx-auto gap-5 items-center">
        <div className="space-y-5">
          <h1 className="text-[65px] font-semibold text-blue-500 text-center lg:text-start">
            Loopfeed
          </h1>
          <p className="text-white text-sm text-center lg:text-start">
            Loopfeed helps you connect and share with the people in your life
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl">{children}</div>
      </div>
    </div>
  );
};

export default AuthTemplate;
