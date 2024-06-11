import { Avatar, Card, Flex, Button } from "antd";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { userData, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar size={150} icon={<UserOutlined />} className="avatar" />
        <Typography.Title level={2} strong className="username">
          {userData.name}
        </Typography.Title>
        <Typography.Text type="secondary" strong>
          {" "}
          Email: {userData.email}
        </Typography.Text>
        <Typography.Text type="secondary">
          {" "}
          Role: {userData.role}
        </Typography.Text>
        <Button
          size="large"
          type="primary"
          className="profile-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Link to="/pdfViewer">
          <Button size="large" className="btn">
            PDF Viewer
          </Button>
        </Link>
      </Flex>
    </Card>
  );
};

export default Dashboard;
