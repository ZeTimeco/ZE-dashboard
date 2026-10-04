"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "reverb",

  key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,

  wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
  wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,

  forceTLS: false,

  enabledTransports: ["ws", "wss"],
});

export default echo;