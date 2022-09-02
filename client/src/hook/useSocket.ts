import { io } from "socket.io-client";
import { useEffect } from "react";
import { Message, User } from "../shared/models";
const socket = io(process.env.REACT_APP_API_BASE_URL || "");

const useSocket = (
  updateMessages: (Message: Message) => void,
  updateNickname: (user: User) => void,
  updateTyping: (content: string | null) => void
) => {
  const room = process.env.REACT_APP_ROOM_NUMBER;
  useEffect(() => {
    // join room
    if (room) {
      joinRoom();
    }

    socket.on("receive_message", (data) => {
      updateMessages(data);
    });

    socket.on("receive_nickname", (data) => {
      updateNickname(data);
    });

    socket.on("receive_typing", (data) => {
      updateTyping(data);
    });
  }, []);

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  const sendMessage = (message: Message) => {
    socket.emit("send_message", { message, room });
  };

  const sendNickname = (user: User) => {
    socket.emit("send_nickname", { user, room });
  };

  const onSendTyping = (message: string | null) => {
    socket.emit("send_typing", { message, room });
  };

  return {
    sendMessage,
    joinRoom,
    room,
    sendNickname,
    onSendTyping,
  };
};

export default useSocket;
