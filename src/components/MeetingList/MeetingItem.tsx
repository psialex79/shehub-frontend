import React from "react";
import { List, Avatar, Tag, Typography, Space } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { Meeting } from "./interfaces";
import dayjs from "dayjs";

const { Text } = Typography;

const MeetingItem: React.FC<{ item: Meeting; isHighlighted: boolean }> = ({
  item,
  isHighlighted,
}) => {
  const currentDate = dayjs();
  const meetingDateTime = dayjs(`${item.date} ${item.time}`);
  const meetingDate = dayjs(item.date);

  const tagProps =
    meetingDate.isSame(currentDate, "day") &&
    meetingDateTime.isBefore(currentDate)
      ? { color: "grey", text: "Прошедшая" }
      : meetingDate.isSame(currentDate, "day")
      ? { color: "green", text: "Сегодня" }
      : meetingDate.isBefore(currentDate)
      ? { color: "grey", text: "Прошедшая" }
      : { color: "blue", text: "Будущая" };

  return (
    <List.Item
      className={isHighlighted ? "highlight" : ""}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "12px",
        border: isHighlighted ? "2px solid transparent" : "1px solid #e0e0e0",
        boxShadow: isHighlighted
          ? "0 6px 16px rgba(255, 140, 0, 0.2)"
          : "0 4px 12px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#ffffff",
        cursor: "pointer",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      <Avatar
        icon={<UserOutlined />}
        style={{ backgroundColor: "#a0d911", marginRight: 16 }}
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
          <Text
            strong
            ellipsis
            style={{ fontSize: 16, flex: 1, color: "#333" }}
          >
            {item.invitee_name}
          </Text>
          <Tag color={tagProps.color} style={{ fontSize: 12 }}>
            {tagProps.text}
          </Tag>
          <Tag color="purple" style={{ fontSize: 12 }}>
            {item.time.slice(0, 5)}
          </Tag>
        </div>
        <Space size="small">
          {!meetingDate.isSame(currentDate, "day") && (
            <Text type="secondary" style={{ fontSize: 12, color: "#6d6d6d" }}>
              <CalendarOutlined /> {item.date}
            </Text>
          )}
          <Tag color="cyan" style={{ fontSize: 12 }}>
            {item.place}
          </Tag>
        </Space>
      </Space>
    </List.Item>
  );
};

export default MeetingItem;
