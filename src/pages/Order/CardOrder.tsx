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

export default function CardOrder() {
  const { setUserCard } = useContext(OrderContext);
  const onSubmit = (values: IFormValues) => {
    setUserCard({ card: values.number });
  };

  return (
    <section className="cardOrder">
      <h1 className="cardOrder__title">Placing Order (2/3)</h1>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: any = {};
          if (!/^[\d| ]{16,22}$/.test(values.number)) {
            errors.number = "Please enter a valid card number";
          }
          if (!values.name) {
            errors.name = "Please enter a valid name";
          }
          if (!/^\d\d\/\d\d$/.test(values.expiry)) {
            errors.expiry = "Please enter a valid expiry";
          }
          if (!/^\d{3}$/.test(values.cvc)) {
            errors.cvc = "Please enter a valid cvc";
          }
          return Object.keys(errors).length ? errors : {};
        }}
        render={({ handleSubmit, form, pristine, valid, values, active }) => {
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
                <Field name="number" format={formatCreditCardNumber}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Card Number"
                        maxLength={22}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="form__name">
                <Field name="name">
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Name"
                        maxLength={50}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="form__expiry-cvc">
                <Field
                  name="expiry"
                  format={formatExpirationDate}
                  className="form__expiry"
                >
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Valid Thru"
                        maxLength={5}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="cvc" format={formatCVC} className="form__cvc">
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="CVC"
                        maxLength={3}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className="form__buttons">
                <div>
                  <button
                    type="submit"
                    disabled={!valid}
                    className="smallButton"
                  >
                    Next
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="smallButton"
                    onClick={() => form.reset()}
                    disabled={pristine}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      />
    </section>
  );
}
