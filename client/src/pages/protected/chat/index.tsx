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
  const [userNickname, setUserNickname] = useState<User | null>(user);
  const [typing, setTyping] = useState<string | null>(null);

  const updateMessages = (message: Message) => {
    setMessages((state) => [...state, message]);
  };

  const updateNickname = (user: User) => {
    setUserNickname(user);
  };

  const updateTyping = (content: string | null) => {
    setTyping(content);
  };

  const { sendMessage, sendNickname, onSendTyping } = useSocket(
    updateMessages,
    updateNickname,
    updateTyping
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

  // listen to typing
  useEffect(() => {
    if (content) {
      onSendTyping("typing");
    } else {
      onSendTyping(null);
    }
  }, [content, onSendTyping]);

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
        // remove command from content
        const contentWithoutCommand = content
          .replace("/nick ", "")
          .replace("/think", "")
          .replace("/oops", "");
        let newMessage: Message = {
          content: contentWithoutCommand,
          userId: user.id,
          style: null,
        };

        // commands
        if (content?.startsWith("/nick")) {
          const nickname = content.replace("/nick", "");
          if (userNickname) {
            sendNickname({ ...userNickname, nickname });
          }
        }

        if (content?.startsWith("/think")) {
          // set color to dark gray
          newMessage = {
            ...newMessage,
            content: contentWithoutCommand,
            style: "thinkMessage",
          };
        }

        if (content?.startsWith("/oops")) {
          newMessage = {
            ...newMessage,
            content: contentWithoutCommand,
            style: null,
          };
        }

        // send message through websocket
        sendMessage(newMessage);

        // Save message to database
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
          typing={typing}
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
