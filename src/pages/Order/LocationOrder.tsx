import React, { useContext, useEffect, useRef } from "react";
import { OrderContext } from "../../context/order/orderContext";
import { IUserInfo } from "../../context/order/interfaces/IUserInfo";
import { IUserCard } from "../../context/order/interfaces/IUserCard";
import { IUserLocation } from "../../context/order/interfaces/IUserLocation";
import { CartContext } from "../../context/cart/cartContext";
import { Field, Form } from "react-final-form";

interface IFormValues {
  location: string;
}

interface IServerData {
  location: string;
  name: string;
  email: string;
  phone: string;
  card: string;
}

export const LocationOrder: React.FC = () => {
  const { userInfo, userCard, userLocation, setUserLocation } =
    useContext(OrderContext);

  const onSubmit = (values: IFormValues) => {
    setUserLocation({ location: values.location });
  };

  const isLocation = (value: string) =>
    value ? undefined : "Enter valid location";

  return (
    <section className="locationOrder">
      <h1 className="locationOrder__title">Order (3/3)</h1>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <Field validate={isLocation} name="location">
                {({ input, meta }) => (
                  <div className="form__item">
                    <label>Location:</label>
                    <input {...input} type="text" placeholder="location" />
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
