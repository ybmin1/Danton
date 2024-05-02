import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid4 } from "uuid";

const Layout = styled.div`
  width: 100%;
  margin-top: 90px;
  padding: 40px 0 0 35px;
  background-color: #fafafa;
`;

const ItemList = styled.div``;

const BoxItem = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  position: relative;
`;

const ImgStyle = styled.img`
  width: 68px;
  height: 68px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  object-fit: "cover";
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
`;

const LeftDescription = styled.div`
  width: 300px;
`;

const Text = styled.div`
  font-size: 0.875rem;
  white-space: nowrap;
  margin: 2px 0 2px 0;
`;

const TextSize = styled.div`
  color: grey;
  font-size: 0.75rem;
`;

const PriceWrapper = styled.div``;

const ItemQty = styled.div`
  width: 20px;
  height: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  position: absolute;
  top: 0px;
  left: 55px;
`;

const CheckoutWrapper = styled.div`
  padding-top: 30px;
`;

const SubTotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 398.2px;
  font-size: 0.875rem;
  margin: 5px 0 5px 0;
`;

const ShippingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 398.2px;
  font-size: 0.875rem;
  margin: 5px 0 5px 0;
`;

const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 398.2px;
  font-size: 1.25rem;
  margin: 12px 0 12px 0;
`;

const TotalUsd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 73px;
`;

const UsdText = styled.div`
  font-size: 0.75rem;
  color: grey;
`;

const CheckoutItems = () => {
  const cartItems = useSelector((state) => state.cartInfo.cartItems);

  return (
    <Layout>
      <ItemList>
        {cartItems.map((item) => (
          <BoxItem key={uuid4()}>
            <ImgStyle src={item.main_img} />
            <Description>
              <LeftDescription>
                <Text>{item.name}</Text>
                <TextSize>
                  {item.color} / {item.size}
                </TextSize>
              </LeftDescription>

              <PriceWrapper>
                <Text>${item.price}</Text>
              </PriceWrapper>

              <ItemQty>{item.quantity}</ItemQty>
            </Description>
          </BoxItem>
        ))}
      </ItemList>
      <CheckoutWrapper>
        <SubTotalWrapper>
          <div>Subtotal</div>
          <div>${cartItems.totalAmount}</div>
        </SubTotalWrapper>
        <ShippingWrapper>
          <div>Shipping</div>
          <div>Free</div>
        </ShippingWrapper>
        <TotalWrapper>
          <div>Total</div>

          <TotalUsd>
            <UsdText>USD </UsdText>
            <div>${cartItems.totalAmount}</div>
          </TotalUsd>
        </TotalWrapper>
      </CheckoutWrapper>
    </Layout>
  );
};

export default CheckoutItems;
