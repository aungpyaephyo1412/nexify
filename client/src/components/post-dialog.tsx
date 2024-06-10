import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";

const PostDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-black">
          <Ellipsis />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 rounded-md overflow-hidden shadow-none border-none">
        <div>
          <button className="w-full text-center">
            <p className="text-center py-2.5 font-semibold text-sm text-red-500">
              Unfollow
            </p>
            <hr className="h-[2px] bg-gray-200" />
          </button>
          <button className="w-full text-center">
            <p className="text-center py-2.5 font-semibold text-sm">
              Add to favorites
            </p>
            <hr className="h-[2px] bg-gray-200" />
          </button>
          <button className="w-full text-center">
            <p className="text-center py-2.5 font-semibold text-sm">
              Go to post
            </p>
            <hr className="h-[2px] bg-gray-200" />
          </button>
          <DialogClose asChild>
            <button className="w-full text-center">
              <p className="text-center py-2.5 font-semibold text-sm">Cancel</p>
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
