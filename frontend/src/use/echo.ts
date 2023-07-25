import Echo from "laravel-echo";
import Pusher from "pusher-js";

const pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  wsHost: import.meta.env.VITE_PUSHER_WS_URL,
  enabledTransports: ["ws"],
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
});

export default echo;
