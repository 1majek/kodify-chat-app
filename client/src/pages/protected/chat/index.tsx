import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageDisplay from "../../../components/MessageDisplay";
import { useAuth } from "../../../hook/useAuth";
import { Message } from "../../../shared/models";
import { axiosInstance } from "../../../utils/axios";
import styles from "./chat.module.css";
import useSocket from "./../../../hook/useSocket";

const Chat = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const messageContentRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");

  const updateMessages = (message: Message) => {
    setMessages((state) => [...state, message]);
  };

  const { sendMessage } = useSocket(updateMessages);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [navigate, user]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (user?.token) {
          const { data } = await axiosInstance(user.token).get<Message[]>(
            "/api/message/getMessages"
          );
          setMessages(data);
        }
      } catch (error) {
        console.log("🚀 > error", error);
      }
    };
    fetchMessages();
  }, [user?.token]);

  useEffect(() => {
    messageContentRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const clearChatInput = () => {
    setContent("");
  };

  const handleOnChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContent(event.target.value);
    },
    [setContent]
  );

  const handleSendMessage = async () => {
    try {
      if (user) {
        const newMessage: Message = { content, userId: user.id };
        sendMessage(newMessage);
        await axiosInstance(user?.token).post<Message>(
          "/api/message/addMessage",
          newMessage
        );
        // scroll down
        messageContentRef.current?.scrollIntoView({ behavior: "smooth" });
        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.log("🚀 > error", error);
    }
    clearChatInput();
  };

  return (
    <div className={styles.chatContainer}>
      <span onClick={logout}>Logout</span>
      <div className={styles.chatBox}>
        <MessageDisplay
          user={user}
          messages={messages}
          messageContentRef={messageContentRef}
        />
        <div className={styles.inputWrapper}>
          <input
            type="text"
            onChange={handleOnChangeInput}
            value={content}
            className={styles.chatInput}
          />
          <button onClick={handleSendMessage} className={styles.sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
