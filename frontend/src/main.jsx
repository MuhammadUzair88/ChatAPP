import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ConversationProvider } from "./context/ConversationController.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConversationProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ConversationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
