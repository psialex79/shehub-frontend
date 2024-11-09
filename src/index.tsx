import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#FFB6C1",
        colorInfo: "#ADD8E6",
        colorSuccess: "#28a745",
        colorError: "#dc3545",
        colorWarning: "#ffc107",
        colorText: "#333333",
        borderRadius: 8,
      },
      components: {
        Button: {
          colorPrimary: "#FFB6C1",
        },
      },
    }}
  >
    <App />
  </ConfigProvider>
);
