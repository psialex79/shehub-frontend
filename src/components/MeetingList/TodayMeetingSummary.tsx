import React from "react";
import { Typography, Space, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Meeting } from "./interfaces";
import dayjs from "dayjs";

const { Text } = Typography;

interface TodayMeetingSummaryProps {
  meetings: Meeting[];
}

const TodayMeetingSummary: React.FC<TodayMeetingSummaryProps> = ({
  meetings,
}) => {
  const currentDate = dayjs();

  const todayMeetings = meetings.filter((meeting) =>
    dayjs(meeting.date).isSame(currentDate, "day")
  );

  const pastMeetings = todayMeetings.filter((meeting) =>
    dayjs(`${meeting.date} ${meeting.time}`).isBefore(currentDate)
  ).length;
  const upcomingMeetings = todayMeetings.length - pastMeetings;

  return (
    <div
      className="glow"
      style={{
        padding: "16px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <Space direction="vertical" align="center">
        <CalendarOutlined style={{ fontSize: 24, color: "#6fa3ef" }} />
        <Text strong style={{ fontSize: 16, color: "#6fa3ef" }}>
          Сегодня
        </Text>
      </Space>

      <Space direction="vertical" align="center">
        <CheckCircleOutlined style={{ fontSize: 24, color: "#94d2bd" }} />
        <Tag color="green" style={{ fontSize: 14, padding: "2px 8px" }}>
          {pastMeetings}
        </Tag>
      </Space>

      <Space direction="vertical" align="center">
        <ClockCircleOutlined style={{ fontSize: 24, color: "#ffe066" }} />
        <Tag color="gold" style={{ fontSize: 14, padding: "2px 8px" }}>
          {upcomingMeetings}
        </Tag>
      </Space>
    </div>
  );
};

export default TodayMeetingSummary;
