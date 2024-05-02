import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ProductImageGallery from "../components/ProductDetail/ProductImageGallery";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import ProductSubList from "../components/ProductDetail/ProductSubList";

// Styled components
const ProductDetailLayout = styled.div`
  padding-top: 150px; // 헤더 높이
  padding-bottom: 150px; // 푸터 높이
  min-height: calc(100vh - 300px); // 전체 높이에서 헤더와 푸터 높이를 뺀 값
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: flex-start; // 컨텐츠를 상단으로 정렬합니다.
`;

const ProductDetailContainer = styled.div`
  display: flex;
  justify-content: space-between; // 컴포넌트 간의 공간을 최대한 활용합니다.
  width: 100%; // 부모 요소에 꽉 차게 합니다.
  max-width: 1200px; // 컴포넌트들이 너무 커지는 것을 방지합니다.

  @media screen and (max-width: 768px) {
    flex-direction: column; /* 화면이 작을 때 세로로 배치 */
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full viewport height
  width: 100vw; // Full viewport width
`;

const ListLink = styled(Link)`
  display: block;
  margin-bottom: 20px; // 원하는대로 마진 조절
  text-decoration: none;
  color: black; // 원하는대로 색상 조절
  &:hover {
    text-decoration: underline;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  position: relative;
  top: 180px;
  right: 385px;
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black; // 원하는대로 색상 조절
  &:hover {
    text-decoration: underline;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Define a function to fetch product data
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        window.scrollTo(0, 0); // Scroll to the top of the page
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) {
    return <DetailContainer>Loading...</DetailContainer>;
  }

  return (
    <>
      <Breadcrumbs>
        <StyledLink to="/">Home</StyledLink>/
        <ListLink to="/products/shop-all">SHOP ALL</ListLink> / {product.title}
      </Breadcrumbs>
      <ProductDetailLayout>
        <ProductDetailContainer>
          <ProductImageGallery images={product.images} title={product.title} />
          <ProductInfo />
        </ProductDetailContainer>
      </ProductDetailLayout>
      <ProductSubList />
    </>
  );
};

export default ProductDetail;
