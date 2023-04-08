import React from "react";
import cs from "./input.module.css";

export const Input = (props) => {
  console.log(props);
  return (
    <input
      value={props.value}
      onChange={(event) => props.setValue(event.target.value)}
      className={cs.input}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};
