import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageDisplay from "../../../components/MessageDisplay";
import { useAuth } from "../../../hook/useAuth";
import { Message, User } from "../../../shared/models";
import { axiosInstance } from "../../../utils/axios";
import styles from "./chat.module.css";
import useSocket from "./../../../hook/useSocket";

const Chat = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const messageContentRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  console.log("🚀 > content", content);
  const [userNickname, setUserNickname] = useState<User | null>(user);

  const updateMessages = (message: Message) => {
    setMessages((state) => [...state, message]);
  };

  const updateNickname = (user: User) => {
    setUserNickname(user);
  };

  const { sendMessage, sendNickname } = useSocket(
    updateMessages,
    updateNickname
  );

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
      const { value } = event.target;
      setContent(value);
    },
    [setContent]
  );

  const handleSendMessage = async () => {
    try {
      if (user) {
        // send message through websocket
        const newMessage: Message = { content, userId: user.id };
        sendMessage(newMessage);

        // Save message to database
        await axiosInstance(user?.token).post<Message>(
          "/api/message/addMessage",
          newMessage
        );

        // scroll down
        messageContentRef.current?.scrollIntoView({ behavior: "smooth" });
        setMessages([...messages, newMessage]);

        // commands
        if (content?.startsWith("/nick")) {
          const nickname = content.split(" ")[1];
          if (userNickname) {
            sendNickname({ ...userNickname, nickname });
          }
        }
      }
    } catch (error) {
      console.log("🚀 > error", error);
    }
    clearChatInput();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        <div className={styles.nicknameWrapper}>
          <span>{userNickname?.nickname}</span>
          <span className={styles.logout} onClick={logout}>
            Logout
          </span>
        </div>
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
