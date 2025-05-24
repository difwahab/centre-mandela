import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

import "./lib/i18n";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
} else {
  console.error("Impossible de trouver l'élément root dans le DOM.");
}
