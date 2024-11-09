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

interface AddMeetingProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const AddMeeting: React.FC<AddMeetingProps> = ({ visible, onClose, onAdd }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const date = values.date.format("YYYY-MM-DD");
        const time = values.time.format("HH:mm:ss");

        try {
          await addMeeting({
            invitee_name: values.invitee_name,
            place: values.place,
            date: date,
            time: time,
          });
          message.success("Встреча успешно добавлена!");
          form.resetFields();
          onAdd();
          onClose();
        } catch (error: any) {
          console.error("Ошибка при добавлении встречи:", error);
          message.error("Не удалось добавить встречу.");
        } finally {
          setLoading(false);
        }
      })
      .catch((info) => {
        console.log("Валидация не прошла:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Добавить новую встречу"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Добавить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="add_meeting_form">
        <Form.Item
          name="invitee_name"
          label="Имя приглашённого"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите имя приглашённого",
            },
          ]}
        >
          <Input placeholder="Введите имя приглашённого" />
        </Form.Item>

        <Form.Item
          name="place"
          label="Место"
          rules={[
            { required: true, message: "Пожалуйста, введите место встречи" },
          ]}
        >
          <Input placeholder="Введите место встречи" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Дата"
          rules={[
            { required: true, message: "Пожалуйста, выберите дату встречи" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="time"
          label="Время"
          rules={[
            { required: true, message: "Пожалуйста, выберите время встречи" },
          ]}
        >
          <TimePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMeeting;
