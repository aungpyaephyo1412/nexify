import { Image as Img } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex gap-5">
        <div className="size-[45px] bg-black rounded relative overflow-hidden">
          <Image
            src={"/hello.jpeg"}
            alt={"image"}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <input
            className="text-lg outline-none border-b border-b-gray-500 bg-transparent w-full py-3 pr-2 mb-3"
            placeholder={"What is happening?"}
          />
          <div className="w-full flex justify-between items-center">
            <div>
              <label
                htmlFor="image"
                className="w-fit cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
              >
                <Img size={15} />
              </label>
              <input
                id="image"
                type="file"
                hidden
                accept={"image/jpeg,image/jpg,image/png"}
                multiple={false}
              />
            </div>
            <button className="text-xs px-4 py-2 rounded-full text-white bg-blue-500">
              Post
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
