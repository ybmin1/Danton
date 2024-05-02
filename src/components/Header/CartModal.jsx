import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { v4 as uuid4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import cartInfo, {
  decrement,
  increment,
  setInitialState,
} from "../../store/modules/cartInfo";
import Paypal from "../Payment/Paypal";

const Layout = styled.div`
  position: fixed;
  right: ${(props) => (props.$isModalOpen ? "0" : "-200%")};
  opacity: ${(props) => (props.$isModalOpen ? "1" : "0")};
  top: 0;
  width: 500px;
  height: 100%;
  z-index: 1500;
  transition: all 0.5s;
  background-color: var(--color-white);
  padding: 100px 0 350px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div`
  ${(props) => {
    if (props.$isModalOpen) {
      return `
        > div:nth-child(1) {
          transition: all 1.2s;
          opacity: 1;
          transform: translateY(0);
        }

        > div:nth-child(2) {
          transition: all 1.5s;
          opacity: 1;
          transform: translateY(0);
        }
      `;
    } else {
      return `
        > div {
          opacity: 0;
          transform: translateY(100px);
        }
      `;
    }
  }}
`;

const CartWrapper = styled.div`
  height: 100px;
  width: 450px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-lightgray);
  position: fixed;
  top: 0px;
  background-color: white;
  overflow: hidden;
`;

const CartItemsEmpty = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin: 40px 0 0 50px;
  color: grey;
`;

const CartText = styled.div`
  font-size: 1.875rem;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px 0px 20px 0px;
  margin-left: 30px;
`;

const BoxItem = styled.div`
  display: flex;
  font-size: 1.25rem;
  margin-bottom: 15px;
  padding-top: 20px;
`;

const Description = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin-left: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
  height: 30px;
  border: 1px solid var(--color-lightgray);
  font-size: 1.125;
  color: grey;
  margin-top: 15px;
  padding-bottom: 3px;
`;

const BtnPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QtyControlBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
`;

const Text = styled.div`
  margin: 10px 0 10px 0;
  font-size: 1.125rem;
`;

const TextSize = styled.div`
  font-size: 1rem;
`;

const CheckoutWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: white;
  height: 350px;
  width: 450px;
  border-top: 1px solid var(--color-lightgray);
  position: fixed;
  bottom: 0px;
  overflow: hidden;
`;

const SubTotalWrapper = styled.div`
  width: 450px;
  margin: 8px 0 12px 0;
  color: grey;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
`;

const ExtraCostDesc = styled.div`
  width: 450px;
  margin: 8px 0 8px 0;
  font-size: 1rem;
  color: grey;
  white-space: nowrap; //텍스트 한줄로
`;

const BtnCheckout = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  margin: 10px 0 15px 0;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const PaypalWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const CartOverlay = ({ isModalOpen, handleModal }) => {
  //컴포넌트에서 Action을 Dispatch
  const dispatch = useDispatch();

  //서버에서 받아온 데이터?
  //const cartItems = useSelector((state) => state.cartInfo.cartItems);
  //mockdata
  const cartItems = [
    {
      itemId: 1,
      name: "WOOL LIKE POLYESTER 6PANEL CAP",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241U303-0004_color_065_1800x1800.jpg?v=1707815180",
      color: "red",
      size: "34",
      price: 75,
      count: 2,
    },
    {
      itemId: 2,
      name: "MEN'S LONG SLEEVE SWEAT T-SHIRT",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241M103-0008_color_012_1800x1800.jpg?v=1709017280",
      color: "black",
      size: "S",
      price: 106,
      count: 1,
    },
  ];

  useEffect(() => {
    // 서버에 요청하여 카트 정보 받아오기
    const fetchInitialCartData = async () => {
      try {
        // 서버에 GET 요청 보내기
        const response = await fetch("/api/carts/cart/{userId}");
        if (!response.ok) {
          throw new Error("Failed to fetch initial cart data");
        }
        const initialCartData = await response.json(); // 응답 데이터 파싱

        //total amount 계산 및 추가
        //total amount 계산
        const eachItemTotalAmountArr = initialCartData.cartItems.map(
          (item) => item.count * item.price
        );
        const totalAmountCalculated = eachItemTotalAmountArr.reduce(
          (total, amoutPerItem) => total + amoutPerItem,
          0
        );
        // totalAmount가 추가된 updatedCartData를 생성
        const updatedcartData = {
          ...initialCartData,
          totalAmount: totalAmountCalculated,
        };

        // 받아온 데이터를 사용하여 카트 업데이트 액션 디스패치
        dispatch(setInitialState(updatedcartData));
      } catch (error) {
        console.error("Failed to fetch initial cart data:", error.message);
      }
    };

    fetchInitialCartData(); // 함수 호출하여 초기 카트 데이터 받아오기
  }, []); // 처음 한번만 렌더링

  //수량버튼 클릭시 카트정보 업데이트 요청
  const handleUpdateCart = async () => {
    try {
      await saveCartToDB(cartItems);
      console.log("카트 정보 업데이트 요청 성공");
    } catch (error) {
      console.error(
        "카트 정보 업데이트 요청 중 오류가 발생했습니다.에러메세지:",
        error.message
      );
    }
  };

  //수량 업데이트된 카트 정보를 서버에 저장.
  const saveCartToDB = async (cartItems) => {
    try {
      const { itemId, color, size, quantity } = cartItems; // 카트 아이템 정보 추출
      //수량이 1 이상인 경우 PUT요청 보내기
      if (quantity >= 1) {
        const requestBody = {
          itemId,
          color,
          size,
          quantity,
        };
        const response = await fetch("/api/cart/items/{cartItemId}", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to save cart data to the server");
        }
        return await response.json(); //저장 성공시 응답 데이터 반환
      } else if (quantity < 1) {
        // 수량이 1보다 작은 경우 DELETE 요청 보내기
        const response = await fetch(`/api/cart/items/{cartItemId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete cart item from the server");
        }
        return "Cart item deleted successfully";
      }
    } catch (error) {
      throw new Error("Failed to save cart data to the server");
    }
  };

  return (
    <Layout $isModalOpen={isModalOpen}>
      <List $isModalOpen={isModalOpen}>
        <CartWrapper>
          <CartText>Cart</CartText>
        </CartWrapper>

        {cartItems.length === 0 ? (
          <CartItemsEmpty>
            <div>Your cart is currently empty.</div>
          </CartItemsEmpty>
        ) : (
          <>
            <ItemList>
              {cartItems.map((item) => (
                <BoxItem key={uuid4()}>
                  <img
                    src={item.main_img}
                    width="130px"
                    height="130px"
                    style={{ objectFit: "cover" }}
                  />
                  <Description>
                    <Text>{item.name}</Text>
                    <TextSize>
                      {item.color}/{item.size}
                    </TextSize>

                    <BtnPriceWrapper>
                      <ButtonBox>
                        <QtyControlBtn
                          onClick={async () => {
                            //수량감소
                            dispatch(decrement(item.itemId));
                            //업데이트된 카트 정보를 DB에 저장
                            await handleUpdateCart();
                          }}
                        >
                          -
                        </QtyControlBtn>
                        {item.count}
                        <QtyControlBtn
                          onClick={async () => {
                            //수량증가
                            dispatch(increment(item.itemId));
                            //업데이트된 카트 정보를 DB에 저장
                            await handleUpdateCart();
                          }}
                        >
                          +
                        </QtyControlBtn>
                      </ButtonBox>
                      <Text>${item.price}</Text>
                    </BtnPriceWrapper>
                  </Description>
                </BoxItem>
              ))}
            </ItemList>
            <CheckoutWrapper>
              <SubTotalWrapper>
                <div>SUBTOTAL</div>
                <div>${cartItems.totalAmount}</div>
              </SubTotalWrapper>
              <ExtraCostDesc>
                Shipping, taxes, and discount codes calculated at checkout.
              </ExtraCostDesc>

              <BtnCheckout href="http://localhost:3000/payment">
                <div>Check Out</div>
              </BtnCheckout>

              <PaypalWrapper>
                <Paypal />
              </PaypalWrapper>
            </CheckoutWrapper>
          </>
        )}
      </List>
    </Layout>
  );
};

export default function CartModal({ isModalOpen, handleModal }) {
  return (
    <>
      {ReactDOM.createPortal(
        <CartOverlay isModalOpen={isModalOpen} handleModal={handleModal} />,
        document.getElementById("overlay")
      )}
    </>
  );
}
