import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

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
    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    <App />
  </QueryClientProvider>
);

serviceWorkerRegistration.register();
