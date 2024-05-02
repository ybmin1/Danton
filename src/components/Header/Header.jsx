import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonOutline, IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import MenuModal from "./MenuModal";
import CartModal from "./CartModal";
import SearchModal from "./SearchModal";
import Backdrop from "../../common/Backdrop";

const Layout = styled.header`
  position: fixed;
  width: 100%;
  height: 90px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-lightgray);
  z-index: 10;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 0 2rem;
  width: 100%;
  max-width: 1200px;
  min-width: 300px;
  height: 100%;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const CustomLink = styled(Link)`
  font-size: 0px;
`;

const Hamburger = styled(RxHamburgerMenu)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Person = styled(IoPersonOutline)`
  font-size: 1.4rem;
  cursor: pointer;
`;

const Search = styled(IoSearchOutline)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Cart = styled(IoCartOutline)`
  font-size: 1.7rem;
  cursor: pointer;
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isModalOpen = isMenuOpen || isCartOpen || isSearchOpen;

  const handleModal = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else if (isCartOpen) {
      setIsCartOpen(false);
    } else if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  return (
    <Layout>
      <Box>
        <Hamburger onClick={() => setIsMenuOpen(true)} />
        <CustomLink to="/">
          <Logo
            src="https://danton.com/cdn/shop/files/DANTON_PNG_S_55d51f62-6bdc-407e-8d99-3d3187be7640_100x.png?v=1628131833"
            alt="danton"
          />
        </CustomLink>
        <Nav>
          <CustomLink to="/login">
            <Person />
          </CustomLink>
          <Search onClick={() => setIsSearchOpen(true)} />
          <Cart onClick={() => setIsCartOpen(true)} />
        </Nav>
      </Box>

      {ReactDOM.createPortal(
        <Backdrop isModalOpen={isModalOpen} handleModal={handleModal} />,
        document.getElementById("backdrop")
      )}

      <SearchModal isModalOpen={isSearchOpen} handleModal={handleModal} />
      <MenuModal isModalOpen={isMenuOpen} handleModal={handleModal} />
      <CartModal isModalOpen={isCartOpen} handleModal={handleModal} />
    </Layout>
  );
}
