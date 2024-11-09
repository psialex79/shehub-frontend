import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  message,
} from "antd";
import { addMeeting } from "../../services/meetingsService";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";

interface AddMeetingProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (newMeeting: any) => void;
}

const AddMeeting: React.FC<AddMeetingProps> = ({ visible, onClose, onAdd }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const meeting = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
      };

      setLoading(true);
      const newMeeting = await addMeeting(meeting);
      message.success("Встреча добавлена успешно!");
      form.resetFields();
      onAdd(newMeeting);
      onClose();
    } catch {
      message.error("Не удалось добавить встречу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Новая встреча"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Добавить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="add_meeting_form">
        <Form.Item
          name="invitee_name"
          label="Имя"
          rules={[{ required: true, message: "Введите имя приглашенного" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Имя приглашенного" />
        </Form.Item>
        <Form.Item
          name="place"
          label="Место"
          rules={[{ required: true, message: "Введите место встречи" }]}
        >
          <Input prefix={<EnvironmentOutlined />} placeholder="Место встречи" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Дата"
          rules={[{ required: true, message: "Выберите дату встречи" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="time"
          label="Время"
          rules={[{ required: true, message: "Выберите время встречи" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMeeting;
