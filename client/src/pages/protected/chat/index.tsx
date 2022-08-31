import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageDisplay from "../../../components/MessageDisplay";
import { useAuth } from "../../../hook/useAuth";
import styles from "./chat.module.css";

const Chat = () => {
  const navigate = useNavigate();
  const { localToken, logout } = useAuth();

  useEffect(() => {
    if (!localToken) {
      navigate("/");
    }
  });

  const handleSendMessage = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className={styles.chatContainer}>
      <span onClick={logout}>Logout</span>
      <div className={styles.chatBox}>
        <MessageDisplay />
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
