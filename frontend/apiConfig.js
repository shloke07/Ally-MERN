// apiConfig.js
let baseUrl = "https://ally-chat-express-app.onrender.com";
let socketUrl = "https://ally-chat-express-app.onrender.com";

// if (import.meta.env.VITE_NODE_ENV === "production") {
//   baseUrl = "your-deployed-URL";
//   socketUrl = "wss://your-deployed-url";
// } else {
//   baseUrl = "http://localhost:8000";
//   socketUrl = "ws://localhost:8000";
// }

export { baseUrl, socketUrl };