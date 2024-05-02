import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const PaginationBtn = styled.span`
  padding: 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

const PrevBtn = styled.div``;

const NextBtn = styled.div``;

// 현재 페이지, 마지막 페이지 받아오기
// 첫 페이지, 마지막 페이지, 현재 페이지에서 양쪽 두개 페이지 보여주기
// 현재 페이지가 3 이상일 때 - 2, 현재 페이지가  + 2
// 현재 페이지 + 3이 마지막 페이지와 동일할 경우 다음 페이지 전체 표시
// 현재 페이지 + 3이 마지막 페이지 보다 작을 경우 마지막 페이지와 currentPage + 2 사이에 ... 추가
// 현재 페이지 - 3이 첫 페이지와 동일할 경우 이전 페이지 전체 표시
// 현재 페이지 - 3이 첫 페이지 보다 클 경우 첫 페이지와 currentPage - 2 사이에 ... 추가
export default function Pagination({ currentPage, lastPage }) {
  return (
    <Layout>
      <PrevBtn>이전</PrevBtn>
      <PaginationBtn>1</PaginationBtn>
      <PaginationBtn>{currentPage - 2}</PaginationBtn>
      <PaginationBtn>{currentPage - 1}</PaginationBtn>
      <PaginationBtn>{currentPage}</PaginationBtn>
      <PaginationBtn>{currentPage + 1}</PaginationBtn>
      <PaginationBtn>{currentPage + 2}</PaginationBtn>
      <PaginationBtn>{lastPage}</PaginationBtn>
      <NextBtn>이후</NextBtn>
    </Layout>
  );
}
