import React, { useEffect } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
  transition: all 0.3s;
  opacity: ${(props) => (props.$isModalOpen ? 0.5 : 0)};
  z-index: ${(props) => (props.$isModalOpen ? 1000 : -1)};
`;

export default function Backdrop({ isModalOpen, handleModal }) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isModalOpen]);

  return <ModalBackdrop $isModalOpen={isModalOpen} onClick={handleModal} />;
}
