import { FC } from "react";
import { Message, User } from "../shared/models";
import styles from "./message.module.css";
import classNames from "./../../node_modules/classnames/dedupe.d";
import { v4 as uuidv4 } from "uuid";

interface Props {
  user: User | null;
  messages: Message[];
  messageContentRef: React.RefObject<HTMLInputElement>;
  typing: string | null;
}

const MessageDisplay: FC<Props> = ({
  user,
  messages,
  messageContentRef,
  typing,
}) => {
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
            <span className={`${message.style && message.style}`}>
              {message.content}
            </span>
          </div>
        </div>
      ))}
      <span className={styles.typing}>{typing}</span>
    </div>
  );
};

export default MessageDisplay;
