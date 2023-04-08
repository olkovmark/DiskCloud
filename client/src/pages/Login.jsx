import React, { useState } from "react";
import cs from "../styles/login.module.css";
import { Input } from "../components/input/Input";
import { login, regestration } from "../actions/user";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegestration, setIsRegestration] = useState(false);
  return (
    <div className={cs.page}>
      <div className={cs.form}>
        <h2 className={cs.title}>Login</h2>
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
              onClick={() => login(email, password)}
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
              onClick={() => regestration(email, password)}
            >
              Regestration
            </button>
            <button
              className={cs.regestraion_button}
              onClick={() => setIsRegestration(false)}
            >
              login
            </button>
          </>
        )}
      </div>
    </div>
  );
};
