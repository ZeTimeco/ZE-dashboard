"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import UsersListPage from "./UsersList/page";
import ChatWindowPage from "./ChatWindow/page";

export default function ChatLayout() {
  const searchParams = useSearchParams();
  const [selectedUser, setSelectedUser] = useState(null);

  const targetUserId = searchParams.get("userId");
  const targetConvId = searchParams.get("conversationId");
  const targetName = searchParams.get("name") || searchParams.get("userName");
  const targetAvatar = searchParams.get("avatar");

  return (
    <div className="flex w-full gap-6 h-[calc(100vh-105px)] pb-2">
      <div className="w-[40%] h-full">
        <UsersListPage
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          targetUserId={targetUserId}
          targetConvId={targetConvId}
          targetName={targetName}
          targetAvatar={targetAvatar}
        />
      </div>

      <div className="w-[60%] h-full">
        <ChatWindowPage selectedUser={selectedUser} />
      </div>
    </div>
  );
}
