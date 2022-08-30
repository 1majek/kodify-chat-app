import { ToastContainer } from "react-toastify";
import { FormContainer } from "./style";

const Login = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="images/chat-logo.png" alt="logo" />
            <h1>Kodify Chat</h1>
          </div>
          <input
            type="text"
            placeholder="kodify@hotmail.com"
            name="email"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="111111"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default Login;
