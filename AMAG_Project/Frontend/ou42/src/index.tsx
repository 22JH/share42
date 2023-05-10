import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADoJ1F-rpXj_T_V714GOOJd6TZigl0y8s",
  authDomain: "ou42-ce038.firebaseapp.com",
  projectId: "ou42-ce038",
  storageBucket: "ou42-ce038.appspot.com",
  messagingSenderId: "902867957",
  appId: "1:902867957:web:9d2a8c7eaa58ef885e4ebc",
};

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
