import React, { useState, useCallback } from "react";
import { List, Empty, Spin, notification, Space, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MeetingItem from "./MeetingItem";
import AddMeeting from "../AddMeeting/AddMeeting";
import TodayMeetingSummary from "./TodayMeetingSummary";
import { Meeting } from "./interfaces";
import dayjs from "dayjs";

interface Props {
  meetings: Meeting[];
  loading?: boolean;
  onAddMeeting: (newMeeting: Meeting) => void;
}

const MeetingList: React.FC<Props> = ({
  meetings,
  onAddMeeting,
  loading = false,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => setModalVisible((prev) => !prev), []);

  const openNotification = (message: string) => {
    notification.success({
      message,
      placement: "topRight",
      duration: 2,
    });
  };

  const handleAddMeeting = (newMeeting: Meeting) => {
    onAddMeeting(newMeeting);
    openNotification("Встреча добавлена успешно!");
    toggleModal();
  };

  const sortedMeetings = [...meetings].sort((a, b) => {
    const currentDate = dayjs();
    const dateA = dayjs(`${a.date} ${a.time}`);
    const dateB = dayjs(`${b.date} ${b.time}`);

    const isPastA = dateA.isBefore(currentDate);
    const isPastB = dateB.isBefore(currentDate);

    if (isPastA && !isPastB) return 1;
    if (!isPastA && isPastB) return -1;

    return dateA.isAfter(dateB) ? 1 : -1;
  });

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        width: "100%",
        padding: "8px",
        background:
          "linear-gradient(120deg, rgba(255, 182, 193, 0.3), rgba(173, 216, 230, 0.3))",
      }}
    >
      <AddMeeting
        visible={isModalVisible}
        onClose={toggleModal}
        onAdd={handleAddMeeting}
      />

      <TodayMeetingSummary meetings={meetings} />

      <Spin spinning={loading} tip="Загрузка...">
        <List
          dataSource={sortedMeetings}
          renderItem={(item) => <MeetingItem item={item} />}
          locale={{
            emptyText: (
              <Empty
                description="Нет встреч"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Spin>

      <FloatButton icon={<PlusOutlined />} onClick={toggleModal} />
    </Space>
  );
};

export default MeetingList;
