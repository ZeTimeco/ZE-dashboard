"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echoInstance = null;
let currentToken = null;

export function getEchoInstance(token) {
  if (typeof window === "undefined") return null;

  // If instance already exists with the same token, reuse it
  if (echoInstance && currentToken === token) {
    return echoInstance;
  }

  // If token changed, disconnect old instance
  if (echoInstance && currentToken !== token) {
    try {
      echoInstance.disconnect();
    } catch (e) {
      console.error("Error disconnecting echo instance:", e);
    }
    echoInstance = null;
  }

  window.Pusher = Pusher;

  const apiBase =
    process.env.NEXT_PUBLIC_ZETIME_API_BASE_URL?.replace(/\/$/, "") ||
    "https://api.zetime.co/api";
  const reverbKey = process.env.NEXT_PUBLIC_REVERB_APP_KEY || "9m6j7efbordx9cxpx3ao";
  const reverbHost = process.env.NEXT_PUBLIC_REVERB_HOST || "api.zetime.co";
  
  // Scheme handling:
  // If NEXT_PUBLIC_REVERB_SCHEME is 'https', use WSS on port 443 (or configured port).
  // Otherwise, use plain WS on port 8080 (or configured port).
  const scheme = process.env.NEXT_PUBLIC_REVERB_SCHEME || "http";
  const forceTLS = scheme === "https";
  const reverbPort = Number(
    process.env.NEXT_PUBLIC_REVERB_PORT || (forceTLS ? 443 : 8080)
  );

  currentToken = token;

  try {
    echoInstance = new Echo({
      broadcaster: "reverb",
      Pusher,
      key: reverbKey,
      wsHost: reverbHost,
      wsPort: reverbPort,
      wssPort: reverbPort,
      forceTLS,
      enabledTransports: forceTLS ? ["wss"] : ["ws"],
      authEndpoint: `${apiBase}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    });
  } catch (err) {
    console.error("Failed to initialize Laravel Echo:", err);
    return null;
  }

  return echoInstance;
}

export function disconnectEcho() {
  if (echoInstance) {
    try {
      echoInstance.disconnect();
    } catch (e) {
      console.error("Error disconnecting Echo:", e);
    }
    echoInstance = null;
    currentToken = null;
  }
}

export default getEchoInstance;