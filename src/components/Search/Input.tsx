import React, { Fragment } from "react";
import { useId } from "react-id-generator";
import { IFormControl } from "../interfaces/IFormControl";

interface IInputProps extends IFormControl {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  shouldValidate: boolean;
}

function isInvalid(props: IInputProps): boolean {
  return !props.valid && props.shouldValidate && props.touched;
}

const Input: React.FC<IInputProps> = (props) => {
  const inputType: React.HTMLInputTypeAttribute = props.type || "text";
  const cls = props.styles; //getting all styles
  const [htmlFor] = useId(1, "formInput");

  const labelStyles = [cls.labelStyle]; //styles for labels
  if (isInvalid(props)) {
    labelStyles.push(cls.invalidLabelStyle); //add style if there is an error.
  }

  return (
    <Fragment>
      <div className={labelStyles.join(" ")}>
        <label htmlFor={htmlFor}>{props.label}</label>
      </div>
      <div className={cls.inputStyle}>
        <input
          type={inputType}
          id={htmlFor}
          value={props.value}
          onChange={props.onChange}
        />
        {isInvalid(props) ? (
          <div className={cls.errorMessage}>
            {props.errorMessage || "Enter a correct value"}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Input;
