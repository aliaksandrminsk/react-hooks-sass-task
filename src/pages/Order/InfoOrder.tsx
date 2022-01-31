import React, { useState } from "react";
import {
  IFormControl,
  IFormControls,
  IValidation,
} from "./interfaces/IFormControl";
import Input from "./Input";

export const InfoOrder: React.FC = () => {
  const [state, setState] = useState<IFormControls>({
    isFormValid: false,
    serverErrorMessage: "",
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email:",
        errorMessage: "Please enter a correct email address",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
        styles: {
          labelStyle: "form__login__label",
          inputStyle: "form__login__input",
          invalidLabelStyle: "invalid",
          errorMessage: "errorMessage",
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password:",
        errorMessage: "Enter correct password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
        styles: {
          labelStyle: "form__password__label",
          inputStyle: "form__password__input",
          invalidLabelStyle: "invalid",
          errorMessage: "errorMessage",
        },
      },
    },
  });

  const loginHandler = () => {
    console.log("loginHandler");
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const validateControl = (value: string, validation: IValidation): boolean => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    controlName: string
  ) => {
    const formControls: { [key: string]: IFormControl } = state.formControls;
    const control: IFormControl = formControls[controlName];

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    setState({
      serverErrorMessage: "",
      isFormValid,
      formControls,
    });
  };

  const renderInputs = () => {
    const formControls: { [key: string]: IFormControl } = state.formControls;
    return Object.keys(formControls).map((controlName, index) => {
      const control: IFormControl = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          validation={control.validation}
          errorMessage={control.errorMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChangeHandler(event, controlName)
          }
          styles={control.styles}
        />
      );
    });
  };

  return (
    <form onSubmit={submitHandler} className="form">
      {renderInputs()}

      <div className="form__submit">
        <input
          onClick={loginHandler}
          disabled={!state.isFormValid}
          type="button"
          value="Login"
        />
      </div>
      {state.serverErrorMessage.trim().length > 0 ? (
        <div className="form__authError">{state.serverErrorMessage}</div>
      ) : null}
    </form>
  );
};
