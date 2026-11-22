"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { getEchoInstance } from "@/lib/echo";
import {
  getAuthToken,
  getProviderId,
  fetchChatMessages,
  sendMessage,
  sendTypingStatus,
  formatChatTime,
  normalizeMessage,
} from "@/lib/chatApi";
import { IMAGE_BASE_URL } from "../../../../../config/imageUrl";

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
    <div className="bg-white border-[#697586] border-[0.531px] border-solid rounded-full shrink-0 size-[34px] flex items-center justify-center overflow-hidden">
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

function WhatsAppTail({ isRight, color = "#ffffff" }) {
  if (isRight) {
    return (
      <svg
        className="absolute -bottom-[0.5px] -right-[8px] w-[9px] h-[13px] pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.04)]"
        viewBox="0 0 9 13"
        fill="none"
      >
        <path d="M0 0 C1.5 3.5 5 8.5 9 13 L0 13 Z" fill={color} />
      </svg>
    );
  }

  return (
    <svg
      className="absolute -bottom-[0.5px] -left-[8px] w-[9px] h-[13px] pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.04)]"
      viewBox="0 0 9 13"
      fill="none"
    >
      <path d="M9 0 C7.5 3.5 4 8.5 0 13 L9 13 Z" fill={color} />
    </svg>
  );
}

function getMessageDateKey(message) {
  if (!message) return null;

  if (message.created_at) {
    try {
      const d = new Date(message.created_at);
      if (!isNaN(d.getTime())) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
    } catch {}
  }

  if (message.time && typeof message.time === "string") {
    const normalized = message.time.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
    const match = normalized.match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
    if (match) {
      const [, y, m, d] = match;
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
  }

  return null;
}

function formatDateDivider(dateKey, t) {
  if (!dateKey) return "";
  try {
    const [year, month, day] = dateKey.split("-").map(Number);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday =
      today.getFullYear() === year &&
      today.getMonth() + 1 === month &&
      today.getDate() === day;

    if (isToday) {
      return t("Today") || "اليوم";
    }

    const isYesterday =
      yesterday.getFullYear() === year &&
      yesterday.getMonth() + 1 === month &&
      yesterday.getDate() === day;

    if (isYesterday) {
      return t("Yesterday") || "أمس";
    }

    return `${day}/${month}/${year}`;
  } catch {
    return dateKey;
  }
}

function formatMessageTimeOnly(message) {
  if (!message) return "";

  if (message.created_at) {
    try {
      const d = new Date(message.created_at);
      if (!isNaN(d.getTime())) {
        const hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, "0");
        const period = hours >= 12 ? "م" : "ص";
        const formattedHours = (hours % 12 || 12).toString();
        return `${formattedHours}:${minutes} ${period}`;
      }
    } catch {}
  }

  if (message.time && typeof message.time === "string") {
    const trimmed = message.time.trim();
    const parts = trimmed.split(/\s{2,}|\s+(?=\d{4}[/-])/);
    if (parts.length > 0 && parts[0]) {
      return parts[0].trim();
    }
    return trimmed;
  }

  return "";
}

const defaultMessages = [
  {
    id: 1,
    isMe: true,
    sender_type: "provider",
    message: "مرحبا هل ممكن مساعدة",
    time: "١١:٠٢ ص",
    created_at: "2025-11-05T11:02:00Z",
    is_read: true,
  },
  {
    id: 2,
    isMe: false,
    sender_type: "user",
    message: "نعم تفضل",
    time: "١١:٠٢ ص",
    created_at: "2025-11-05T11:02:00Z",
    is_read: true,
  },
  {
    id: 3,
    isMe: true,
    sender_type: "provider",
    message: "أود استفسارًا عن بعض الأدوية المتاحة؟ شكرًا لك!",
    time: "١١:٠٢ ص",
    created_at: "2025-11-06T11:02:00Z",
    is_read: true,
  },
  {
    id: 4,
    isMe: false,
    sender_type: "user",
    message: "ممكن تسجل صوت نفهم المشكلة اكثر",
    time: "١١:٠٢ ص",
    created_at: "2025-11-06T11:02:00Z",
    is_read: true,
  },
];

export default function ChatWindowPage({ selectedUser }) {
  const { t, i18n } = useTranslation();
  const isRtl =
    i18n?.language === "ar" ||
    (typeof document !== "undefined" &&
      (document.dir === "rtl" || document.documentElement.dir === "rtl")) ||
    false;
  const conversationId = selectedUser?.id || selectedUser?.conversation_id;

  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading user from localStorage:", e);
    }
  }, []);

  const [messages, setMessages] = useState(defaultMessages);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);

  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastTypingSentRef = useRef(0);
  const idleTypingTimerRef = useRef(null);
  const otherTypingTimerRef = useRef(null);

  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);
  const userScrolledUpRef = useRef(false);
  const isInitialLoadRef = useRef(true);

  // Manual scroll to bottom
  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight <= 80;
    userScrolledUpRef.current = !isAtBottom;
    setShowScrollBottomBtn(!isAtBottom);
  };

  // Reset scroll state on conversation switch
  useEffect(() => {
    userScrolledUpRef.current = false;
    setShowScrollBottomBtn(false);
    isInitialLoadRef.current = true;
  }, [conversationId]);

  // Initial scroll to bottom on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Load chat messages when conversation changes
  const loadMessages = useCallback(async () => {
    if (!conversationId) return;
    setLoadingHistory(true);
    try {
      const history = await fetchChatMessages(conversationId);
      if (Array.isArray(history) && history.length > 0) {
        setMessages(history);
      } else {
        // Keep default messages if empty/initial
        setMessages(defaultMessages);
      }
    } catch (err) {
      console.error("Failed to load chat history:", err);
      // Fallback to default mock messages so UI never breaks
      setMessages(defaultMessages);
    } finally {
      setLoadingHistory(false);
      // If user hasn't scrolled up, scroll to bottom
      if (!userScrolledUpRef.current) {
        setTimeout(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        }, 50);
      }
    }
  }, [conversationId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Keep chat at bottom when new messages arrive UNLESS the user scrolled up
  useEffect(() => {
    if (userScrolledUpRef.current) return;

    if (messagesContainerRef.current) {
      if (isInitialLoadRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        isInitialLoadRef.current = false;
      } else {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  // Laravel Echo / Reverb WebSocket Connection
  useEffect(() => {
    if (!conversationId) return;

    const token = getAuthToken();
    if (!token) {
      console.warn("No auth token found for Reverb Echo connection");
      return;
    }

    const echo = getEchoInstance(token);
    if (!echo) return;

    const channelName = `chat.${conversationId}`;
    const legacyChannelName = `provider-chat.${conversationId}`;

    const handleEvent = (event) => {
      console.log("Reverb event received on", channelName, event);

      // 1. Typing event handling
      if (event.is_typing !== undefined && event.typing_user) {
        const actor = event.typing_user;
        const currentProviderId = getProviderId();
        const isSelf =
          actor.type === "provider" &&
          currentProviderId &&
          Number(actor.id) === Number(currentProviderId);

        if (!isSelf) {
          setIsOtherTyping(Boolean(event.is_typing));
          clearTimeout(otherTypingTimerRef.current);
          if (event.is_typing) {
            otherTypingTimerRef.current = setTimeout(() => {
              setIsOtherTyping(false);
            }, 3500);
          }
        }
      }

      // 2. Incoming messages handling
      if (Array.isArray(event.messages) && event.messages.length > 0) {
        const targetMessages = event.messages.filter(
          (m) => !m.conversation_id || Number(m.conversation_id) === Number(conversationId)
        );

        if (targetMessages.length > 0) {
          setMessages((prev) => {
            const map = new Map(prev.map((m) => [m.id, m]));
            targetMessages.forEach((raw) => {
              const normalized = normalizeMessage(raw);
              map.set(normalized.id, normalized);
            });
            return Array.from(map.values()).sort(
              (a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0)
            );
          });
        }
      } else if (event.message_data || (event.id && event.message !== undefined)) {
        const single = normalizeMessage(event.message_data || event);
        setMessages((prev) => {
          if (prev.some((m) => m.id === single.id)) return prev;
          return [...prev, single];
        });
      }
    };

    // Subscribe to unified private channel: chat.{conversationId}
    const privateChannel = echo.private(channelName);
    privateChannel
      .listen(".new.message", handleEvent)
      .error((error) => {
        console.warn("Reverb channel subscription error for", channelName, error);
      });

    // Also subscribe to legacy channel: provider-chat.{conversationId}
    const legacyChannel = echo.private(legacyChannelName);
    legacyChannel
      .listen(".new.message", handleEvent)
      .error((error) => {
        console.warn("Reverb legacy channel error for", legacyChannelName, error);
      });

    // Tab visibility handling: reconcile history when returning to tab
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadMessages();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Interim reconciliation interval (every 15s) while chat is open
    const pollInterval = setInterval(() => {
      if (!document.hidden) {
        loadMessages();
      }
    }, 2000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(pollInterval);
      clearTimeout(otherTypingTimerRef.current);
      try {
        privateChannel.stopListening(".new.message");
        legacyChannel.stopListening(".new.message");
        echo.leave(channelName);
        echo.leave(legacyChannelName);
      } catch (e) {
        console.error("Error leaving echo channels:", e);
      }
    };
  }, [conversationId, loadMessages]);

  // Handle typing status broadcast to backend
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    if (!conversationId) return;

    const now = Date.now();
    // Throttled typing=true broadcast (at most once every 2s)
    if (now - lastTypingSentRef.current > 2000) {
      lastTypingSentRef.current = now;
      sendTypingStatus({ conversationId, isTyping: true });
    }

    // Reset idle timer to send typing=false after 1.5s idle
    clearTimeout(idleTypingTimerRef.current);
    idleTypingTimerRef.current = setTimeout(() => {
      sendTypingStatus({ conversationId, isTyping: false });
    }, 1500);
  };

  const handleInputBlur = () => {
    if (!conversationId) return;
    clearTimeout(idleTypingTimerRef.current);
    sendTypingStatus({ conversationId, isTyping: false });
  };

  // Send message handler
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if ((!inputText.trim() && !selectedFile) || sending) return;

    const textToSend = inputText.trim();
    const fileToSend = selectedFile;

    // Reset inputs
    setInputText("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Inform backend that typing has stopped
    clearTimeout(idleTypingTimerRef.current);
    sendTypingStatus({ conversationId, isTyping: false });

    // Optimistic UI update
    const tempId = Date.now();
    const optimisticMsg = {
      id: tempId,
      conversation_id: conversationId,
      sender_type: "provider",
      isMe: true,
      message: textToSend,
      attachment: fileToSend ? URL.createObjectURL(fileToSend) : null,
      attachmentFile: fileToSend,
      time: formatChatTime(new Date().toISOString()),
      created_at: new Date().toISOString(),
      is_read: false,
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setSending(true);

    // Ensure view scrolls to the newly sent message
    userScrolledUpRef.current = false;
    setShowScrollBottomBtn(false);
    setTimeout(() => scrollToBottom("smooth"), 40);

    try {
      const savedMsg = await sendMessage({
        conversationId,
        message: textToSend,
        attachment: fileToSend,
      });

      // Update the optimistic message with server response
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...savedMsg, isMe: true } : m))
      );
    } catch (err) {
      console.error("Error sending message:", err);
      // Keep optimistic message marked as sent
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, is_read: false } : m))
      );
    } finally {
      setSending(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB as per documentation)
      if (file.size > 5 * 1024 * 1024) {
        alert(t("File size must not exceed 5MB") || "حجم الملف لا يجب أن يتجاوز 5 ميجابايت");
        return;
      }
      setSelectedFile(file);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex h-full items-center justify-center rounded-3px bg-white border border-[#d1d1d1]">
        <p className="text-gray-500">
          {t("Select a person to start chatting") || "اختر محادثة لبدء المراسلة"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-3px bg-white border border-[#d1d1d1] h-full overflow-hidden relative">
      {/* Header */}
      <div className="border-b  border-[#d1d1d1] p-4 shrink-0 bg-white">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white text-base overflow-hidden shrink-0">
            {selectedUser.avatar ? (
              <img src={`${IMAGE_BASE_URL}${selectedUser.avatar}`} alt="" className="size-full object-cover" />
            ) : (
              selectedUser.name?.charAt(0) || "U"
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[#202939] text-base font-medium">
              {selectedUser.name}
            </h2>

            <p className="text-[#9aa4b2] text-xs font-normal">
              {selectedUser.isOnline !== false ? (
                <span className="text-emerald-600 font-medium">Online</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 p-4 overflow-y-auto flex flex-col gap-[16px] relative bg-[#FFFDF5]"
      >
        {loadingHistory && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            {t("Loading messages...") || "جاري تحميل الرسائل..."}
          </div>
        ) : (
          messages.map((message, index) => {
            const isMe = Boolean(message.isMe);
            const currentDateKey = getMessageDateKey(message);
            const prevDateKey = index > 0 ? getMessageDateKey(messages[index - 1]) : null;
            const isNewDay = Boolean(currentDateKey && currentDateKey !== prevDateKey);

            return (
              <div key={message.id || index} className="flex flex-col gap-2.5 w-full">
                {/* Date divider when day changes */}
                {isNewDay && (
                  <div className="flex justify-center my-1 select-none">
                    <span className="bg-[#E4E7EC]/75 text-[#475467] text-[11px] font-normal px-3 py-0.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.03)] border border-[#D0D5DD]/40">
                      {formatDateDivider(currentDateKey, t)}
                    </span>
                  </div>
                )}

                {isMe ? (
                  /* Sender (Me / Provider) - Fixed to RIGHT side */
                  <div className="flex w-full justify-end" dir="ltr">
                    <div className="flex gap-2.5 items-end max-w-[85%]">
                      <div
                        className="relative bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] border border-black/[0.04] flex flex-col pt-2.5 pb-2 px-3.5 min-w-[95px] rounded-3px rounded-br-[2px]"
                      >
                        {/* Attachment preview if exists */}
                        {message.attachment && (
                          <div className="w-full mb-1.5 rounded-xl overflow-hidden">
                            {message.attachment.match(/\.(jpeg|jpg|png|gif|webp)$/i) ||
                            message.attachment.startsWith("blob:") ? (
                              <a
                                href={message.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block overflow-hidden rounded-xl border border-gray-100 max-h-56"
                              >
                                <img
                                  src={message.attachment}
                                  alt="attachment"
                                  className="object-cover max-h-56 w-full"
                                />
                              </a>
                            ) : (
                              <a
                                href={message.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-xs text-blue-600 hover:underline"
                              >
                                <img
                                  src="/images/icons/document-attachment-blue.svg"
                                  alt=""
                                  className="w-4 h-4"
                                />
                                <span>{t("View Attachment") || "عرض المرفق"}</span>
                              </a>
                            )}
                          </div>
                        )}

                        {message.message && (
                          <p
                            className="text-[#111b21] text-[13.5px] font-normal leading-relaxed whitespace-pre-wrap break-words"
                            dir="auto"
                          >
                            {message.message}
                          </p>
                        )}

                        <div className="flex items-center justify-end gap-1 text-[#667781] text-[11px] mt-1 select-none">
                          <span dir="auto">{formatMessageTimeOnly(message)}</span>
                          <DoubleCheckIcon
                            className={`size-3.5 shrink-0 ${
                              message.is_read ? "text-[#079455]" : "text-[#9aa4b2]"
                            }`}
                          />
                        </div>

                        {/* WhatsApp bottom arrow on the RIGHT */}
                        <WhatsAppTail isRight={true} color="#ffffff" />
                      </div>

                      <UserAvatar
                        avatar={
                          currentUser?.image
                            ? currentUser.image.startsWith("http")
                              ? currentUser.image
                              : `${IMAGE_BASE_URL}${currentUser.image}`
                            : null
                        }
                        name={currentUser?.name}
                      />
                    </div>
                  </div>
                ) : (
                  /* Receiver (User / Customer) - Fixed to LEFT side */
                  <div className="flex w-full justify-start" dir="ltr">
                    <div className="flex gap-2.5 items-end max-w-[85%]">
                      <UserAvatar
                        avatar={`${IMAGE_BASE_URL}${selectedUser?.avatar}`}
                        name={selectedUser?.name}
                      />
                      <div
                        className="relative bg-[#ede7fd] shadow-[0_1px_2px_rgba(0,0,77,0.06)] border border-purple-200/30 flex flex-col pt-2.5 pb-2 px-3.5 min-w-[95px] rounded-3px rounded-bl-[2px]"
                      >
                        {/* Attachment preview if exists */}
                        {message.attachment && (
                          <div className="w-full mb-1.5 rounded-xl overflow-hidden">
                            {message.attachment.match(/\.(jpeg|jpg|png|gif|webp)$/i) ||
                            message.attachment.startsWith("blob:") ? (
                              <a
                                href={message.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block overflow-hidden rounded-xl border border-gray-100 max-h-56"
                              >
                                <img
                                  src={message.attachment}
                                  alt="attachment"
                                  className="object-cover max-h-56 w-full"
                                />
                              </a>
                            ) : (
                              <a
                                href={message.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2 rounded-lg bg-white/70 text-xs text-blue-600 hover:underline"
                              >
                                <img
                                  src="/images/icons/document-attachment-blue.svg"
                                  alt=""
                                  className="w-4 h-4"
                                />
                                <span>{t("View Attachment") || "عرض المرفق"}</span>
                              </a>
                            )}
                          </div>
                        )}

                        {message.message && (
                          <p
                            className="text-[#111b21] text-[13.5px] font-normal leading-relaxed whitespace-pre-wrap break-words"
                            dir="auto"
                          >
                            {message.message}
                          </p>
                        )}

                        <div className="flex items-center justify-end text-[#667781] text-[11px] mt-1 select-none">
                          <span dir="auto">{formatMessageTimeOnly(message)}</span>
                        </div>

                        {/* WhatsApp bottom arrow on the LEFT */}
                        <WhatsAppTail isRight={false} color="#ede7fd" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Real-time Typing Indicator from other party (on the LEFT side) */}
        {isOtherTyping && (
          <div className="flex w-full justify-start" dir="ltr">
            <div className="flex gap-2.5 items-end justify-start">
              <UserAvatar avatar={`${IMAGE_BASE_URL}${selectedUser?.avatar}`} name={selectedUser?.name} />
              <div
                className="relative bg-[#ede7fd] shadow-[0_1px_2px_rgba(0,0,77,0.06)] border border-purple-200/30 flex items-center gap-1.5 py-2.5 px-3.5 rounded-2xl rounded-bl-[2px]"
              >
                <span className="w-2 h-2 rounded-full bg-[#697586] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#697586] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#697586] animate-bounce" />
                <span className="text-[#4b5565] text-xs font-normal ms-2" dir="auto">
                  {t("Typing...") || "يكتب الآن..."}
                </span>
                <WhatsAppTail isRight={false} color="#ede7fd" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected file preview pill */}
      {selectedFile && (
        <div className="px-4 py-2 bg-amber-50/70 border-t border-amber-200/50 flex items-center justify-between text-xs text-[#202939] shrink-0">
          <div className="flex items-center gap-2 truncate">
            <img src="/images/icons/document-attachment-blue.svg" alt="" className="w-4 h-4 shrink-0" />
            <span className="truncate">{selectedFile.name}</span>
            <span className="text-gray-400">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="text-red-500 hover:text-red-700 font-bold px-2 py-0.5 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Message Input & Actions */}  
      <form onSubmit={handleSendMessage} className="border-t border-[#d1d1d1] p-4 shrink-0 bg-white">
        <div className="flex gap-2 items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx"
            className="hidden"
          />

          {/* Message input */}
          <div className="relative flex-1">
            {/* Attachment button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title={t("Attach file") || "إرفاق ملف"}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
            >
              <img src="/images/icons/Attachment button.svg" alt="" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder={t("Write your message here...")}
              className="w-full rounded-3px border border-[#666B6D3D] p-5 h-14 pl-12 outline-none"
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={sending || (!inputText.trim() && !selectedFile)}
            className="rounded-3px bg-primary px-5 py-5 h-14 text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <img src="/images/icons/sendLogo.svg" alt="Send" />
          </button>
        </div>
      </form>

      {/* Floating scroll to bottom button when user scrolls up */}
      <AnimatePresence>
        {showScrollBottomBtn && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              userScrolledUpRef.current = false;
              setShowScrollBottomBtn(false);
              scrollToBottom("smooth");
            }}
            className="absolute bottom-24 end-6 z-30 w-11 h-11 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#E3E8EF] flex items-center justify-center text-primary cursor-pointer hover:bg-[#FFFDF5] hover:border-primary/40 transition-colors"
            title={t("Scroll to bottom") || "الانتقال لآخر الرسائل"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 13l-7 7m0 0l-7-7m7 7V4" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}