import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";

//주석.....
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 90px;
`;

const MyPageWrapper = styled.div`
  flex: 1;
  padding-top: 60px;
  padding-bottom: 20px;
  max-width: 1300px;
  margin: 0 auto;
  overflow-y: visible;
`;

const MyPageHeader = styled.div`
  margin-bottom: 50px;
  letter-spacing: 1.5px;
  text-align: center;
`;

const MyPageTitle = styled.h1`
  text-align: center;
  font-weight: 400;
  margin-bottom: 30px;
`;

const Logout = styled.a`
  text-decoration: none;
  border-bottom: 2px solid;
  border-bottom-color: rgba(28, 29, 29, 0.1);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    border-bottom: 2px solid;
    border-bottom-color: #1c1d1d;
    border-bottom-color: var(--colorTextBody);
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const Modify = styled(Link)`
  text-decoration: none;
  border-bottom: 2px solid;
  border-bottom-color: rgba(28, 29, 29, 0.1);
  position: relative;
  margin-left: 150px;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    border-bottom: 2px solid;
    border-bottom-color: #1c1d1d;
    border-bottom-color: var(--colorTextBody);
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const MyPageGrid = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 1000px;
  display: flex;
  justify-content: space-between;
`;
const GridItem = styled.div`
  padding-left: 30px;
  min-height: 1px;
`;

const GridTitle = styled.h3`
  font-weight: 400;
  margin-bottom: 30px;
  font-size: 24px;
  letter-spacing: 1.5px;
`;

const AccoutTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const AccountContent = styled.p`
  margin-bottom: 20px;
`;

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  //initial data는 mockdata로 지워야함 (수정필요)
  const [userData, setUserData] = useState({
    profileImage:
      "https://pbs.twimg.com/profile_images/1103513127759470592/pHGkPPqo_400x400.jpg",
    name: "Lara Jean",
    email: "lara.jean@gmail.com",
    phoneNumber: "07754337668",
    country: "United Kingdom",
    address: "8 Trinity Road",
    city: "London",
    postcode: "N2 7JJ",
    gender: "female",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API로부터 데이터 가져오기
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLogout = async () => {
    //  try {
    //    await axios.post("/api/logout");
    //    setIsLoggedIn(false);
    //  } catch (error) {
    //    console.error("로그아웃 중 에러 발생:", error);
    //  }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppContainer>
      <MyPageWrapper>
        <MyPageHeader>
          <MyPageTitle>My Account</MyPageTitle>
          <Logout href="#" onClick={handleLogout}>
            LOGOUT
          </Logout>
          <Modify to="./modify">MODIFY</Modify>
        </MyPageHeader>
        <MyPageGrid>
          <GridItem>
            <GridTitle>Account details</GridTitle>
            <AccoutTitle>Name</AccoutTitle>
            <AccountContent>{userData && userData.name}</AccountContent>
            <AccoutTitle>Email</AccoutTitle>
            <AccountContent>{userData && userData.email}</AccountContent>
            <AccoutTitle>Profile</AccoutTitle>
            <AccountContent>
              <img
                src={userData && userData.profileImage}
                alt="profileImage"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                }}
              />
            </AccountContent>
            <AccoutTitle>Phone Number</AccoutTitle>
            <AccountContent>{userData && userData.phoneNumber}</AccountContent>
            <AccoutTitle>Address</AccoutTitle>
            <AccountContent>{userData && userData.address}</AccountContent>
            <AccoutTitle>Gender</AccoutTitle>
            <AccountContent>{userData && userData.gender}</AccountContent>
          </GridItem>
          <GridItem>
            <GridTitle>Order History</GridTitle>
            <p>You haven't placed any orders yet.</p>
          </GridItem>
        </MyPageGrid>
      </MyPageWrapper>
    </AppContainer>
  );
};

export default MyPage;
