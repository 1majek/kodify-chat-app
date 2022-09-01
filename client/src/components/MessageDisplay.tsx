import { FC } from "react";
import { Message } from "../shared/models";
import styles from "./message.module.css";

interface Props {
  messages: Message[];
}

const MessageDisplay: FC<Props> = ({ messages }) => {
  return <div className={styles.messageContent}>Messages</div>;
};

export default MessageDisplay;
