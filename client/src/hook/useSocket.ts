import { io } from "socket.io-client";
import { useEffect } from "react";
import { Message, User } from "../shared/models";
const socket = io(process.env.REACT_APP_API_BASE_URL || "");

const useSocket = (
  updateMessages: (Message: Message) => void,
  updateNickname: (user: User) => void
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

  return { sendMessage, joinRoom, room, sendNickname };
};

export default useSocket;
