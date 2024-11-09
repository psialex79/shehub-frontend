import React, { useEffect, useState } from "react";
import MeetingList from "../MeetingList/MeetingList";
import { Meeting } from "../MeetingList/interfaces";
import { Spin, Alert, message } from "antd";
import { getMeetings } from "../../services/meetingsService";

const Auth: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.initData ? authorizeUser() : setError("Данные пользователя недоступны");
  }, []);

  const authorizeUser = async () => {
    try {
      const response = await fetch("/api/users/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initData: window.Telegram.WebApp.initDataUnsafe,
        }),
      });

      if (!response.ok) throw new Error("Ошибка авторизации");
      const { token } = await response.json();
      localStorage.setItem("authToken", token);
      refreshMeetings();
    } catch (error) {
      message.error("Ошибка сети или авторизации");
      setError("Ошибка сети или авторизации");
    }
  };

  const refreshMeetings = async () => {
    setLoading(true);
    try {
      const data = await getMeetings();
      setMeetings(data);
    } catch {
      setError("Не удалось загрузить список встреч");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Spin
          tip="Загрузка..."
          size="large"
          style={{ display: "block", margin: "auto" }}
        />
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <MeetingList meetings={meetings || []} onAddMeeting={refreshMeetings} />
      )}
    </div>
  );
};

export default Auth;
