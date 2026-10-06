"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
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

const defaultMessages = [
  {
    id: 1,
    isMe: true,
    sender_type: "provider",
    message: "مرحبا هل ممكن مساعدة",
    time: "١١:٠٢ ص  2025/11/5",
    is_read: true,
  },
  {
    id: 2,
    isMe: false,
    sender_type: "user",
    message: "نعم تفضل",
    time: "١١:٠٢ ص  2025/11/5",
    is_read: true,
  },
  {
    id: 3,
    isMe: true,
    sender_type: "provider",
    message: "أود استفسارًا عن بعض الأدوية المتاحة؟ شكرًا لك!",
    time: "١١:٠٢ ص  2025/11/5",
    is_read: true,
  },
  {
    id: 4,
    isMe: false,
    sender_type: "user",
    message: "ممكن تسجل صوت نفهم المشكلة اكثر",
    time: "١١:٠٢ ص  2025/11/5",
    is_read: true,
  },
];

export default function ChatWindowPage({ selectedUser }) {
  const { t } = useTranslation();
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

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastTypingSentRef = useRef(0);
  const idleTypingTimerRef = useRef(null);
  const otherTypingTimerRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOtherTyping]);

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
      setTimeout(() => scrollToBottom("auto"), 50);
    }
  }, [conversationId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

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
      <div className="flex h-full items-center justify-center rounded-xl bg-white border border-[#d1d1d1]">
        <p className="text-gray-500">
          {t("Select a person to start chatting") || "اختر محادثة لبدء المراسلة"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-3px bg-white border border-[#d1d1d1] h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#d1d1d1] p-4 shrink-0 bg-white">
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
      <div className="flex-1 min-h-0 p-4 overflow-y-auto flex flex-col gap-[16px]">
        {loadingHistory && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            {t("Loading messages...") || "جاري تحميل الرسائل..."}
          </div>
        ) : (
          messages.map((message) => {
            const isMe = Boolean(message.isMe);

            return isMe ? (
              /* Sender (Me / Provider) - Right Aligned with white bubble & double green checkmarks */
              <div key={message.id} className="flex flex-col items-end w-full">
                <div className="flex gap-2 items-start justify-end max-w-[85%]">
                  <div className="bg-white shadow-[0px_0px_10px_rgba(74,87,84,0.1)] flex flex-col gap-2 items-end justify-center pt-[16px] pb-[8px] pl-[24px] pr-[16px] rounded-[3px]">
                    {/* Attachment preview if exists */}
                    {message.attachment && (
                      <div className="w-full mb-1">
                        {message.attachment.match(/\.(jpeg|jpg|png|gif|webp)$/i) ||
                        message.attachment.startsWith("blob:") ? (
                          <a
                            href={message.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block overflow-hidden rounded-3px border border-gray-100 max-h-48"
                          >
                            <img
                              src={message.attachment}
                              alt="attachment"
                              className="object-cover max-h-48 w-full"
                            />
                          </a>
                        ) : (
                          <a
                            href={message.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded bg-gray-50 text-xs text-blue-600 hover:underline"
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
                        className="text-[#0b0e11] text-[13px] text-right font-normal leading-[normal] tracking-[0.13px] whitespace-pre-wrap break-words"
                        dir="auto"
                      >
                        {message.message}
                      </p>
                    )}

                    <div className="flex items-center justify-end gap-1.5 text-[#4b5565] text-[11px] tracking-[0.11px]">
                      <span dir="auto">{message.time}</span>
                      <DoubleCheckIcon className="size-4 text-[#079455] shrink-0" />
                    </div>
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
              /* Receiver (User / Customer) - Left Aligned with lavender bubble */
              <div key={message.id} className="flex flex-col items-start w-full">
                <div className="flex gap-2 items-start justify-start max-w-[85%]">
                  <UserAvatar avatar={`${IMAGE_BASE_URL}${selectedUser?.avatar}`} name={selectedUser?.name} />
                  <div className="bg-[#ede7fd] shadow-[4px_4px_10px_rgba(0,0,77,0.04)] flex flex-col gap-2 items-start justify-center pt-[16px] pb-[8px] pl-[16px] pr-[24px] rounded-[3px]">
                    {/* Attachment preview if exists */}
                    {message.attachment && (
                      <div className="w-full mb-1">
                        {message.attachment.match(/\.(jpeg|jpg|png|gif|webp)$/i) ||
                        message.attachment.startsWith("blob:") ? (
                          <a
                            href={message.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block overflow-hidden rounded-3px border border-gray-100 max-h-48"
                          >
                            <img
                              src={message.attachment}
                              alt="attachment"
                              className="object-cover max-h-48 w-full"
                            />
                          </a>
                        ) : (
                          <a
                            href={message.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded bg-white/70 text-xs text-blue-600 hover:underline"
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
                        className="text-[#0b0e11] text-[13px] text-right font-normal leading-[normal] tracking-[0.13px] whitespace-pre-wrap break-words"
                        dir="auto"
                      >
                        {message.message}
                      </p>
                    )}

                    <div className="flex items-center justify-start text-[#4b5565] text-[11px] tracking-[0.11px]">
                      <span dir="auto">{message.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Real-time Typing Indicator from other party */}
        {isOtherTyping && (
          <div className="flex flex-col items-start w-full">
            <div className="flex gap-[8px] items-start justify-start">
              <UserAvatar avatar={`${IMAGE_BASE_URL}${selectedUser?.avatar}`} name={selectedUser?.name} />
              <div className="bg-[#ede7fd] shadow-[4px_4px_10px_rgba(0,0,77,0.04)] flex items-center gap-1.5 py-3 px-4 rounded-[3px]">
                <span className="w-2 h-2 rounded-full bg-[#697586] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#697586] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#697586] animate-bounce" />
                <span className="text-[#4b5565] text-xs font-normal ms-2">
                  {t("Typing...") || "يكتب الآن..."}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
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
      
    </div>
  );
}