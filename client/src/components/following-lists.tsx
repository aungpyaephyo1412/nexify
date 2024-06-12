import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fullImagePath } from "@/lib/utils";
import { FollowDatum } from "@/types/follow.types";

const FollowingLists = ({ users }: { users: FollowDatum[] }) => {
  return (
    <div>
      {users.map((user) => (
        <div className="" key={user.id}>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="size-[30px] rounded-full border border-gray-500">
                {user.following.profilePicture && (
                  <AvatarImage
                    src={fullImagePath(user.following.profilePicture)}
                  />
                )}
                <AvatarFallback className="rounded-none">
                  {user.following.name.substring(0, 2) || "User"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-sm font-semibold">{user.following.name}</h1>
                <p className="text-xs text-gray-600">
                  @{user.following.username}
                </p>
              </div>
            </div>
            <button className="text-xs px-4 border border-gray-500 py-1 rounded-full">
              Unfollow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowingLists;
