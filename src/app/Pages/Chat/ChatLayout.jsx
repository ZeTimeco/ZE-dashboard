"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import UsersListPage from "./UsersList/page";
import ChatWindowPage from "./ChatWindow/page";

export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex w-full gap-6 mb-4"
    >
      <div className="w-[40%]">
        <UsersListPage
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      <div className="w-[60%]">
        <ChatWindowPage selectedUser={selectedUser} />
      </div>
    </motion.div>
  );
}