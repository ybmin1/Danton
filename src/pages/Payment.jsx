import React from "react";

import styled from "styled-components";
import PaymentForm from "../components/Payment/PaymentForm";
import CheckoutItems from "../components/Payment/CheckoutItems";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Payment = () => {
  return (
    <Layout>
      <PaymentForm />
      <CheckoutItems />
    </Layout>
  );
};

export default Payment;
