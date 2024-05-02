import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;
`;

const Description = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  max-height: 50px;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const Price = styled.p`
  font-size: 0.7rem;
  letter-spacing: 1px;
`;

export default function ProductInfo({ product }) {
  return (
    <Layout>
      <Description>{product.title}</Description>
      <Price>${product.price}</Price>
    </Layout>
  );
}
