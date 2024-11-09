import React, { useState } from "react";
import { List, Avatar, Tag, Card, Empty, Skeleton, Button } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Meeting } from "./interfaces";
import AddMeeting from "../AddMeeting/AddMeeting";

interface Props {
  meetings: Meeting[];
  loading?: boolean;
  onAddMeeting: () => void;
}

const MeetingList: React.FC<Props> = ({
  meetings,
  loading = false,
  onAddMeeting,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showAddMeetingModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={showAddMeetingModal}
      >
        Добавить встречу
      </Button>

      <AddMeeting
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAdd={onAddMeeting}
      />

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={meetings}
        locale={{
          emptyText: loading ? (
            <Skeleton active />
          ) : (
            <Empty description="У вас пока нет встреч" />
          ),
        }}
        renderItem={(item) => (
          <List.Item>
            <Card hoverable>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: "#FFB6C1" }}
                    icon={<UserOutlined />}
                  />
                }
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: "1.2em", fontWeight: 500 }}>
                      {item.invitee_name}
                    </span>
                    {item.isNew && (
                      <Tag color="red" style={{ marginLeft: 8 }}>
                        Новая
                      </Tag>
                    )}
                  </div>
                }
                description={
                  <div>
                    <p>
                      <EnvironmentOutlined
                        style={{ marginRight: 8, color: "#1890ff" }}
                      />
                      Место: {item.place}
                    </p>
                    <p>
                      <ClockCircleOutlined
                        style={{ marginRight: 8, color: "#1890ff" }}
                      />
                      Время: {item.time}
                    </p>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MeetingList;
