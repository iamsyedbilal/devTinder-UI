import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeFeed from "./pages/HomeFeed.jsx";
import Login from "./pages/Login.jsx";
import Connections from "./pages/Connections.jsx";
import Profile from "./pages/Profile.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomeFeed /> },
      { path: "login", element: <Login /> },
      { path: "connections", element: <Connections /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "16px",
            background: "#18181b",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          },
        }}
      />
    </Provider>
  </StrictMode>,
);
