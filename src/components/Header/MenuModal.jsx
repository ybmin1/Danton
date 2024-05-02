import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { IoIosClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const Layout = styled.div`
  position: fixed;
  left: ${(props) => (props.$isModalOpen ? "0" : "-100%")};
  opacity: ${(props) => (props.$isModalOpen ? "1" : "0")};
  top: 0;
  width: 100%;
  max-width: 333px;
  height: 100vh;
  z-index: 1500;
  transition: all 0.5s;
  background-color: var(--color-white);
  padding: 1.5rem 2rem;
`;

const List = styled.ul`
  ${(props) => {
    if (props.$isModalOpen) {
      return css`
        > li:nth-child(1) {
          transition: all 1.2s;
          opacity: 1;
          transform: translateY(0);
        }
        > li:nth-child(2) {
          transition: all 1.5s;
          opacity: 1;
          transform: translateY(0);
        }
        > li:nth-child(3) {
          transition: all 1.8s;
          opacity: 1;
          transform: translateY(0);
        }
        > li:nth-child(4) {
          transition: all 2.1s;
          opacity: 1;
          transform: translateY(0);
        }
        > li:nth-child(5) {
          transition: all 2.4s;
          opacity: 1;
          transform: translateY(0);
        }
      `;
    } else {
      return css`
        > li {
          opacity: 0;
          transform: translateY(100px);
        }
      `;
    }
  }}
`;

const Item = styled.li`
  font-size: 1.1rem;
  transition: all 0.5s;
  overflow: hidden;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-lightgray);
  }
`;

const ItemClose = styled(Item)`
  text-align: right;
  padding-bottom: 1.5rem;
`;

const CloseIcon = styled(IoIosClose)`
  font-size: 2rem;
  margin-right: -0.5rem;
  cursor: pointer;
`;

const ItemStore = styled(Item)`
  position: relative;
  padding: 2rem 0 0 0;
`;

const OnlineStore = styled.div`
  flex: 1 1 auto;
  cursor: pointer;
`;

const ArrowDownIcon = styled(MdKeyboardArrowDown)`
  position: absolute;
  top: 30px;
  right: -0.3rem;
  font-size: 1.5rem;
  transition: all 0.5s;
  transform: ${(props) => (props.$isStoreOpen ? "rotate(180deg)" : "rotate(0deg)")};
  cursor: pointer;
`;

const SubList = styled.ul`
  transition: all 0.5s;
  margin-top: 1rem;
  ${(props) => {
    if (props.$isStoreOpen) {
      return css`
        transform: translateY(0);
        opacity: 1;
        height: 240px;
        margin-bottom: 1rem;
      `;
    } else {
      return css`
        transform: translateY(50px);
        opacity: 0;
        height: 0px;
      `;
    }
  }}
  > li {
    display: flex;
    align-items: center;
    padding: 0.5rem 0 0.5rem 1rem;
  }
`;

const PlusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid var(--color-lightgray);
  margin-left: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const ItemAbout = styled(Item)`
  padding: 1rem 0;
  cursor: pointer;
`;

const ItemAccount = styled(Item)`
  padding: 1rem 0;
  cursor: pointer;
`;

const ItemSNS = styled(Item)`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  font-size: 1.5rem;
`;

const Facebook = styled(FaFacebook)`
  cursor: pointer;
`;

const Instagram = styled(FaInstagram)`
  cursor: pointer;
`;

const MenuOverlay = ({ isModalOpen, handleModal }) => {
  const [isStoreOpen, setIsStoreOpen] = useState(false);

  return (
    <Layout $isModalOpen={isModalOpen}>
      <List $isModalOpen={isModalOpen}>
        <ItemClose>
          <CloseIcon onClick={handleModal} />
        </ItemClose>
        <ItemStore>
          <OnlineStore>ONLINE STORE</OnlineStore>
          <ArrowDownIcon
            $isStoreOpen={isStoreOpen}
            onClick={() => setIsStoreOpen((prev) => !prev)}
          />
          <SubList $isStoreOpen={isStoreOpen}>
            <li>
              MEN'S
              <PlusIcon>
                <GoPlus />
              </PlusIcon>
            </li>
            <li>
              WOMEN'S
              <PlusIcon>
                <GoPlus />
              </PlusIcon>
            </li>
            <li>BAGS</li>
            <li>HEADWEAR</li>
            <li>GOODS</li>
            <li>STORE EXCLUSIVE</li>
          </SubList>
        </ItemStore>
        <ItemAbout>ABOUT</ItemAbout>
        <ItemAccount>ACCOUNT</ItemAccount>
        <ItemSNS>
          <Facebook />
          <Instagram />
        </ItemSNS>
      </List>
    </Layout>
  );
};

export default function MenuModal({ isModalOpen, handleModal }) {
  return (
    <>
      {ReactDOM.createPortal(
        <MenuOverlay isModalOpen={isModalOpen} handleModal={handleModal} />,
        document.getElementById("overlay")
      )}
    </>
  );
}
