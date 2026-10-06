"use client";

import { useState } from "react";
import UsersListPage from "./UsersList/page";
import ChatWindowPage from "./ChatWindow/page";


export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex w-full gap-6 mb-4">
      <div className="w-[40%]">
        <UsersListPage
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      <div className="w-[60%]">
        <ChatWindowPage selectedUser={selectedUser} />
      </div>
    </div>
  );
}