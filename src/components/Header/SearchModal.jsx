import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { IoIosSearch, IoIosClose } from "react-icons/io";

const Layout = styled.div`
  position: fixed;
  top: ${(props) => (props.$isModalOpen ? "0" : "-100%")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90px;
  z-index: 1500;
  transition: all 0.3s;
  background-color: var(--color-white);
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  padding: 0 1rem;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchIcon = styled(IoIosSearch)`
  font-size: 1.8rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1.5rem;
  flex: 1 1 auto;
`;

const CloseIcon = styled(IoIosClose)`
  font-size: 2rem;
  cursor: pointer;
`;

const SearchOverlay = ({ isModalOpen, handleModal }) => {
  const [searchWord, setSearchWord] = useState("");

  return (
    <Layout $isModalOpen={isModalOpen}>
      <Box>
        <Search>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search our store"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </Search>
        <CloseIcon onClick={handleModal} />
      </Box>
    </Layout>
  );
};

export default function SearchModal({ isModalOpen, handleModal }) {
  return (
    <>
      {ReactDOM.createPortal(
        <SearchOverlay isModalOpen={isModalOpen} handleModal={handleModal} />,
        document.getElementById("overlay")
      )}
    </>
  );
}
