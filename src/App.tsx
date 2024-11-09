import React from "react";
import Auth from "./components/Auth/Auth";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => (
  <Layout
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(120deg, rgba(255, 182, 193, 0.3), rgba(173, 216, 230, 0.3))",
    }}
  >
    <Header
      style={{
        backgroundColor: "#FFB6C1",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ color: "#fff", margin: 14 }}>
        SheHub
      </Title>
    </Header>
    <Content
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Auth />
    </Content>
  </Layout>
);

export default App;
