import React, { useContext } from "react";
import Card from "react-credit-cards";
import { Form, Field } from "react-final-form";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../lib/cardUtils";
import { OrderContext } from "../../context/order/orderContext";

interface IFormValues {
  number: string;
  name: string;
  cvc: string;
  expiry: string;
}

export const CardOrder: React.FC = () => {
  const { setUserCard } = useContext(OrderContext);
  const onSubmit = (values: IFormValues) => {
    setUserCard({ card: values.number });
  };

  return (
    <section className="cardOrder">
      <h1 className="cardOrder__title">Order (2/3)</h1>
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <div className="form__card">
                <Card
                  number={values.number || ""}
                  name={values.name || ""}
                  expiry={values.expiry || ""}
                  cvc={values.cvc || ""}
                  focused={active as keyof IFormValues}
                />
              </div>
              <div className="form__number">
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div className="form__name">
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="form__expiry-cvc">
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                  className="form__expiry"
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                  className="form__cvc"
                />
              </div>

              <div className="form__buttons">
                <button type="submit" disabled={submitting}>
                  Pay
                </button>
                <button
                  type="button"
                  onClick={() => form.reset()}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          );
        }}
      />
    </section>
  );
};
