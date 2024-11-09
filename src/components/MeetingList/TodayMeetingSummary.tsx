import React from "react";
import { Typography, Divider, Space, Tag } from "antd";
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
    <Space
      size="large"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "8px 8px",
        borderRadius: 8,
      }}
    >
      <Space>
        <CalendarOutlined style={{ fontSize: 18, color: "#FF69B4" }} />
        <Text strong style={{ fontSize: 16, color: "#FF69B4" }}>
          Сегодня
        </Text>
      </Space>

      <Space size="small">
        <CheckCircleOutlined style={{ fontSize: 18, color: "#52c41a" }} />
        <Tag color="green" style={{ margin: 0 }}>
          {pastMeetings}
        </Tag>
      </Space>

      <Space size="small">
        <ClockCircleOutlined style={{ fontSize: 18, color: "#1890ff" }} />
        <Tag color="blue" style={{ margin: 0 }}>
          {upcomingMeetings}
        </Tag>
      </Space>

      <Divider style={{ margin: 0 }} />
    </Space>
  );
};

export default TodayMeetingSummary;
