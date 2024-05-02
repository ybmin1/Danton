import React, { useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 260px;
  overflow: hidden;
`;

const CommonImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
`;

const MainImg = styled(CommonImg)`
  opacity: ${(props) => (props.$isVisible ? "0" : "1")};
`;

const SubImg = styled(CommonImg)`
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
`;

export default function ProductImage({ imgs }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Layout
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <MainImg src={imgs[0]} alt="product-image" $isVisible={isVisible} />
      <SubImg src={imgs[1]} alt="product-image" $isVisible={isVisible} />
    </Layout>
  );
}
