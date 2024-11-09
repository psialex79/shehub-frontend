import React, { useEffect, useState } from "react";
import MeetingList from "../MeetingList/MeetingList";
import { Meeting } from "../MeetingList/interfaces";
import { Spin, Alert } from "antd";
import { getMeetings } from "../../services/meetingsService";

const Auth: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (tg.initData) {
      authorizeUser();
    } else {
      console.error("Данные пользователя недоступны");
      setError("Данные пользователя недоступны");
      setLoading(false);
    }
  }, []);

  const authorizeUser = async () => {
    const tg = window.Telegram.WebApp;
    try {
      const response = await fetch("/api/users/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initData: tg.initDataUnsafe,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Токен:", data.token);
        localStorage.setItem("authToken", data.token);
        const meetingsResponse = await getMeetings();
        setMeetings(meetingsResponse);
      } else {
        console.error("Ошибка авторизации:", data);
        setError("Ошибка авторизации");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  const refreshMeetings = async () => {
    setLoading(true);
    try {
      const data = await getMeetings();
      setMeetings(data.meetings);
    } catch (error) {
      console.error("Ошибка при получении списка встреч:", error);
      setError("Не удалось обновить список встреч");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeeting = () => {
    refreshMeetings();
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <Spin tip="Загрузка..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <MeetingList meetings={meetings || []} onAddMeeting={handleAddMeeting} />
    </div>
  );
};

export default Auth;
