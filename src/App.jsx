import { MainRouter } from "./routers/MainRouter.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "./Providers/UseContent.jsx";
import { useEffect } from "react";
import { requestNotificationPermission } from "./components/Helper/Helper.js";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Polyfill for the global object
window.global ||= window;
function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MainRouter />
        {/* <ReactQueryDevtools initialIsOpen={false} position="left" /> */}
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
