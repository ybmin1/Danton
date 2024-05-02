import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const GalleryContainer = styled.div`
  width: 40%;

  @media (max-width: 1024px) {
    // 데스크톱 보다 작은 화면에 적용될 스타일
    width: 50%;
  }
  @media (max-width: 768px) {
    // 태블릿 보다 작은 화면에 적용될 스타일
    width: 75%;
  }
  @media (max-width: 480px) {
    // 모바일 보다 작은 화면에 적용될 스타일
    width: 100%;
  }
`;

const MainImageContainer = styled.div`
  margin-bottom: 20px; // 여백을 추가하여 메인 이미지와 서브 이미지 간격을 만듭니다.
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
`;

const SubImageSlider = styled(Slider)`
  .slick-slide img {
    margin: auto; // 이미지 중앙 정렬
  }
`;

const SubImage = styled.img`
  width: 100%; // 서브 이미지들도 전체 너비에 맞춰서 조절
  height: 30%; // 높이는 자동으로 설정해서 비율을 유지
  cursor: pointer;
  @media (max-width: 768px) {
    // 화면이 작아질 때 서브 이미지의 크기를 줄입니다.
    width: 80px;
    height: 80px;
  }
  @media (max-width: 480px) {
    // 더 작은 화면에서는 서브 이미지의 크기를 더 줄입니다.
    width: 60px;
    height: 60px;
  }
`;

const ProductImageGallery = ({ images, title }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const subSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
      // 이미지가 담긴 요소의 너비에 따라 이미지 크기를 조절합니다.
      const mainImageElement = document.getElementById("mainImage");
      if (mainImageElement) {
        mainImageElement.style.width = "100%";
      }
    };

    // 화면 크기가 변경될 때마다 handleResize 함수가 호출됩니다.
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트되면 리스너를 해제합니다.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // useEffect의 의존성 배열을 비워두면 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  return (
    <GalleryContainer>
      <MainImageContainer>
        {/* id를 추가하여 이미지를 식별할 수 있도록 합니다. */}
        <MainImage id="mainImage" src={mainImage} alt={title} />
      </MainImageContainer>
      <SubImageSlider {...subSliderSettings}>
        {images.map((img, idx) => (
          <div key={idx} onClick={() => setMainImage(img)}>
            <SubImage src={img} alt={`${title} - ${idx + 1}`} />
          </div>
        ))}
      </SubImageSlider>
    </GalleryContainer>
  );
};

export default ProductImageGallery;
