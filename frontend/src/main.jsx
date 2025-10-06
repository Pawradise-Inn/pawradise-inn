import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { NotificationProvider } from "./components/notification/NotificationProvider.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
