import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Paypal = () => {
  const paypal = useRef();
  const cartItems = useSelector((state) => state.cartInfo.cartItems);

  // 주문 정보를 서버로 전송하는 함수
  const sendPaymentInfoToServer = async (paymentInfo) => {
    try {
      // 서버로 결제 정보를 POST 요청
      const response = await fetch("/api/carts/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to send payment information to the server");
      }

      return await response.json(); // 성공적으로 보내진 경우 응답 데이터 반환
    } catch (error) {
      throw new Error("Failed to send payment information to the server");
    }
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        //데이터 받아서 채우기
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Danton",
                amount: {
                  currency_code: "USD",
                  value: cartItems.totalAmount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);

          // 주소를 받아올 수 있는 함수로부터 주소 정보를 가져옴. 에러나서 일단 주석처리
          // const address = getAddress(); // getAddress 가 맞는지확인필요

          // 결제 정보 서버로 전송
          try {
            await sendPaymentInfoToServer({
              orderId: order.id,
              payerId: order.payer.payer_id,
              paymentId: order.purchase_units[0].payments.captures[0].id,
              amount: order.purchase_units[0].amount.value,
              status: order.status,

              orderDate: new Date(), // 주문 날짜
            });
            alert("결제가 완료되었습니다.");
          } catch (error) {
            console.error("Failed to send payment information:", error.message);
            alert("결제 정보를 서버로 전송하는 도중 오류가 발생했습니다.");
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <>
      <div ref={paypal}></div>
    </>
  );
};

export default Paypal;
