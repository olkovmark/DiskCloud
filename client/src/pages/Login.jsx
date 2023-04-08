import React, { useState } from "react";
import cs from "../styles/login.module.css";
import { Input } from "../components/input/Input";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <button className={cs.login_button}>Login</button>
        <button className={cs.regestraion_button}>Regestration</button>
      </div>
    </div>
  );
};
