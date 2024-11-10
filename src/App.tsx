import React from "react";
import Auth from "./components/Auth/Auth";
import { Layout } from "antd";
import "./App.css";

const { Content } = Layout;

const App: React.FC = () => (
  <Layout className="animated-background">
    <Content
      style={{
        padding: "24px",
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        borderRadius: "16px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Auth />
    </Content>
  </Layout>
);

export default App;
