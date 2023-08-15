import PostDataProvider from "@/contexts/PostContext";
// import { ToastProvider } from "@/contexts/ToastContext.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <ToastProvider> */}
      <PostDataProvider>
        <App />
      </PostDataProvider>
    {/* </ToastProvider> */}
  </React.StrictMode>
);
