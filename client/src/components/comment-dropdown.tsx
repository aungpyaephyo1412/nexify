"use client";
import { deleteComment } from "@/app/(user)/posts/_action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

const CommentDropdown = ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild className="border-none outline-none ring-0">
        <button onClick={() => setOpen((p) => !p)}>
          <Ellipsis />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"} className="min-w-48">
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const data = await deleteComment(commentId, postId);
            if (data) {
              setOpen((p) => !p);
            }
          }}
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentDropdown;
