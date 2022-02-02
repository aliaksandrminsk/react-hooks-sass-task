import React, { useContext } from "react";
import { Field, Form } from "react-final-form";
import { OrderContext } from "../../context/order/orderContext";
import is from "is_js";

interface IFormValues {
  name: string;
  email: string;
  phone: string;
}

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

  const nameValidator = (value: string) =>
    value ? undefined : "Enter valid name";
  const emailValidator = (value: string) =>
    !is.email(value) ? "Please enter a valid email address" : undefined;

  const phoneValidator = (value: string) => {
    let valid = true;
    if (value && value.length === 17) {
      if (value.slice(0, 7) != "+375 (2") {
        valid = false;
      }
    } else {
      valid = false;
    }
    return valid ? undefined : `Please enter a valid phone number`;
  };

  return (
    <section className="infoOrder">
      <h1 className="infoOrder__title">Placing Order (1/3)</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, submitting }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <Field name="name" validate={nameValidator}>
                {({ input, meta }) => (
                  <div className="form__item">
                    <label>Name:</label>
                    <input {...input} type="text" placeholder="Name" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="email" validate={emailValidator}>
                {({ input, meta }) => (
                  <div className="form__item">
                    <label>Email:</label>
                    <input {...input} type="text" placeholder="Email" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="phone"
                format={formatPhoneNumber}
                validate={phoneValidator}
              >
                {({ input, meta }) => (
                  <div className="form__item">
                    <label>Phone:</label>
                    <input
                      {...input}
                      type="text"
                      placeholder="+375 (2_) _______"
                      maxLength={17}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <div className="form__button">
                <button type="submit" disabled={pristine}>
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
