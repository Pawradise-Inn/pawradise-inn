import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { NotificationProvider } from "./context/notification/NotificationProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import "./index.css";
import { ScrollUpArrowProvider } from "./context/ScrollUpArrowProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScrollUpArrowProvider>
      <NotificationProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </NotificationProvider>
    </ScrollUpArrowProvider>
  </StrictMode>
);
