import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tempo que o cache vai durar antes de refetch automático
      staleTime: 1000 * 60 * 2,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <div>
    {/* Aqui damos acesso ao QueryClient para todo o App */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </div>
  // </StrictMode>
);
