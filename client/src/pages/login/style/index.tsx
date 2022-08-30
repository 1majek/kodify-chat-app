import styled from "styled-components";
import { themeColor } from "./../../../utils/theme";

export const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background-color: ${themeColor.primary[100]};
    border-radius: 0.5rem;
    padding: 5rem;
  }
  input {
    padding: 1rem;
    border: 1px solid white;
    border-radius: 0.4rem;
    color: ${themeColor.secondary[100]};
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid ${themeColor.primary[200]};
      outline: none;
    }
  }
  button {
    background-color: ${themeColor.primary[200]};
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: ${themeColor.primary[100]};
    }
  }
`;
