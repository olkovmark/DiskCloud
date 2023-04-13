import React, { useState } from "react";
import cs from "../styles/login.module.css";
import { Input } from "../components/input/Input";
import { login, regestration } from "../actions/user";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("test@m.com");
  const [password, setPassword] = useState("1234");
  const [isRegestration, setIsRegestration] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={cs.page}>
      <div className={cs.form}>
        <h2 className={cs.title}>
          {!isRegestration ? "Login" : "Regestration"}
        </h2>
        <Input
          value={email}
          setValue={setEmail}
          type="email"
          placeholder="Email"
        />
        <Input
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
        />
        {!isRegestration ? (
          <>
            <button
              className={cs.login_button}
              onClick={() => {
                dispatch(login(email, password));
              }}
            >
              Login
            </button>
            <button
              className={cs.regestraion_button}
              onClick={() => setIsRegestration(true)}
            >
              Regestration
            </button>
          </>
        ) : (
          <>
            <button
              className={cs.login_button}
              onClick={() => {
                regestration(email, password);
                formRefresh();
              }}
            >
              Regestration
            </button>
            <button
              className={cs.regestraion_button}
              onClick={() => {
                setIsRegestration(false);
              }}
            >
              login
            </button>
          </>
        )}
      </div>
    </div>
  );

  function formRefresh() {
    setPassword("");
    setEmail("");
  }
};
