import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalPayment({ cost, handleClickX }) {
  const serverUrl = "http://localhost:8000";
  const createOrder = (data) => {
    // Order is created on the server and the order id is returned
    return fetch(`${serverUrl}/my-server/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        ticket: {
          description: "Pay for football tickets",
          cost: cost,
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = (data) => {
    // Order is captured on the server and the response is returned to the browser

    return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleClickX();
      });
  };
  const initialOptions = {
    clientId:
      "AfVjnZ4-R2on3PtjIwjuRrC-Sj-Pxgtdem6J1Xo0S7Eqv1VPyG1DbIVB7ZiytEOz4BL8j7quD5mGhvI1",
    currency: "USD",
    intent: "capture",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;
