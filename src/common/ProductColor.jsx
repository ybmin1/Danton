import React, { useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: ${(props) =>
    props.$isMouseEnter ? "1px solid var(--color-black)" : "1px solid var(--color-lightgray)"};
`;

const Color = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.$color};
`;

export default function ProductColor({ color }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  return (
    <Layout
      $isMouseEnter={isMouseEnter}
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
    >
      <Color $color={color}></Color>
    </Layout>
  );
}
