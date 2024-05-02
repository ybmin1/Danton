import { SHA256 } from "crypto-js";
import { useState } from "react";

export default function useForm(
  formValid,
  handleEveryValid,
  handleCountryValid,
  handleGenderValid
) {
  const [form, setForm] = useState({
    profileImage: "/assets/image/avatar.png",
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    country: "",
    address: "",
    city: "",
    postcode: "",
    gender: "",
  });

  // 이름, 이메일, 비밀번호, 비밀번호 확인, 전화번호, 주소1, 주소2, 시티
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 프로필 이미지
  const handleProfileImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setForm((prev) => ({
        ...prev,
        profileImage: "/assets/image/avatar.png",
      }));
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2)
          setForm((prev) => ({ ...prev, profileImage: reader.result }));
      };
    }
  };

  // 국가
  const handleCountry = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value, // 국가 정보 업데이트
    }));
  };

  // 성별
  const handleGender = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    handleGenderValid(value);
  };

  // // 주소 모달
  // const handleAddr1 = (address) => {
  //   setForm((prev) => ({ ...prev, address }));
  // };

  // Form 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    // 전체 유효성 검사
    handleEveryValid();

    const allInputValid = Object.values(formValid).every((valid) => valid);

    if (allInputValid) {
      // 회원가입 진행
      const formData = new FormData();
      const shaPassword = SHA256(form.password).toString();
      //const fullAddress = form.address + form.detailAddress;

      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.set("password", shaPassword);
      //formData.append("fullAddress", fullAddress);

      console.log("유효성검사 모두 통과 및 제출");

      //API 통신
      fetch("", {
        method: "POST",
        body: formData,
      }).catch((error) => {
        console.error("API 통신 에러 발생:", error);
      });
    } else {
      console.log("제출 실패", allInputValid, formValid);
    }
  };

  return {
    form,
    handleInput,
    handleSubmit,
    handleProfileImage,
    handleCountry,
    handleGender,
  };
}
