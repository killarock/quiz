import React from "react";
import classes from "./Input.scss";

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = props => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) && (
        <span>{props.errorMsg || "Введите верное значение"}</span>
      )}
    </div>
  );
};

export default Input;