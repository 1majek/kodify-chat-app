import { io } from "socket.io-client";
import { useEffect } from "react";
import { Message } from "../shared/models";
const socket = io(process.env.REACT_APP_API_BASE_URL || "");

const useSocket = (updateMessages: (Message: Message) => void) => {
  const room = process.env.REACT_APP_ROOM_NUMBER;
  useEffect(() => {
    // join room
    if (room) {
      joinRoom(room);
    }

    socket.on("receive_message", (data) => {
      console.log("🚀 > data", data);
      updateMessages(data);
    });
  }, []);

  const joinRoom = (room: string) => {
    socket.emit("join_room", room);
  };

  const sendMessage = (message: Message) => {
    socket.emit("send_message", { message, room });
  };

  return { sendMessage, joinRoom, room };
};

export default useSocket;
