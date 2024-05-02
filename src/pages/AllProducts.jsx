import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { MdOutlineShare } from "react-icons/md";
import ReactDOM from "react-dom";
import Backdrop from "../common/Backdrop";
import CategoryModal from "../components/Category/CategoryModal";
import { MdKeyboardArrowDown } from "react-icons/md";
import { v4 as uuid4 } from "uuid";
import ProductCard from "../common/ProductCard";
import Pagination from "../common/Pagination";
import useRouting from "../hooks/useRouting";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
`;

const Category = styled.div`
  width: 100%;
  text-align: left;
  font-size: 0.8rem;
`;

const CategoryDetail = styled.span`
  text-transform: uppercase;
`;

const CategoryTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  text-transform: uppercase;
  margin-top: 2rem;
`;

const Utils = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-top: 50px;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  font-size: 0.8rem;
  width: 120px;
  height: 40px;
  background-color: transparent;
  border: 1px solid var(--color-lightgray);
  cursor: pointer;
`;

const Filter = styled.div`
  position: relative;
`;

const ScrollType = styled.div`
  display: flex;
  font-size: 0.8rem;
  width: 290px;
  height: 40px;
  cursor: pointer;
  @media screen and (max-width: 700px) {
    width: 150px;
  }
`;

const TypeScroll = styled.div`
  text-align: center;
  padding: 0.6rem 0.5rem;
  width: 50%;
  border: 1px solid var(--color-lightgray);
  ${(props) => {
    switch (props.$isPagination) {
      case true:
        return css`
          background-color: var(--color-white);
          color: var(--color-black);
        `;
      default:
        return css`
          background-color: var(--color-dark);
          color: var(--color-white);
        `;
    }
  }}
`;

const TypePagination = styled.div`
  text-align: center;
  width: 50%;
  padding: 0.6rem 0.5rem;
  border: 1px solid var(--color-lightgray);
  ${(props) => {
    switch (props.$isPagination) {
      case true:
        return css`
          background-color: var(--color-dark);
          color: var(--color-white);
        `;
      default:
        return css`
          background-color: var(--color-white);
          color: var(--color-black);
        `;
    }
  }}
`;

const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 290px;
  height: 40px;
  padding: 0.6rem 0.5rem;
  background-color: transparent;
  border: ${(props) =>
    props.$isFilterOpen
      ? "2px solid var(--color-dark)"
      : "1px solid var(--color-lightgray)"};
  border-radius: 3px;
  letter-spacing: 1px;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: 150px;
  }
`;

const FilterArrowDown = styled(MdKeyboardArrowDown)`
  font-size: 1.2rem;
`;

const Options = styled.ul`
  position: absolute;
  width: 100%;
  text-indent: 0.6rem;
  border: 1px solid var(--color-dark);
  border-radius: 3px;
  z-index: 50;
  background-color: var(--color-white);
  box-shadow: 0px 0px 13px -1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 13px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 13px -1px rgba(0, 0, 0, 0.75);
`;

const Option = styled.li`
  font-size: 0.8rem;
  margin-top: 1px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-dark);
    color: var(--color-white);
  }
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
  margin: 20px 0 100px 0;

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

export default function AllProducts() {
  const { category } = useParams();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Featured");
  const [isPagination, setIsPagination] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { goToProductDetail } = useRouting();

  console.log(products);
  const lastItemRef = useRef(null);
  const filterRef = useRef(null);

  const handleModal = () => {
    if (isCategoryOpen) {
      setIsCategoryOpen(false);
    }
  };

  const handleFilter = (option) => {
    if (option === "Price, low to high") {
      products.sort((a, b) => a.price - b.price);
    } else if (option === "Price, high to low") {
      products.sort((a, b) => b.price - a.price);
    } else if (option === "Alphabetically, A-Z") {
      products.sort((a, b) => a.description.localeCompare(b.description));
    } else if (option === "Alphabetically, Z-A") {
      products.sort((a, b) => b.description.localeCompare(a.description));
    }

    setSelectedFilter(option);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleOutSideClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("click", handleOutSideClick);
    return () => document.removeEventListener("click", handleOutSideClick);
  }, []);

  // 무한 스크롤
  useEffect(() => {
    const fetchMoreItems = async () => {
      const data = await fetch(
        `https://dummyjson.com/products?limit=16&skip=${page * 16}`
      ).then((res) => res.json());

      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevItems) => [...prevItems, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) fetchMoreItems();
    });

    if (observer && lastItemRef.current) observer.observe(lastItemRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [page, hasMore, isPagination]);

  const handleProductClick = (id) => {
    goToProductDetail(id); // Call the goToProduct function with the product id
  };

  return (
    <Layout>
      <Category>
        <div>
          Home / <CategoryDetail>{category.replace("-", " ")}</CategoryDetail>
        </div>
        <CategoryTitle>{category.replace("-", " ")}</CategoryTitle>
      </Category>

      <Utils>
        <CategoryButton onClick={() => setIsCategoryOpen(true)}>
          <MdOutlineShare />
          CATEGORY
        </CategoryButton>
        <Filter>
          <ScrollType>
            <TypeScroll
              $isPagination={isPagination}
              onClick={() => setIsPagination(false)}
            >
              Scroll
            </TypeScroll>
            <TypePagination
              $isPagination={isPagination}
              onClick={() => setIsPagination(true)}
            >
              Pagination
            </TypePagination>
          </ScrollType>
          <FilterBtn
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            $isFilterOpen={isFilterOpen}
            ref={filterRef}
          >
            <span>{selectedFilter}</span>
            <FilterArrowDown />
          </FilterBtn>
          {isFilterOpen && (
            <Options>
              {filterOptions.map((option) => (
                <Option key={uuid4()} onClick={() => handleFilter(option)}>
                  {option}
                </Option>
              ))}
            </Options>
          )}
        </Filter>
      </Utils>

      <Products>
        {products.map((product) => (
          <ProductCard
            kkey={product.id}
            product={product}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </Products>

      {!isPagination && hasMore && <div ref={lastItemRef}>Loading...</div>}
      {isPagination && <Pagination currentPage={page + 1} lastPage="7" />}

      {ReactDOM.createPortal(
        <Backdrop isModalOpen={isCategoryOpen} handleModal={handleModal} />,
        document.getElementById("backdrop")
      )}
      <CategoryModal isModalOpen={isCategoryOpen} handleModal={handleModal} />
    </Layout>
  );
}

const filterOptions = [
  "Sort",
  "Featured",
  "Best selling",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];
