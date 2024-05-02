import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FaTruck, FaCircle } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CartModal from "../Header/CartModal";
import Backdrop from "../../common/Backdrop";

// JSON 데이터 import
import data from "../db/date.json";
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 550px; // 제품 정보의 너비
  padding: 20px;
  border-radius: 8px;
  margin: 0 auto; // 중앙 정렬
  background: #ffffff;

  @media (max-width: 768px) {
    width: 450px; // Full width of the container
    // You can also adjust padding, margins, etc. as needed
  }
`;

// 제품 타이틀 스타일
const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 25px; // 제목 아래 여백
`;

// 제품 가격 스타일
const Price = styled.span`
  font-size: 15px;
  margin-bottom: 25px; // 가격 아래 여백
  border-bottom: 1px solid #ccc; // 가격 아래 선 추가
  padding-bottom: 40px; // 가격 아래 여백 추가
`;

const ShippingAndStockContainer = styled.div`
  display: flex;
  flex-direction: column; // 항목들을 세로로 쌓음
  align-items: flex-start; // 항목들을 왼쪽 정렬
  margin-bottom: 20px;
`;

const ShippingInfo = styled.span`
  display: flex;
  align-items: center; // Center align the text with the truck icon
  margin-right: 20px; // Space between the shipping and stock information
`;

const StockInfo = styled.span`
  display: flex;
  align-items: center; // Center align the text with the circle icon
  color: ${(props) =>
    props.inStock ? "green" : "red"}; // Color based on stock status
  margin-bottom: 10px;
`;

const IconWrapper = styled.span`
  margin-right: 5px; // Space between the icon and the text
`;

const InStockIcon = styled(FaCircle)`
  color: green; // Green color for in stock
  font-size: 10px; // Smaller icon size
`;

const OutOfStockIcon = styled(FaCircle)`
  color: red; // Red color for out of stock
  font-size: 10px; // Smaller icon size
`;

const ColorNameDisplay = styled.div`
  font-size: 14px;
  margin-bottom: 20px; // Adjust the margin as needed
  position: relative;
  top: -20px;
  left: -80px;
`;

const ColorSelector = styled.div`
  display: flex; // 플렉스박스 사용
  align-items: flex-end; // 요소들을 수직 방향으로 아래쪽에 정렬
`;

// 색상 옵션 버튼 스타일
const ColorOption = styled.button`
  width: 30px; // 버튼 너비
  height: 30px; // 버튼 높이
  margin-right: 10px; // 버튼 사이 간격
  border: 1px solid #ddd; // 기본 테두리
  display: flex; // 플렉스박스를 사용하여 내용 중앙 정렬
  justify-content: center; // 가로 방향 중앙 정렬
  align-items: center; // 세로 방향 중앙 정렬
  background-color: ${(props) => props.color}; // 배경색 props로 설정
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5; // 마우스 호버 시 배경색 변경
  }
  // 선택된 색상에 대한 스타일
  ${(props) =>
    props.$isSelected &&
    `
  border: 2px solid black; // 선택 시 테두리 굵게
`}
`;

// 사이즈 선택 옵션 스타일
const SizeSelector = styled.div`
  margin-top: 30px;
  margin-bottom: 25px;
`;

const SizeHeading = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

// 사이즈 옵션 버튼 스타일
const SizeOption = styled.button`
  width: 40px; // 버튼 너비
  height: 40px; // 버튼 높이
  margin-right: 10px; // 버튼 사이 간격
  border: 1px solid #ddd; // 기본 테두리
  font-size: 16px; // 글꼴 크기
  line-height: 40px; // 버튼 안 글자 세로 중앙 정렬
  text-align: center; // 글자 가로 중앙 정렬
  background-color: transparent; // 배경색 투명
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5; // 마우스 호버 배경색
  }
  // 선택된 사이즈에 대한 스타일
  ${(props) =>
    props.$isSelected &&
    `
  border: 2px solid black; // 선택 시 테두리 굵게
  font-weight: bold; // 선택 시 글꼴 볼드
`}
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; // 버튼 사이 간격 조정
`;

const AddToCartButton = styled(Button)`
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #cccccc;
  display: flex;
  justify-content: center; // 가로축으로 텍스트를 중앙 정렬
  align-items: center; // 세로축으로 텍스트를 중앙 정렬
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  overflow: hidden; // 내용이 버튼 밖으로 나가는 것을 방지
  position: relative; // after의용 클래스를 위한 상대적 위치 설정

  // 버튼 호버 상태일 때만 화살표를 표시합니다.
  &:hover:after {
    content: "→"; // 호버 시 화살표
    display: block;
    position: absolute; // 버튼 내 절대적 위치
    right: 10px; // 오른쪽 끝에서 10px 떨어진 곳에 위치
  }

  // 화살표는 기본 상태에서는 보이지 않습니다.
  &:after {
    content: "";
    display: none;
  }
`;

const BuyButton = styled(Button)`
  background-color: #6f42c1; // 예시로 선택한 색상
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  padding: 10px 20px;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`;

const Details = styled.div`
  font-size: 16px; // 원하는 글꼴 크기로 조정
  color: #333; // 글씨 색상 조정
  line-height: 1.6; // 줄 간격 조정
  margin-top: 20px;
`;

const DetailList = styled.ul`
  list-style-type: disc; // 목록 스타일
  padding-left: 20px; // 목록 내용 들여쓰기 조정
  margin-top: 10px;
`;

const DetailItem = styled.li`
  margin-bottom: 10px; // 목록 항목 간 간격 조정
`;

const DetailsHeading = styled.h2`
  padding-bottom: 10px; // 선과 텍스트 사이의 간격
  border-bottom: 1px solid gray;
`;

const SizeChartContainer = styled.div`
  margin-top: 20px; // Size chart와 그 위 요소와의 간격
`;

const SizeChartHeading = styled.h2`
  font-size: 18px; // Heading 사이즈 조정
  margin-bottom: 20px; // Heading과 테이블 사이의 간격, 원하는 값으로 조정하세요
  font-weight: normal; // Heading 두께 조정
  border-bottom: 1px solid gray; // 헤더 셀의 하단 테두리
  padding-bottom: 10px; // 여기를 조정하여 선과 글자의 간격을 넓힐 수 있습니다
`;

const SizeChartTable = styled.table`
  width: 100%;
  border-collapse: collapse; // 테이블 셀 사이의 테두리 없애기
  margin-bottom: 10px; // 모델 정보와의 간격
`;

const TableHeader = styled.th`
  border-bottom: 1px solid #000; // 헤더 셀의 하단 테두리
  padding: 8px; // 셀 패딩
  text-align: left; // 텍스트 왼쪽 정렬
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ccc; // 셀의 하단 테두리
  padding: 8px; // 셀 패딩
`;

const ModelInfo = styled.p`
  font-size: 14px; // 모델 정보의 텍스트 사이즈
  color: #666; // 텍스트 색상 조정
`;

const InventoryNoticeContainer = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #ccc; // 토글된 내용 아래에 표시되는 하단 선
`;

const InventoryHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0; // 텍스트와 상단 선 사이 간격
  cursor: pointer;
`;

const InventoryContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding: 10px 0; // 텍스트와 하단 선 사이 간격
`;

const ToggleIcon = styled.span`
  font-size: 16px;
`;

// 상품 정보 컴포넌트
const ProductInfo = () => {
  const colors = data.colors;
  const sizes = data.sizes;
  const inStock = data.availability.inStock;
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isCartmodalOpen, setisCartmodalOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  // 사이즈 선택 핸들러
  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  const handleModal = () => {
    if (isCartmodalOpen) {
      setisCartmodalOpen(false);
    }
  };

  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  // 장바구니 핸들러 함수
  const handleAddToCart = async () => {
    const newItem = {
      productName: data.productName,
      price: data.price,
      selectedColor,
      selectedSize,
    };

    // 백엔드 서버의 장바구니 API 엔드포인트
    const apiUrl = "http://example.com/api/cart";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // API 요청에 필요한 추가 헤더가 있다면 여기에 추가하세요.
          // 예: 'Authorization': 'Bearer yourToken'
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // 백엔드로부터 응답을 받습니다.
      console.log("Added to cart response:", responseData);

      // 모달을 열어 사용자에게 알립니다.
      setisCartmodalOpen(true);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // 에러 처리 로직 (예: 에러 메시지 표시)
    }
  };

  // 구매 핸들러 함수
  const handleBuy = () => {
    // 상품 정보와 선택된 옵션을 이용하여 구매하는 로직
    const newItem = {
      productName: data.productName,
      price: data.price,
      selectedColor,
      selectedSize,
    };
    // 구매 처리하는 함수 호출
    navigate("/payment", { state: { item: newItem } });

    console.log("Buy now:", newItem);
  };

  useEffect(() => {
    // 해당 부분에서 필요한 useEffect 로직을 추가합니다.
  }, []);

  // 기타 상태 및 핸들러 함수들은 생략합니다.

  return (
    <Container>
      <Title>{data.productName}</Title>
      <Price>${data.price}</Price>
      {/* 색상 선택 UI */}
      <ColorSelector>
        {colors.map((color) => (
          <ColorOption
            key={color.hexCode}
            color={color.hexCode}
            onClick={() => handleSelectColor(color.hexCode)}
            $isSelected={selectedColor === color.hexCode}
          />
        ))}
        <ColorNameDisplay>
          {selectedColor
            ? `COLOR — ${colors.find((c) => c.hexCode === selectedColor).name}`
            : "Select a color"}
        </ColorNameDisplay>
      </ColorSelector>
      {/* 사이즈 선택 UI */}
      <SizeSelector>
        <SizeHeading>SIZE</SizeHeading>
        {sizes.map((size) => (
          <SizeOption
            key={size}
            onClick={() => handleSelectSize(size)}
            $isSelected={selectedSize === size}
          >
            {size}
          </SizeOption>
        ))}
      </SizeSelector>
      {/* 데이터에 따라 동적으로 UI를 생성할 수 있습니다. */}
      <ShippingAndStockContainer>
        <ShippingInfo>
          <FaTruck />
          <IconWrapper>
            Free shipping for orders over USD${data.price}
          </IconWrapper>
        </ShippingInfo>
        <StockInfo inStock={inStock}>
          {inStock ? (
            <>
              <InStockIcon />
              <span>In stock, ready to ship</span>
            </>
          ) : (
            <>
              <OutOfStockIcon />
              <span>Out of stock</span>
            </>
          )}
        </StockInfo>
      </ShippingAndStockContainer>
      {/* 장바구니 버튼, 구매 버튼 등의 UI 코드 */}
      <ButtonContainer>
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
        <BuyButton onClick={handleBuy}>Buy with Shop Pay</BuyButton>
        <MoreOptionsButton>More payment options</MoreOptionsButton>
      </ButtonContainer>
      <Details>
        <DetailsHeading>Details</DetailsHeading>
        <DetailList>
          {data.details.map((detail, index) => (
            <DetailItem key={index}>{detail}</DetailItem>
          ))}
        </DetailList>
      </Details>
      <SizeChartContainer>
        <SizeChartHeading>SIZE & FIT (cm)</SizeChartHeading>
        <SizeChartTable>
          <thead>
            <tr>
              <TableHeader>Size</TableHeader>
              <TableHeader>Waist (cm)</TableHeader>
              <TableHeader>Rise (cm)</TableHeader>
              <TableHeader>Inseam (cm)</TableHeader>
            </tr>
          </thead>
          <tbody>
            {data.sizeFit.map((item) => (
              <tr key={item.size}>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.waist}</TableCell>
                <TableCell>{item.rise}</TableCell>
                <TableCell>{item.inseam}</TableCell>
              </tr>
            ))}
          </tbody>
        </SizeChartTable>
        <ModelInfo>MODEL: {data.modelInfo.height}</ModelInfo>
        <ModelInfo>SIZE: {data.modelInfo.wearingSize}</ModelInfo>
      </SizeChartContainer>
      <InventoryNoticeContainer>
        <InventoryHeading onClick={toggleInventory}>
          NOTICE OF INVENTORY
          <ToggleIcon>
            {isInventoryOpen ? <FaChevronUp /> : <FaChevronDown />}
          </ToggleIcon>
        </InventoryHeading>
        <InventoryContent isOpen={isInventoryOpen}>
          <p>{data.inventoryNotice}</p>
        </InventoryContent>
      </InventoryNoticeContainer>
      {ReactDOM.createPortal(
        <Backdrop isModalOpen={isCartmodalOpen} handleModal={handleModal} />,
        document.getElementById("backdrop")
      )}
      <CartModal isModalOpen={isCartmodalOpen} handleModal={handleModal} />
    </Container>
  );
};

export default ProductInfo;
