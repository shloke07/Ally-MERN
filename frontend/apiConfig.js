// apiConfig.js
let baseUrl;
let socketUrl;

if (import.meta.env.VITE_NODE_ENV === "production") {
  baseUrl = "your-deployed-URL";
  socketUrl = "wss://your-deployed-url";
} else {
  baseUrl = "http://localhost:8000";
  socketUrl = "ws://localhost:8000";
}

export { baseUrl, socketUrl };