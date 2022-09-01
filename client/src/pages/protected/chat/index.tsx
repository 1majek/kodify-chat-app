import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageDisplay from "../../../components/MessageDisplay";
import { useAuth } from "../../../hook/useAuth";
import { Message } from "../../../shared/models";
import { axiosInstance } from "../../../utils/axios";
import styles from "./chat.module.css";

const Chat = () => {
  const navigate = useNavigate();
  const { localToken, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!localToken) {
      navigate("/");
    }
  });

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (localToken) {
          const { data } = await axiosInstance(localToken).get<Message[]>(
            "/api/message/getMessages"
          );
          setMessages(data);
        }
      } catch (error) {
        console.log("🚀 > error", error);
      }
    };
    fetchMessages();
  }, [localToken]);

  const handleSendMessage = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className={styles.chatContainer}>
      <span onClick={logout}>Logout</span>
      <div className={styles.chatBox}>
        <MessageDisplay messages={messages} />
        <div className={styles.inputWrapper}>
          <input
            onChange={handleSendMessage}
            className={styles.chatInput}
            type="text"
          />
          <button className={styles.sendBtn}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
