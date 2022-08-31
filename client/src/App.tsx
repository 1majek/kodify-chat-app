import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./pages/protected/chat";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
