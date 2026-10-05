"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

function DoubleCheckIcon({ className = "size-4 text-[#079455]" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 8.5L4.5 11.5L11.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 8.5L8.5 11.5L15.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserAvatar({ avatar, name }) {
  return (
    <div className="bg-white border-[#697586] border-[0.531px] border-solid rounded-full shrink-0 size-[34px] flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-105 shadow-xs">
      {avatar ? (
        <img src={avatar} alt="" className="size-full object-cover" />
      ) : name ? (
        <span className="text-[#4b5565] text-xs font-medium">{name.charAt(0)}</span>
      ) : (
        <svg className="w-[18px] h-[18px] text-[#4b5565]" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12 4a4 4 0 100 8 4 4 0 000-8zm-2 9a6 6 0 00-6 6v1a1 1 0 001 1h14a1 1 0 001-1v-1a6 6 0 00-6-6h-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
}

const defaultMessages = [
  {
    id: 1,
    sender: "me",
    text: "مرحبا هل ممكن مساعدة",
    time: "١١:٠٢ ص  2025/11/5",
    status: "read",
  },
  {
    id: 2,
    sender: "other",
    text: "نعم تفضل",
    time: "١١:٠٢ ص  2025/11/5",
  },
  {
    id: 3,
    sender: "me",
    text: "أود استفسارًا عن بعض الأدوية المتاحة؟ شكرًا لك!",
    time: "١١:٠٢ ص  2025/11/5",
    status: "read",
  },
  {
    id: 4,
    sender: "other",
    text: "ممكن تسجل صوت نفهم المشكلة اكثر",
    time: "١١:٠٢ ص  2025/11/5",
  },
];

export default function ChatWindowPage({ selectedUser }) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState(defaultMessages);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "م" : "ص";
    const formattedHours = (hours % 12 || 12).toString();
    const timeFormatted = `${formattedHours}:${minutes} ${period}  ${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: inputText.trim(),
      time: timeFormatted,
      status: "read",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  if (!selectedUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex h-screen items-center justify-center rounded-3px bg-white border border-[#d1d1d1]"
      >
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <div className="w-14 h-14 rounded-full bg-gray-50 border border-[#eef2f6] flex items-center justify-center">
            <img src="/images/icons/chat.svg" alt="" className="w-6 h-6 opacity-40" />
          </div>
          <p className="text-gray-500 text-base font-normal">
            Select a person to start chatting
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col rounded-3px bg-white border border-[#d1d1d1] h-screen"
    >
      {/* Header */}
      <div className="border-b border-[#d1d1d1] p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white text-base shadow-xs transition-transform duration-200 hover:scale-105">
            {selectedUser.name?.charAt(0) || "U"}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[#202939] text-base font-medium">
              {selectedUser.name}
            </h2>

            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block shrink-0" />
              <p className="text-[#d2d2d2] text-base font-medium">
                Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-[16px]">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const isMe = message.sender === "me";

            return isMe ? (
              /* Sender (Me) - Right Aligned with white bubble & double green checkmarks */
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col items-end w-full"
              >
                <div className="flex gap-[8px] items-start justify-end max-w-[85%]">
                  <div className="bg-white shadow-[0px_0px_10px_rgba(74,87,84,0.1)] hover:shadow-[0px_2px_14px_rgba(74,87,84,0.14)] transition-shadow duration-200 flex flex-col gap-[8px] items-end justify-center pt-[16px] pb-[8px] pl-[24px] pr-[16px] rounded-[3px]">
                    <p
                      className="text-[#0b0e11] text-[13px] text-right font-normal leading-[normal] tracking-[0.13px] whitespace-pre-wrap break-words"
                      dir="auto"
                    >
                      {message.text}
                    </p>
                    <div className="flex items-center justify-end gap-[6px] text-[#4b5565] text-[11px] tracking-[0.11px]">
                      <span dir="auto">{message.time}</span>
                      <DoubleCheckIcon className="size-[16px] text-[#079455] shrink-0" />
                    </div>
                  </div>
                  <UserAvatar />
                </div>
              </motion.div>
            ) : (
              /* Receiver (Worker / Support) - Left Aligned with lavender bubble */
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col items-start w-full"
              >
                <div className="flex gap-[8px] items-start justify-start max-w-[85%]">
                  <UserAvatar avatar={selectedUser?.avatar} />
                  <div className="bg-[#ede7fd] shadow-[4px_4px_10px_rgba(0,0,77,0.04)] hover:shadow-[4px_6px_14px_rgba(0,0,77,0.08)] transition-shadow duration-200 flex flex-col gap-[8px] items-start justify-center pt-[16px] pb-[8px] pl-[16px] pr-[24px] rounded-[3px]">
                    <p
                      className="text-[#0b0e11] text-[13px] text-right font-normal leading-[normal] tracking-[0.13px] whitespace-pre-wrap break-words"
                      dir="auto"
                    >
                      {message.text}
                    </p>
                    <div className="flex items-center justify-start text-[#4b5565] text-[11px] tracking-[0.11px]">
                      <span dir="auto">{message.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-[#d1d1d1] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t("Write your message here...")}
            className="flex-1 rounded-3px border border-[#666B6D3D] p-5 outline-none transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary/20"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="rounded-3px bg-primary px-5 text-white cursor-pointer transition-colors duration-200 hover:brightness-105 shadow-xs flex items-center justify-center"
          >
            <img src="/images/icons/sendLogo.svg" alt="" className="transition-transform duration-200 group-hover:scale-105" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}