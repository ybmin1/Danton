import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { v4 as uuid4 } from "uuid";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { BsTruck } from "react-icons/bs";
import { FaDotCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const Label = styled.label`
  font-size: 0.8rem;
`;

const Input = styled.input`
  padding: 0.5rem;
`;

const Hr = styled.hr`
  margin: 30px 0;
  border: 0;
  height: 1px;
  background-color: var(--color-lightgray);
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-lightgray);
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DetailSizes = styled.div`
  display: flex;
  gap: 5px;
`;

const DetailCommonWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: ${(props) =>
    props.$isSelected
      ? "2px solid var(--color-black)"
      : "1px solid var(--color-lightgray)"};
  cursor: pointer;
  &:hover {
    border: 2px solid var(--color-black);
  }
`;

const DetailSize = styled.div`
  ${DetailCommonWrapper}
`;

const DetailColors = styled.div`
  display: flex;
  gap: 5px;
`;

const DetailColor = styled.div`
  ${DetailCommonWrapper}
`;

const DetailColorInside = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.$color || "none"};
`;

const Quantity = styled.input`
  padding: 0.5rem;
  width: 100%;
  max-width: 100px;
`;

const AddDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const DetailCommonIcon = css`
  font-size: 2rem;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const DetailPlusIcon = styled(CiCirclePlus)`
  ${DetailCommonIcon}
`;

const DetailMinusIcon = styled(CiCircleMinus)`
  ${DetailCommonIcon}
`;

const ShippingInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ShippingInfo = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
`;

const TruckIcon = styled(BsTruck)`
  font-size: 1.2rem;
`;

const DotCircleIcon = styled(FaDotCircle)`
  font-size: 0.7rem;
  color: green;
  opacity: 0.7;
`;

const Description = styled.textarea`
  resize: none;
  padding: 1rem;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  > span {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
`;

const ArrowDownIcon = styled(MdKeyboardArrowDown)`
  font-size: 1.3rem;
  transition: all 0.5s;
  transform: ${(props) =>
    props.$isNoticeOpen ? "rotate(180deg)" : "rotate(0)"};
`;

const NoticeDetail = styled.p`
  font-size: 0.8rem;
  line-height: 20px;
  transition: all 0.5s;
  margin-top: ${(props) => (props.$isNoticeOpen ? "1rem" : "0")};
  opacity: ${(props) => (props.$isNoticeOpen ? "1" : "0")};
  height: ${(props) => (props.$isNoticeOpen ? "50px" : "0px")};
`;

const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 35px;
  padding: 0.6rem 0.5rem;
  background-color: transparent;
  border: 1px solid rgba(131, 131, 131, 1);
  border-radius: 3px;
  letter-spacing: 1px;
  cursor: pointer;
`;

const FilterArrowDown = styled(MdKeyboardArrowDown)`
  font-size: 1.2rem;
`;

const Options = styled.ul`
  position: absolute;
  top: 100%;
  width: 200px;
  text-indent: 0.6rem;
  border: 1px solid var(--color-dark);
  border-radius: 3px;
  z-index: 50;
  background-color: var(--color-white);
  box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.75);
`;

const Option = styled.li`
  font-size: 0.8rem;
  margin-top: 1px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: var(--color-white);
  }
`;

export default function RegistInfo({
  form,
  handleChange,
  handleItemStocks,
  handleItemStocksAdd,
  handleCategory,
  handlePrice,
}) {
  const [detailCnt, setDetailCnt] = useState(1);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  const handleDetailCnt = (type) => {
    if (type === "plus") {
      if (detailCnt < 10) setDetailCnt((prev) => prev + 1);
    } else {
      if (detailCnt > 1) {
        setDetailCnt((prev) => prev - 1);
      }
    }
    handleItemStocksAdd(type);
  };

  useEffect(() => {
    const handleCategories = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("click", handleCategories);

    return () => document.removeEventListener("click", handleCategories);
  }, []);

  return (
    <Layout>
      <InputWrapper>
        <Label htmlFor="itemName">Product Name</Label>
        <Input
          type="text"
          id="itemName"
          name="itemName"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="price">Price</Label>
        <Input
          type="text"
          id="price"
          name="price"
          value={form.price}
          onChange={handlePrice}
          placeholder="₩ Price"
        />
      </InputWrapper>

      <InputWrapper ref={categoryRef}>
        <Label>Category</Label>
        <FilterBtn
          type="button"
          onClick={() => setIsCategoryOpen((prev) => !prev)}
        >
          <span>{form.categoryName}</span>
          <FilterArrowDown />
        </FilterBtn>
        {isCategoryOpen && (
          <Options>
            {categories.map((category) => (
              <Option key={uuid4()} onClick={() => handleCategory(category)}>
                {category}
              </Option>
            ))}
          </Options>
        )}
      </InputWrapper>

      <Hr />

      {Array.from({ length: detailCnt }, (_, idx) => (
        <Details key={uuid4()}>
          <Detail>
            <Label>Color</Label>
            <DetailColors>
              {colors.map((color) => (
                <DetailColor
                  key={uuid4()}
                  $isSelected={form.itemStocks[idx].color === color}
                  onClick={() => handleItemStocks(idx, "color", color)}
                >
                  <DetailColorInside $color={color}></DetailColorInside>
                </DetailColor>
              ))}
            </DetailColors>
          </Detail>
          <Detail>
            <Label>Size</Label>
            <DetailSizes>
              {sizes.map((size) => (
                <DetailSize
                  key={uuid4()}
                  $isSelected={form.itemStocks[idx].size === size}
                  onClick={() => handleItemStocks(idx, "size", size)}
                >
                  {size}
                </DetailSize>
              ))}
            </DetailSizes>
          </Detail>
          <Detail>
            <Label>Quantity</Label>
            <Quantity
              type="number"
              value={form.itemStocks[idx].stockQty}
              onChange={(e) =>
                handleItemStocks(idx, "stockQty", +e.target.value)
              }
            />
          </Detail>
        </Details>
      ))}
      <AddDetail>
        <DetailPlusIcon onClick={() => handleDetailCnt("plus")} />
        <DetailMinusIcon onClick={() => handleDetailCnt("minus")} />
      </AddDetail>

      <Hr />

      <Description
        name="description"
        cols="30"
        rows="10"
        placeholder="Product Description"
        value={form.description}
        onChange={handleChange}
      ></Description>

      <Hr />

      <ShippingInfos>
        <ShippingInfo>
          <TruckIcon />
          Free shipping for orders over USD$380
        </ShippingInfo>
        <ShippingInfo>
          <DotCircleIcon />
          In stock, ready to ship
        </ShippingInfo>
      </ShippingInfos>

      <Hr />

      <Notice onClick={() => setIsNoticeOpen((prev) => !prev)}>
        <span>NOTICE OF INVENTORY</span>
        <ArrowDownIcon $isNoticeOpen={isNoticeOpen} />
      </Notice>
      <NoticeDetail $isNoticeOpen={isNoticeOpen}>
        Every product of our online store is also on sale at DANTON's physical
        store,
        <br /> so it may have already been sold out when you placed your order.{" "}
        <br /> We hope for your kind understanding.
      </NoticeDetail>
      <Hr />
    </Layout>
  );
}

const sizes = ["S", "M", "L", "XL"];
const colors = ["blue", "red", "black", "white", "beige", "gray"];
const categories = [
  "MEN'S",
  "WOMEN'S",
  "BAGS",
  "HEADWEAR",
  "GOODS",
  "STORE EXCLUSIVE",
];
