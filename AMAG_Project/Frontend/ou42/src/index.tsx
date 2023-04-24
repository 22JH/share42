import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      useErrorBoundary: true,
      suspense: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
    mutations: {
      useErrorBoundary: true,
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    {/* devtools */}
    <ReactQueryDevtools initialIsOpen={true} />
    <App />
  </QueryClientProvider>
);

serviceWorkerRegistration.register();
