import { FC } from "react";
import { Message, User } from "../shared/models";
import styles from "./message.module.css";
import classNames from "./../../node_modules/classnames/dedupe.d";
import { v4 as uuidv4 } from "uuid";

interface Props {
  user: User | null;
  messages: Message[];
  messageContentRef: React.RefObject<HTMLInputElement>;
}

const MessageDisplay: FC<Props> = ({ user, messages, messageContentRef }) => {
  const chatStyle = (userId: number) =>
    classNames(
      styles.bubbleChat,
      user?.id === userId ? styles.sender : styles.receiver
    );

  if (!user) {
    return null;
  }

  return (
    <div className={styles.messageContent}>
      {messages.map((message) => (
        <div ref={messageContentRef} key={uuidv4()} className={styles.message}>
          <div className={chatStyle(message.userId)}>
            <span>{message.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
