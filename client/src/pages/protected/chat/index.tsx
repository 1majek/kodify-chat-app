import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth";

const Chat = () => {
  const navigate = useNavigate();
  const { localToken, logout } = useAuth();

  useEffect(() => {
    if (!localToken) {
      navigate("/");
    }
  });

  return (
    <div>
      <span onClick={logout}>Logout</span>
      <h1>Chat app</h1>
    </div>
  );
};

export default Chat;
