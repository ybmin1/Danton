import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuid4 } from "uuid";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaPinterest, FaFacebook, FaInstagram } from "react-icons/fa";

const Layout = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 560px;
  padding: 5rem;
  background-color: rgba(240, 241, 243, 1);
  @media screen and (max-width: 700px) {
    padding: 2rem 0;
  }
`;

const Box = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
  height: 100%;
  font-size: 0.8rem;
`;

const Menus = styled.div`
  display: flex;
  gap: 160px;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  @media screen and (max-width: 700px) {
    border-bottom: 1px solid rgba(214, 215, 216, 1);
    padding-bottom: 2rem;
  }
`;

const Item = styled.li`
  cursor: pointer;
`;

const Subscribe = styled.div`
  width: 28%;
  margin-top: 3rem;
`;

const SubscribeTitle = styled.p`
  letter-spacing: 2px;
  white-space: nowrap;
`;

const SubscribeDetail = styled.p`
  min-width: 150px;
  margin-top: 1.2rem;
  line-height: 1.2rem;
`;

const Email = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  min-width: 200px;
  background-color: transparent;
  border: ${(props) =>
    props.$isClicked ? "2px solid var(--color-black)" : "1px solid rgba(214, 216, 217, 1)"};
  border-radius: 3px;
  margin-top: 1.2rem;
`;

const EmailIcon = styled(SlEnvolopeLetter)`
  box-sizing: content-box;
  padding: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const EmailInput = styled.input`
  box-sizing: content-box;
  padding: 0.5rem;
  border: none;
  outline: none;
  background-color: transparent;
  flex: 1 1 auto;
`;

const SNS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  svg {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Company = styled.p`
  margin-top: 1rem;
`;

export default function Footer() {
  const [isEmailClick, setIsEmailClick] = useState(false);
  return (
    <Layout>
      <Box>
        <Menus>
          {menus.map((menu) => (
            <List key={uuid4()}>
              {menu.map((item) => (
                <Item key={uuid4()}>{item}</Item>
              ))}
            </List>
          ))}
        </Menus>
        <Subscribe>
          <SubscribeTitle>SIGN UP AND SAVE</SubscribeTitle>
          <SubscribeDetail>
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </SubscribeDetail>
          <Email
            $isClicked={isEmailClick}
            onClick={() => setIsEmailClick(true)}
            onBlur={() => setIsEmailClick(false)}
          >
            <div>
              <EmailIcon />
            </div>
            <EmailInput type="text" />
          </Email>
        </Subscribe>
        <SNS>
          <Icons>
            <FaFacebook />
            <FaPinterest />
            <FaInstagram />
          </Icons>
          <Company>ⓒ 2024 DANTON</Company>
        </SNS>
      </Box>
    </Layout>
  );
}

const menus = [
  ["MEN", "WOMEN", "KIDS", "BAG", "HAT", "GOODS", "STORE EXCLUSIVE"],
  ["ABOUT", "SHOP", "INFORMATION", "CONTACT"],
  [
    "SEARCH",
    "TERMS & CONDITIONS",
    "PRIVACY POLICY",
    "COOKIE POLICY",
    "ORDERING AND PAYMENT",
    "REFUND POLICY",
  ],
];
