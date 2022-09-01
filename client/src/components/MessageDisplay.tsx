import { FC } from "react";
import { Message } from "../shared/models";
import styles from "./message.module.css";
import { useLoginContext } from "./../redux/selector/loginContext";

interface Props {
  messages: Message[];
}

const MessageDisplay: FC<Props> = ({ messages }) => {
  const { user } = useLoginContext();
  return (
    <div className={styles.messageContent}>
      {messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
    </div>
  );
};

export default MessageDisplay;
