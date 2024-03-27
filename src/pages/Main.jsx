import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { v4 as uuid4 } from "uuid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import { MdArrowRightAlt } from "react-icons/md";
import useFetch from "../hooks/useFetch";

const Layout = styled.main`
  margin-top: 90px;
  width: 100%;
  overflow: hidden;
`;

const Slide = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  cursor: grab;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SlideInfo = styled.span`
  position: absolute;
  bottom: 7%;
  left: 18%;
  color: var(--color-white);
  font-size: 1.3rem;
  letter-spacing: 5px;
`;

const Products = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
  margin-top: 130px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ViewAll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 2rem;
`;

const ViewAllBtn = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  color: var(--color-white);
  transition: all 0.3s;
  padding: ${(props) => (props.$isViewAllHover ? "0.7rem 3rem 0.7rem 1.2rem" : "0.7rem 1.2rem")};
  background-color: var(--color-dark);
`;

const ArrowIcon = styled(MdArrowRightAlt)`
  position: absolute;
  transition: all 0.3s;
  right: ${(props) => (props.$isViewAllHover ? "7px" : "-100px")};
  font-size: 2rem;
  margin-left: 0.5rem;
`;

const Etc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  margin-top: 100px;
`;

const EtcWrapper = styled.div`
  width: 50%;
  height: 50%;
`;

const EtcImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const EtcInfo = styled.p`
  text-align: center;
  font-size: 1.3rem;
  margin-top: 1rem;
`;

const Parallax = styled.div`
  background-image: url("https://danton.com/cdn/shop/files/000362910005_2400x.jpg?v=1642654570");
  height: 400px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 100px 0;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  border-top: 1px solid var(--color-lightgray);
`;

const InfoTitle = styled.p`
  font-size: 1.4rem;
`;

const InfoDetail = styled.div`
  margin-top: 3rem;
  > p:nth-child(1) {
    font-size: 0.7rem;
    letter-spacing: 2px;
  }
  > p:nth-child(2) {
    font-size: 1.1rem;
    margin-top: 5px;
  }
`;

export default function Main() {
  const [isDragging, setIsDragging] = useState(false);
  const { products } = useFetch("https://dummyjson.com/products?skip=0&limit=16", "GET");
  const [isViewAllHover, setIsViewAllHover] = useState(false);
  const navigate = useNavigate();

  const handleMainImgClick = () => {
    if (!isDragging) navigate("/products/shop-all");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
  };

  return (
    <Layout>
      <Slider {...settings}>
        {imgUrl.map((url) => (
          <Slide key={uuid4()} onClick={handleMainImgClick} $isDragging={isDragging}>
            <SlideImg src={url} alt="mainImg" />
            <SlideInfo>SPRING & SUMMER</SlideInfo>
          </Slide>
        ))}
      </Slider>
      <Products>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Products>
      <ViewAll>
        <ViewAllBtn
          to="/products/shop-all"
          onMouseEnter={() => setIsViewAllHover(true)}
          onMouseLeave={() => setIsViewAllHover(false)}
          $isViewAllHover={isViewAllHover}
        >
          <span>View all</span>
          <ArrowIcon $isViewAllHover={isViewAllHover} />
        </ViewAllBtn>
        <Etc>
          <EtcWrapper>
            <EtcImg src="https://danton.com/cdn/shop/files/ABOUT_720x.jpg?v=1627484235" alt="" />
            <EtcInfo>ABOUT</EtcInfo>
          </EtcWrapper>
          <EtcWrapper>
            <EtcImg src="https://danton.com/cdn/shop/files/SHOP_720x.jpg?v=1627484235" alt="" />
            <EtcInfo>SHOP</EtcInfo>
          </EtcWrapper>
        </Etc>
      </ViewAll>
      <Parallax />
      <Information>
        <InfoTitle>INFORMATION</InfoTitle>
        <InfoDetail>
          <p>OCT 30, 2023</p>
          <p>Notice of the DANTON TOKYO Opening</p>
        </InfoDetail>
      </Information>
    </Layout>
  );
}

const imgUrl = [
  "https://danton.com/cdn/shop/files/danton_0732_1944x.jpg?v=1642654570",
  "https://danton.com/cdn/shop/files/2_1944x.jpg?v=1642668019",
  "https://danton.com/cdn/shop/files/20240207-pc-men_1944x.jpg?v=1707290428",
];
