import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Layout = styled.div`
  position: fixed;
  right: ${(props) => (props.$isModalOpen ? "0" : "-100%")};
  opacity: ${(props) => (props.$isModalOpen ? "1" : "0")};
  top: 0;
  width: 300px;
  height: 100%;
  z-index: 1500;
  transition: all 0.5s;
  overflow: scroll;
  background-color: var(--color-white);
`;

const CartOverlay = ({ isModalOpen, handleModal }) => {
  return <Layout $isModalOpen={isModalOpen}></Layout>;
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
