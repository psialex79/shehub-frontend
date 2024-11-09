import React from "react";
import { List, Avatar, Tag, Typography, Space } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { Meeting } from "./interfaces";
import dayjs from "dayjs";

const { Text } = Typography;

const MeetingItem: React.FC<{ item: Meeting }> = ({ item }) => {
  const currentDate = dayjs();
  const meetingDate = dayjs(item.date);

  const tagProps = meetingDate.isSame(currentDate, "day")
    ? { color: "green", text: "Сегодня" }
    : meetingDate.isBefore(currentDate)
    ? { color: "grey", text: "Прошедшая" }
    : { color: "blue", text: "Будущая" };

  return (
    <List.Item
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #f0f0f0",
      }}
      onClick={() => alert(`Подробнее о встрече с ${item.invitee_name}`)}
    >
      <Avatar
        icon={<UserOutlined />}
        style={{ backgroundColor: "#FFC0CB", marginRight: 8 }}
      />
      <Space direction="vertical" style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text strong ellipsis style={{ fontSize: 14, flex: 1 }}>
            {item.invitee_name}
          </Text>
          <Tag color={tagProps.color} style={{ fontSize: 12 }}>
            {tagProps.text}
          </Tag>
          <Tag color="volcano" style={{ fontSize: 12 }}>
            {item.time.slice(0, 5)}
          </Tag>
        </div>
        <Space size="small">
          {!meetingDate.isSame(currentDate, "day") && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              <CalendarOutlined /> {item.date}
            </Text>
          )}
          <Text type="secondary" style={{ fontSize: 12 }}>
            {item.place}
          </Text>
        </Space>
      </Space>
    </List.Item>
  );
};

export default MeetingItem;
