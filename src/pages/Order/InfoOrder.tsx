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

  const normalizePhone = (value: string) => {
    if (!value) return "";
    const onlyNums = value.replace(/[^\d]/g, "");
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6)
      return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}`;

    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 5)} ${onlyNums.slice(
      5,
      12
    )}`;
  };

  const isName = (value: string) => (value ? undefined : "Enter valid name");
  const isEmail = (value: string) =>
    !is.email(value) ? "Please enter a valid email address" : undefined;
  const isPhoneNumber = (size: number) => (value: string) =>
    value && value.length === size
      ? undefined
      : `Please enter a valid phone number`;

  return (
    <section className="infoOrder">
      <h1 className="infoOrder__title">Order (1/3)</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <Field validate={isName} name="name">
                {({ input, meta }) => (
                  <div className="form__item">
                    <label>Name:</label>
                    <input {...input} type="text" placeholder="Name" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field name="email" validate={isEmail}>
                {({ input, meta }) => (
                  <div className="form__item">
                    <label>Email</label>
                    <input {...input} type="text" placeholder="Email" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field
                name="phone"
                parse={normalizePhone}
                validate={isPhoneNumber(16)}
              >
                {({ input, meta }) => (
                  <div className="form__item">
                    <label>Phone</label>
                    <input
                      {...input}
                      type="text"
                      placeholder="(375) 29 9999999"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <div className="form__button">
                <button type="submit" disabled={submitting}>
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
