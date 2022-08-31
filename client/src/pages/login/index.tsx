import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { useAppDispatch } from "../../hook/useRedux";
import { loginRequest } from "../../redux/actions/loginContext";
import { useLoginContext } from "../../redux/selector";
import { LoginInput } from "../../shared/validators/auth";
import styles from "./login.module.css";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { localToken } = useAuth();
  const { loading, error, token } = useLoginContext();

  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

  // redirect to chat page when login is successfull
  useEffect(() => {
    if (localToken) {
      navigate("/chat");
    }
  }, [localToken, navigate]);

  // Validate user inputs
  const inputValidation = LoginInput.safeParse(loginInput);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInput((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(loginRequest(loginInput));
    } catch (error) {}
    navigate("/chat");
  };

  return (
    <section className={styles.section}>
      <form
        className={styles.form}
        action="sumbit"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className={styles.brand}>
          <img src="images/chat-logo.png" alt="logo" />
          <h1>Kodify Chat</h1>
        </div>

        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="kodify@hotmail.com"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          {!inputValidation.success &&
            inputValidation.error.formErrors.fieldErrors["email"] && (
              <small>Invalid email</small>
            )}

          <input
            type="password"
            placeholder="111111"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {!inputValidation.success &&
            inputValidation.error.formErrors.fieldErrors["password"] && (
              <small>Password required</small>
            )}
        </div>

        <button type="submit" disabled={!inputValidation.success}>
          Login
        </button>
        {error && <span>{error}</span>}
        {loading && <span>Loading</span>}
        {token && <span>Logged in successfully</span>}
      </form>
    </section>
  );
};

export default Login;
