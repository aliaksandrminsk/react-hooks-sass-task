import React, { useContext } from "react";
import { Field, Form } from "react-final-form";
import { OrderContext } from "../../context/order/orderContext";
import is from "is_js";

interface IFormValues {
  name: string;
  email: string;
  phone: string;
}

type Validator = (value: string) => string | undefined;

export const InfoOrder: React.FC = () => {
  const { setUserInfo } = useContext(OrderContext);

  const onSubmit = (values: IFormValues) => {
    setUserInfo({
      name: values.name,
      email: values.email,
      phone: values.phone,
    });
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    const onlyNums = value.replace(/[^\d]/g, "");
    if (onlyNums.length <= 3) return "+" + onlyNums;
    if (onlyNums.length <= 5)
      return `+${onlyNums.slice(0, 3)} (${onlyNums.slice(3, 5)}`;

    return `+${onlyNums.slice(0, 3)} (${onlyNums.slice(3, 5)}) ${onlyNums.slice(
      5,
      12
    )}`;
  };

  const required = (value: string) => {
    if (!value || value === "") {
      return "This field is required";
    }
    return undefined;
  };

  const emailValidator = (value: string) =>
    !is.email(value) ? "Please enter a valid email address" : undefined;

  const phoneValidator = (value: string) => {
    let valid = true;
    if (value && value.length === 17) {
      if (value.slice(0, 4) != "+375") {
        valid = false;
      }
    } else {
      valid = false;
    }
    return valid ? undefined : `Please enter a valid phone number`;
  };

  const composeValidators =
    (...validators: Array<Validator>) =>
    (value: string) =>
      validators.reduce<string | undefined>(
        (error, validator) => error || validator(value),
        undefined
      );

  return (
    <section className="infoOrder">
      <h1 className="infoOrder__title">Placing Order (1/3)</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, valid, pristine }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <Field name="name" validate={required}>
                {({ input, meta }) => (
                  <div className="form__field">
                    <label>Name:</label>
                    <input {...input} type="text" placeholder="Name" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="email"
                validate={composeValidators(required, emailValidator)}
              >
                {({ input, meta }) => (
                  <div className="form__field">
                    <label>Email:</label>
                    <input {...input} type="text" placeholder="Email" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="phone"
                format={formatPhoneNumber}
                validate={composeValidators(required, phoneValidator)}
              >
                {({ input, meta }) => (
                  <div className="form__field">
                    <label>Phone:</label>
                    <input
                      {...input}
                      type="text"
                      placeholder="+375 (__) _______"
                      maxLength={17}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <div>
                <button
                  type="submit"
                  disabled={pristine || !valid}
                  className="normalButton"
                >
                  Next
                </button>
              </div>
            </form>
          );
        }}
      />
    </section>
  );
};
