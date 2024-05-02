import { SHA256 } from "crypto-js";
import { useState } from "react";

export default function useForm(formValid, handleEveryValid, handleGenderValid) {
  const [form, setForm] = useState({
    profileImage: "/assets/image/avatar.png",
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    address: "",
    detailAddress: "",
    gender: "",
  });

  // 이름, 이메일, 비밀번호, 비밀번호 확인, 전화번호
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 프로필 이미지
  const handleProfileImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setForm((prev) => ({ ...prev, profileImage: "/assets/image/avatar.png" }));
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) setForm((prev) => ({ ...prev, profileImage: reader.result }));
      };
    }
  };

  // 성별
  const handleGender = (e) => {
    const { name, id } = e.target;
    setForm((prev) => ({ ...prev, [name]: id }));
    handleGenderValid(id);
  };

  // 주소 모달
  const handleAddr = (address) => {
    setForm((prev) => ({ ...prev, address }));
  };

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
      const fullAddress = form.address + form.detailAddress;

      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.set("password", shaPassword);
      formData.append("fullAddress", fullAddress);

      // 회원가입 API 통신 필요
      // const response = fetch("", {
      //   method: "POST",
      //   body: formData,
      // });
    }
  };

  return { form, handleInput, handleSubmit, handleProfileImage, handleGender, handleAddr };
}
