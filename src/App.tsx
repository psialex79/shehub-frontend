import React from "react";
import Auth from "./components/Auth/Auth";
import { Layout } from "antd";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#FFB6C1",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff" }}>SheHub</h1>
      </Header>
      <Content style={{ padding: "20px 50px" }}>
        <Auth />
      </Content>
    </Layout>
  );
};

export default App;
