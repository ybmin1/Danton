import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: var(--color-dark);
  color: #fff;
  padding: 0.8rem;
  width: 100%;
  cursor: pointer;
`;

export default function DarkButton({ type, text }) {
  return <Button type={type}>{text}</Button>;
}
