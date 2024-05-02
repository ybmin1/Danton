import React, { useEffect, useState } from "react";
import ProfileForm from "../common/ProfileForm";

const Modify = () => {
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

  const isSignUp = false;

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

  return <ProfileForm isSignUp={isSignUp} userData={userData} />;
};

export default Modify;
