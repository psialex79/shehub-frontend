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

    const isTodayA = dateA.isSame(currentDate, "day");
    const isTodayB = dateB.isSame(currentDate, "day");

    if (isTodayA && !isTodayB) return -1;
    if (!isTodayA && isTodayB) return 1;

    const isFutureA = dateA.isAfter(currentDate);
    const isFutureB = dateB.isAfter(currentDate);

    if (isFutureA && !isFutureB) return -1;
    if (!isFutureA && isFutureB) return 1;

    return dateA.isBefore(dateB) ? -1 : 1;
  });

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        width: "100%",
        padding: "16px",
        borderRadius: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        transition: "background 0.3s ease-in-out",
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
          renderItem={(item) => (
            <MeetingItem
              item={item}
              isHighlighted={item === sortedMeetings[0]}
            />
          )}
          locale={{
            emptyText: (
              <Empty
                description="Нет встреч"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ color: "#595959" }}
              />
            ),
          }}
          style={{
            marginBottom: "24px",
          }}
        />
      </Spin>

      <FloatButton
        icon={<PlusOutlined />}
        onClick={toggleModal}
        className="pulse"
        style={{
          backgroundColor: "rgba(133, 193, 233, 0.9)",
          color: "#fff",
        }}
      />
    </Space>
  );
};

export default MeetingList;
