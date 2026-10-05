"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const users = [
  {
    id: 1,
    name: "الاسم",
    lastMessage: "مرحبًا، أود استفسارًا عن بعض الأدوية ...",
    time: "5:32 ص",
    unread: false,
  },
  {
    id: 2,
    name: "الاسم",
    lastMessage: "مرحبًا، أود استفسارًا عن بعض الأدوية ...",
    time: "5:32 ص",
    unread: true,
  },
];

export default function UsersListPage({ selectedUser, setSelectedUser }) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "all", label: t("All") },
    { id: "unread", label: t("Unread") },
    { id: "read", label: t("Read") },
  ];

  const filteredUsers = users.filter((user) => {
    if (activeFilter === "unread" && !user.unread) return false;
    if (activeFilter === "read" && user.unread) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      const matchName = user.name?.toLowerCase().includes(query);
      const matchMsg = user.lastMessage?.toLowerCase().includes(query);
      return matchName || matchMsg;
    }

    return true;
  });

  return (
    <div className="rounded-3px bg-white py-6 border border-[#d1d1d1] h-screen flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <h2 className="text-[#28292A] text-xl px-4 font-normal mb-6">
        {t("All conversations")}
      </h2>

      {/* filter */}
      <div className="flex items-center px-3 border-b border-[#E4E7EC] mb-6">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <motion.button
              key={tab.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(tab.id)}
              className={`h-[45px] px-4 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 border-b-[3px] -mb-[1px] ${
                isActive
                  ? "text-primary border-primary font-normal"
                  : "text-[#666B6D] border-transparent hover:text-primary font-normal"
              }`}
            >
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* search */}
      <div className="px-4 mb-6">
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Search")}
            className="w-full rounded-3px border border-[#666B6D3D] p-5 ps-12 outline-none transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
          />

          <img
            src="/images/icons/search.svg"
            alt=""
            className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-transform duration-200 group-focus-within:scale-110 opacity-70 group-focus-within:opacity-100"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {filteredUsers.map((user, index) => {
            const isSelected = selectedUser?.id === user.id;

            return (
              <motion.button
                key={user.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                whileHover={{ scale: 1.005, backgroundColor: isSelected ? "#f3f4f6" : "#f9fafb" }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedUser(user)}
                className={`group flex items-center justify-between p-3 rounded-[3px] border-r-[3px] cursor-pointer transition-all duration-200 text-right ${
                  isSelected
                    ? "bg-gray-100 border-primary shadow-xs"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white text-base shadow-xs transition-transform duration-200 group-hover:scale-105">
                      {user.name.charAt(0)}
                    </div>
                    {user.unread && (
                      <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full bg-primary border-2 border-white" />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-[#202939] text-base font-normal">
                      {user.name}
                    </p>

                    <p className="text-[#697586] text-sm font-normal line-clamp-1">
                      {user.lastMessage}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <p className="text-[#697586] text-sm font-light whitespace-nowrap">
                    {user.time || "5:32 ص"}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}