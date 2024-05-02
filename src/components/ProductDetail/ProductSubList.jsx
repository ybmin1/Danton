import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SubListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px; // 카드 사이의 간격
  justify-content: center; // 중앙 정렬
  margin-top: 20px; // 상단 여백
`;

const ProductCard = styled.div`
  flex: 0 0 200px; // flex-basis는 카드의 기본 크기입니다.
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 80%;
  height: auto; // 이미지 비율 유지
  object-fit: cover; // 이미지가 카드를 채우도록
`;

const ProductTitle = styled.h3`
  font-size: 10px;
  text-align: center;
`;

const ProductPrice = styled.span`
  color: #333;
  font-size: 12px;
`;

const ProductSubList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // navigate 함수 초기화

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        // 상품 배열에서 무작위로 5개 항목을 선택합니다.
        const shuffledProducts = [...data.products]
          .sort(() => 0.5 - Math.random())
          .slice(0, 5); // 랜덤으로 섞은 후 처음 5개를 선택합니다.
        setProducts(shuffledProducts);
      })
      .catch((error) => console.error("Fetching error:", error));
  }, []);

  const handleProductClick = (id) => {
    navigate(`/products/detail/${id}`);
  };

  return (
    <>
      <h1>You may also like</h1>
      <SubListContainer>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => handleProductClick(product.id)}
          >
            <ProductImage src={product.images[0]} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>${product.price}</ProductPrice>
          </ProductCard>
        ))}
      </SubListContainer>
    </>
  );
};

export default ProductSubList;
