import React from "react";
import styled, { css } from "styled-components";
import ReactDOM from "react-dom";
import { IoIosClose } from "react-icons/io";

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
  border-bottom: 1px solid var(--color-lightgray);
  ${(props) => {
    if (props.$isModalOpen) {
      return css`
        > li:nth-child(1) {
          transition: all 1.2s;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ItemTitle = styled.p`
  font-size: 1.4rem;
`;

const CloseIcon = styled(IoIosClose)`
  font-size: 2rem;
  margin-right: -0.5rem;
  cursor: pointer;
`;

const CategoryOverlay = ({ isModalOpen, handleModal }) => {
  return (
    <Layout $isModalOpen={isModalOpen}>
      <List $isModalOpen={isModalOpen}>
        <ItemClose>
          <ItemTitle>CATEGORY</ItemTitle>
          <CloseIcon onClick={handleModal} />
        </ItemClose>
      </List>
    </Layout>
  );
};

export default function CategoryModal({ isModalOpen, handleModal }) {
  return (
    <>
      {ReactDOM.createPortal(
        <CategoryOverlay isModalOpen={isModalOpen} handleModal={handleModal} />,
        document.getElementById("overlay")
      )}
    </>
  );
}
