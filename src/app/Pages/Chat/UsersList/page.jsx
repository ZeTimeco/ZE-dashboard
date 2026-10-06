"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { fetchConversations } from "@/lib/chatApi";
import { IMAGE_BASE_URL } from "../../../../../config/imageUrl";

const fallbackUsers = [
  {
    id: 1,
    conversation_id: 1,
    name: "الاسم",
    lastMessage: "مرحبًا، أود استفسارًا عن بعض الأدوية ...",
    time: "5:32 ص",
    unread: false,
    isOnline: true,
  },
  {
    id: 2,
    conversation_id: 2,
    name: "الاسم",
    lastMessage: "مرحبًا، أود استفسارًا عن بعض الأدوية ...",
    time: "5:32 ص",
    unread: true,
    isOnline: true,
  },
];

export default function UsersListPage({ selectedUser, setSelectedUser }) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState(fallbackUsers);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "all", label: t("All") || "الكل" },
    { id: "unread", label: t("Unread") || "غير مقروءة" },
    { id: "read", label: t("Read") || "مقروءة" },
  ];

  // Load conversations from backend
  const loadConversations = useCallback(async (search = "") => {
    try {
      const data = await fetchConversations(search);
      if (Array.isArray(data) && data.length > 0) {
        setConversations(data);
        // Auto-select first conversation if none selected yet
        if (!selectedUser && data[0]) {
          setSelectedUser(data[0]);
        }
      }
    } catch (err) {
      console.warn("Could not fetch conversations from API, using fallback:", err.message);
    }
  }, [selectedUser, setSelectedUser]);

  useEffect(() => {
    loadConversations(searchQuery);

    // Periodic inbox polling (every 30 seconds as recommended in integration guide)
    const interval = setInterval(() => {
      loadConversations(searchQuery);
    }, 30000);

    return () => clearInterval(interval);
  }, [searchQuery, loadConversations]);

  const filteredUsers = conversations.filter((user) => {
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
    <div className="rounded-3px bg-white py-6 border border-[#d1d1d1] h-screen flex flex-col">
      <h2 className="text-[#28292A] text-xl px-4 font-normal mb-6">
        {t("All conversations") || "جميع المحادثات"}
      </h2>

      {/* Filter Tabs */}
      <div className="flex items-center px-3 border-b border-[#E4E7EC] mb-6">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`h-[45px] px-4 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 border-b-[3px] -mb-[1px] ${
                isActive
                  ? "text-primary border-primary font-normal"
                  : "text-[#666B6D] border-transparent hover:text-primary font-normal"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="px-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Search") || "بحث"}
            className="w-full rounded-3px border border-[#666B6D3D] p-5 ps-12 outline-none"
          />

          <img
            src="/images/icons/search.svg"
            alt=""
            className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2"
          />
        </div>
      </div>

      {/* User / Conversation List */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 px-2">
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            {t("No conversations found") || "لا توجد محادثات"}
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isSelected =
              selectedUser?.id === user.id ||
              selectedUser?.conversation_id === user.id;

            return (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center justify-between p-3 rounded-3px transition-colors duration-150 hover:bg-gray-50 cursor-pointer text-start ${
                  isSelected ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* Avatar */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white text-base overflow-hidden shrink-0">
                    {user.avatar ? (
                      <img
                        src={`${IMAGE_BASE_URL}${user.avatar}`}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0) || "U"
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col items-start gap-1 overflow-hidden">
                    <p className="text-[#202939] text-base font-normal truncate max-w-[170px]">
                      {user.name}
                    </p>

                    <p className="text-[#697586] text-sm font-normal truncate max-w-[170px]">
                      {user.lastMessage || t("No messages yet") || "لا توجد رسائل بعد"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0 ms-2">
                  <p className="text-[#697586] text-xs font-light whitespace-nowrap">
                    {user.time || "5:32 ص"}
                  </p>

                  {user.unread && (
                    <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}