import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Paypal from "./Paypal";
//import { loadDaumAddressAPI } from "../common/DaumAddressApi";
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //주소검색
  const [isAddressAPIInitialized, setIsAddressAPIInitialized] = useState(false);

  //장바구니 내용과 총액 전역상태에서 받아오기
  const cartItems = useSelector((state) => state.cartInfo.cartItems);
  //결제여부
  const [isPaid, setIsPaid] = useState(false);
  //유저정보 (로그인 되어있을 경우)
  const [userInfo, setUserInfo] = useState(null);

  const [checkbox, setCheckbox] = useState(true);

  const [objectOrderState, setObjectOrderState] = useState({
    userId: "",
    itemIds: [],
    email: "",
    name: "",
    phone: "",
    address: "",
    addressDetail: "",
    balance: "",
    totalPrice: "",
    orderDate: new Date(),
    status: "",
  });

  const inputEmailHandler = (event) => {
    setObjectOrderState((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  };

  const inputNameHandler = (event) => {
    setObjectOrderState((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const inputPhoneHandler = (event) => {
    setObjectOrderState((prevState) => ({
      ...prevState,
      phone: event.target.value,
    }));
  };

  //다음주소찾기
  //   const addressSearchHandler = () => {
  //     if (!isAddressAPIInitialized) {
  //       setIsAddressAPIInitialized(true);
  //       new window.daum.Postcode({
  //         oncomplete: function (data) {
  //           const { address } = data;
  //           setObjectOrderState((prevState) => ({
  //             ...prevState,
  //             address: address,
  //           }));
  //         },
  //       }).open();
  //     }
  //   };

  //   //다음주소찾기
  //   useEffect(() => {
  //     loadDaumAddressAPI().then(() => {
  //       document.getElementById("customer-address").onclick =
  //         addressSearchHandler;
  //     });
  //   }, []);

  //   const inputAddressDetailHandler = (event) => {
  //     setObjectOrderState((prevState) => ({
  //       ...prevState,
  //       addressDetail: event.target.value,
  //     }));
  //   };

  //로그인 되어 있을 시 유저 정보 받아온다.
  useEffect(() => {
    // 페이지가 처음 렌더링될 때 실행되는 로직
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (token && email) {
        try {
          // 사용자 정보 요청 (엔드포인트,형식 수정 필요)
          const response = await fetch("/api/user/info", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }

          const userData = await response.json(); // 서버에서 반환된 사용자 정보를 JSON으로 파싱

          // * 기호를 기준으로 주소를 분리하여 address와 addressDetail에 할당
          const [address, addressDetail] = userData.fullAddress.split("*");

          // address와 addressDetail을 사용하여 객체를 구성
          const modifiedData = {
            ...userData,
            address: address,
            addressDetail: addressDetail,
          };

          setUserInfo(modifiedData); // 가져온 사용자 정보를 상태로 저장
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo(); // 함수 호출하여 사용자 정보 가져오기
  }, []); // 최초 렌더링 시 한 번만 실행

  const buttonSubmitHandler = (event) => {
    event.preventDefault();
    console.log(objectOrderState);
    if (objectOrderState.balance >= cartItems.totalAmount) {
      setObjectOrderState((prevState) => ({
        ...prevState,
        balance: objectOrderState.balance - cartItems.totalAmount,
      }));
      setIsPaid(true);
      alert("결제가 완료되었습니다.");
    } else {
      alert("잔액이 부족합니다.");
    }

    //주문정보를 서버로 POST하는 함수
    const sendOrderInfoToServer = async (objectOrderState) => {
      try {
        const {
          userId,
          itemIds,
          address,
          addressDetail,
          totalPrice,
          orderDate,
          status,
        } = objectOrderState; // 주문 정보 추출

        // 두 주소를 합치고 사이에 별* 추가
        const fullAddress = `${address} * ${addressDetail}`;

        const requestBody = {
          userId: userId,
          itemIds: itemIds, //이게 아닌거 같은데
          fullAddress: fullAddress, // fullAddress를 사용
          totalPrice: totalPrice,
          orderDate: new Date(),
          status: "ordered", //??임의로 넣음
        };
        const response = await fetch("/api/carts/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to send order information to the server");
        }

        return await response.json(); // 성공적으로 보내진 경우 응답 데이터 반환
      } catch (error) {
        throw new Error("Failed to send order information to the server");
      }
    };

    // 결제 완료 후 주문 정보 서버로 POST 요청, 상태값 (+placeholder) 초기화
    sendOrderInfoToServer(objectOrderState)
      .then((data) => {
        console.log("주문 정보가 성공적으로 서버에 전송되었습니다.", data);
        setObjectOrderState({
          email: "",
          name: "",
          phone: "",
          address: "",
          addressDetail: "",
        });
      })
      .catch((error) => {
        console.error("주문 정보 전송 중 오류가 발생했습니다.", error.message);
      });
  };

  return (
    <Layout>
      <PaymentWrapper>
        <PaypalWrapper>
          <PaypalText>Express Checkout</PaypalText>
          <PaypalBtnWrapper>
            <PaypalButton />
          </PaypalBtnWrapper>
        </PaypalWrapper>

        <OrContainer>
          <OrLine />
          <OrText>OR</OrText>
        </OrContainer>

        <Form onSubmit={buttonSubmitHandler}>
          {/* Contact */}
          <ContactWrapper>
            <GuestContactWrapper>
              <ContactTitleWrapper>
                <ContactTitle htmlFor="contact">Contact</ContactTitle>
                {!isLoggedIn && (
                  <LoginLink href="http://localhost:3000/login">
                    LOGIN
                  </LoginLink>
                )}
              </ContactTitleWrapper>

              <InputBox
                value={objectOrderState.email}
                onChange={inputEmailHandler}
                placeholder={isLoggedIn ? objectOrderState.email : "Email"}
                readOnly={isLoggedIn}
              />
              <CheckboxWrapper>
                <CheckboxShell>
                  <CheckboxInput
                    type="checkbox"
                    id="subscribeNews"
                    checked={checkbox}
                    onChange={() => setCheckbox((prev) => !prev)}
                  />
                </CheckboxShell>

                <SubscribeLabel for="subscribeNews">
                  Email me with news and offers
                </SubscribeLabel>
              </CheckboxWrapper>
            </GuestContactWrapper>
          </ContactWrapper>
          <DeliveryWrapper>
            <TitleWrapper>
              <Title htmlFor="delivery">Delivery</Title>
            </TitleWrapper>

            <InputBox
              value={objectOrderState.name}
              onChange={inputNameHandler}
              placeholder={isLoggedIn ? objectOrderState.name : "Name"}
              readOnly={isLoggedIn}
            />

            <InputBox
              value={objectOrderState.phone}
              onChange={inputPhoneHandler}
              placeholder={isLoggedIn ? objectOrderState.phone : "Phone number"}
            />

            <InputBox
              type="text"
              name="customer-address"
              id="customer-address"
              value={objectOrderState.address}
              placeholder={isLoggedIn ? objectOrderState.phone : "Address"}
              //onClick={addressSearchHandler}
              readOnly
            />

            <InputBox
              //onChange={inputAddressDetailHandler}
              placeholder={
                isLoggedIn ? objectOrderState.addressDetail : "Address detail"
              }
              value={objectOrderState.addressDetail}
            />
          </DeliveryWrapper>

          <PaymentWrapper>
            <TitleWrapper>
              <Title htmlFor="payment">Payment</Title>
            </TitleWrapper>

            <InputBox
              placeholder={
                isLoggedIn
                  ? "E-Money Balance: $" + objectOrderState.balance
                  : "Please login to pay with E-Money"
              }
              readOnly
            />
          </PaymentWrapper>

          <PayBtnWrapper>
            <PayNowBtn type="submit">Pay now</PayNowBtn>
          </PayBtnWrapper>
        </Form>
      </PaymentWrapper>
      <FooterContainer>
        <FooterText>Refund policy</FooterText>
        <FooterText>Order & Shipment</FooterText>
        <FooterText>Privacy policy</FooterText>
        <FooterText>Terms of service</FooterText>
        <FooterText>Legal notice</FooterText>
      </FooterContainer>
    </Layout>
  );
};

export default PaymentForm;

const Layout = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 89px;
  width: 110%;
  height: 100%;
  border-right: 1px solid var(--color-lightgray);
  padding-right: 35px;
  padding-left: 200px;
`;

const PaypalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 140px;
  margin: 15px 0 15px 0;
`;

const PaypalText = styled.div`
  margin-bottom: 25px;
  font-size: 1.125rem;
  color: lightgrey;
`;

const PaypalBtnWrapper = styled.div`
  width: 100%;
`;

const PaypalButton = styled(Paypal)``;

const OrContainer = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
`;

const OrLine = styled.div`
  position: relative;
  margin: 10px 0;
  border-top: 1px solid var(--color-lightgray);
`;

const OrText = styled.span`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0 5px;
  color: lightgrey;
  font-size: 1rem;
`;

const Form = styled.form`
  width: 100%;
  margin: 25px 0 25px 0;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
`;

const GuestContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  input {
    width: 100%;
  }
`;

const ContactTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 30px 0 17px 0;
`;

const ContactTitle = styled.label`
  font-size: 1.5rem;
`;

const LoginLink = styled.a`
  font-size: 1rem;
  text-decoration: underline;
`;

const InputBox = styled.input`
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--color-lightgray);
  border-radius: 5px;
  font-size: 1rem;
  color: black;

  &::placeholder {
    font-size: 1rem;
    color: black;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
`;

const CheckboxShell = styled.div`
  width: 20px;
  margin-right: 5px;
`;

const CheckboxInput = styled.input`
  width: 15px;
  height: 15px;
  &:checked {
    accent-color: black;
  }
`;

const SubscribeLabel = styled.label`
  width: 500px;
  font-size: 1rem;
`;

const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-top: 40px;
  input {
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

const Title = styled.label`
  font-size: 1.5rem;
  margin-bottom: 18px;
`;

const PayBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 42px;
  input {
    width: 100%;
  }
`;

const PayNowBtn = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 50px;
  background-color: #ff6d6d;
  border: none;
  border-radius: 5px;
  font-size: 1.25rem;
  color: white;

  &:hover {
    background-color: #ff2c2c;
    cursor: pointer;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  border-top: 1px solid var(--color-lightgray);
  height: 73px;
  font-size: 0.875rem;
`;

const FooterText = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;
