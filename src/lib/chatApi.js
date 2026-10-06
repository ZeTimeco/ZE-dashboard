import API from "../../config/api";
import Cookies from "js-cookie";

export const getAuthToken = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || Cookies.get("token") || "";
};

export const getProviderId = () => {
  if (typeof window === "undefined") return null;
  const id = localStorage.getItem("provider_id");
  return id ? Number(id) : null;
};

export const formatAttachmentUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("blob:")) {
    return path;
  }
  const storageBase =
    process.env.NEXT_PUBLIC_ZETIME_STORAGE_BASE_URL?.replace(/\/$/, "") ||
    "https://api.zetime.co/storage";
  return `${storageBase}/${path.replace(/^\//, "")}`;
};

export const formatChatTime = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "م" : "ص";
    const formattedHours = (hours % 12 || 12).toString();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${formattedHours}:${minutes} ${period}  ${year}/${month}/${day}`;
  } catch {
    return dateString;
  }
};

/**
 * Fetch inbox conversation list
 * Tries unified GET /provider/chats, then falls back to legacy GET /provider/getChats
 */
export async function fetchConversations(search = "", signal) {
  const token = getAuthToken();
  const config = {
    signal,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };

  try {
    // 1. Try unified endpoint
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    const response = await API.get(`/provider/chats${query}`, config);
    const data = response.data;
    const list = data?.chats || data?.data || (Array.isArray(data) ? data : []);
    return list.map(normalizeConversation);
  } catch (err) {
    // 2. Fallback to legacy getChats from Postman
    try {
      const legacyRes = await API.get("/provider/getChats", config);
      const legacyData = legacyRes.data;
      const list =
        legacyData?.chats ||
        legacyData?.data ||
        (Array.isArray(legacyData) ? legacyData : []);
      return list.map(normalizeConversation);
    } catch {
      throw err;
    }
  }
}

/**
 * Fetch messages for a specific conversation
 * Tries unified GET /provider/chats/{id}/messages, then legacy GET /provider/fetchChat?conversation_id={id}
 */
export async function fetchChatMessages(conversationId, signal) {
  if (!conversationId) return [];
  const token = getAuthToken();
  const config = {
    signal,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };

  try {
    // 1. Try unified endpoint
    const response = await API.get(`/provider/chats/${conversationId}/messages`, config);
    const data = response.data;
    const rawMessages =
      data?.chat ||
      data?.messages ||
      data?.data ||
      (Array.isArray(data) ? data : []);
    return rawMessages.map(normalizeMessage);
  } catch (err) {
    // 2. Fallback to legacy fetchChat from Postman
    try {
      const legacyRes = await API.get(`/provider/fetchChat?conversation_id=${conversationId}`, config);
      const legacyData = legacyRes.data;
      const rawMessages =
        legacyData?.chat ||
        legacyData?.messages ||
        legacyData?.data ||
        (Array.isArray(legacyData) ? legacyData : []);
      return rawMessages.map(normalizeMessage);
    } catch {
      throw err;
    }
  }
}

/**
 * Send a message with optional attachment
 * Supports both unified /provider/chats/{id}/messages and legacy /provider/sendMessage
 */
export async function sendMessage({ conversationId, message, attachment }) {
  if (!conversationId) throw new Error("Conversation ID is required");
  const token = getAuthToken();

  const formData = new FormData();
  formData.append("conversation_id", String(conversationId));
  if (message && message.trim()) {
    formData.append("message", message.trim());
  }
  if (attachment) {
    formData.append("attachment", attachment);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    // Try sending to sendMessage (matches Postman collection)
    const response = await API.post("/provider/sendMessage", formData, config);
    const data = response.data;
    const savedMsg = data?.data || data?.message_data || data;
    return normalizeMessage(savedMsg);
  } catch (err) {
    // Fallback to unified chats/{id}/messages
    try {
      const unifiedRes = await API.post(
        `/provider/chats/${conversationId}/messages`,
        formData,
        config
      );
      const unifiedData = unifiedRes.data;
      const savedMsg = unifiedData?.data || unifiedData;
      return normalizeMessage(savedMsg);
    } catch {
      throw err;
    }
  }
}

/**
 * Send typing status to backend
 */
export async function sendTypingStatus({ conversationId, isTyping }) {
  if (!conversationId) return;
  const token = getAuthToken();
  const config = {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };

  // Try both endpoints silently
  try {
    await API.post(
      "/provider/typing-status",
      { conversation_id: conversationId, is_typing: isTyping },
      config
    );
  } catch {
    try {
      await API.post(
        `/provider/chats/${conversationId}/typing`,
        { is_typing: isTyping },
        config
      );
    } catch {
      // Ignore typing failures as per documentation
    }
  }
}

/**
 * Delete a conversation
 */
export async function deleteChat(conversationId) {
  if (!conversationId) return;
  const token = getAuthToken();
  const config = {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
  return API.get(`/delete-chat/${conversationId}`, config);
}

// Helpers
export function normalizeConversation(item) {
  if (!item) return {};
  const otherParty = item.other_party || item.user || {};
  return {
    id: item.id || item.conversation_id,
    conversation_id: item.id || item.conversation_id,
    name: otherParty.name || item.name || "مستخدم",
    avatar: otherParty.image || item.image || item.avatar || null,
    isOnline: otherParty.is_online ?? true,
    lastMessage:
      typeof item.last_message === "string"
        ? item.last_message
        : item.last_message?.message || "",
    time: formatChatTime(item.last_message_at || item.updated_at || item.created_at),
    unread: Boolean(item.unread_count > 0 || item.unread),
    unread_count: item.unread_count || 0,
    other_party: otherParty,
  };
}

export function normalizeMessage(msg) {
  if (!msg) return {};
  const currentProviderId = getProviderId();
  const isSenderProvider =
    msg.sender_type === "provider" ||
    (currentProviderId && Number(msg.sender_id) === Number(currentProviderId));

  return {
    id: msg.id || Date.now(),
    conversation_id: msg.conversation_id,
    sender_type: msg.sender_type,
    sender_id: msg.sender_id,
    message: msg.message || msg.content || "",
    attachment: msg.attachment ? formatAttachmentUrl(msg.attachment) : null,
    is_read: Boolean(msg.is_read),
    created_at: msg.created_at,
    time: formatChatTime(msg.created_at),
    isMe: isSenderProvider,
  };
}
