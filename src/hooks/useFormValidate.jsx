import { useState } from "react";

export default function useFormValidate() {
  const [formValid, setFormValid] = useState({
    isNameTouched: false,
    isEmailTouched: false,
    isEmailValid: false,
    isPasswordTouched: false,
    isPasswordValid: false,
    isPasswordCheckTouched: false,
    isPasswordCheckValid: false,
    isPhoneNumberTouched: false,
    isPhoneNumberValid: false,
    isAddressTouched: false,
    isAddressValid: false,
    isGenderTouched: false,
    isGenderValid: false,
  });
  const [formValidMessage, setFormValidMessage] = useState({
    nameErrorMessage: "이름을 입력해주세요.",
    emailErrorMessage: "이메일을 입력해주세요.",
    passwordErrorMessage: "비밀번호를 입력해주세요.",
    passwordCheckErrorMessage: "비밀번호를 확인해주세요.",
    phoneNumberErrorMessage: "전화번호를 입력해주세요.",
    addressErrorMessage: "주소를 입력해주세요.",
    genderErrorMessage: "성별을 선택해주세요.",
  });

  // 이름 유효성 검사
  const handleNameValid = (value) => {
    let nameErrorMessage = "";

    if (value.length === 0) {
      nameErrorMessage = "이름을 입력해주세요.";
    }

    setFormValid((prev) => ({
      ...prev,
      isNameTouched: true,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      nameErrorMessage,
    }));
  };

  // 이메일 유효성 검사
  const handleEmailValid = (value) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    const isValidReg = regex.test(value);
    const isValidLength = value.length !== 0;
    let emailErrorMessage = "";

    if (!isValidLength) {
      emailErrorMessage = "이메일을 입력해주세요.";
    } else if (!isValidReg) {
      emailErrorMessage = "이메일 형식을 확인해주세요.";
    }

    setFormValid((prev) => ({
      ...prev,
      isEmailTouched: true,
      isEmailValid: isValidLength && isValidReg,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      emailErrorMessage,
    }));
  };

  // 비밀번호 유효성 검사
  const handlePasswordValid = (value) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const isValidReg = regex.test(value);
    const isValidLength = value.length !== 0;
    let passwordErrorMessage = "";

    if (!isValidLength) {
      passwordErrorMessage = "비밀번호를 입력해주세요.";
    } else if (!isValidReg) {
      passwordErrorMessage = "비밀번호 형식을 확인해주세요.";
    }

    setFormValid((prev) => ({
      ...prev,
      isPasswordTouched: true,
      isPasswordValid: isValidLength && isValidReg,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      passwordErrorMessage,
    }));
  };

  // 비밀번호 확인 유효성 검사
  const handlePasswordCheckValid = (password, passwordCheck) => {
    const isValidLength = passwordCheck.length !== 0;
    const isValidSame = password === passwordCheck;
    let passwordCheckErrorMessage = "";

    if (!isValidLength) {
      passwordCheckErrorMessage = "비밀번호 확인을 진행해주세요.";
    } else if (!isValidSame) {
      passwordCheckErrorMessage = "비밀번호가 일치하지 않습니다.";
    }

    setFormValid((prev) => ({
      ...prev,
      isPasswordCheckTouched: true,
      isPasswordCheckValid: isValidLength && isValidSame,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      passwordCheckErrorMessage,
    }));
  };

  // 전화번호 유효성 검사
  const handlePhoneNumberValid = (value) => {
    const regex = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    const isValidReg = regex.test(value);
    const isValidLength = value.length !== 0;
    let phoneNumberErrorMessage = "";

    if (!isValidLength) {
      phoneNumberErrorMessage = "전화번호를 입력해주세요.";
    } else if (!isValidReg) {
      phoneNumberErrorMessage = "전화번호 형식을 확인해주세요.";
    }

    setFormValid((prev) => ({
      ...prev,
      isPhoneNumberTouched: true,
      isPhoneNumberValid: isValidLength && isValidReg,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      phoneNumberErrorMessage,
    }));
  };

  // 주소 유효성 검사
  const handleAddrValid = (address) => {
    const isAddressValid = address !== "";
    let addressErrorMessage = "주소를 입력해주세요.";

    setFormValid((prev) => ({
      ...prev,
      isAddressTouched: true,
      isAddressValid,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      addressErrorMessage,
    }));
  };

  // 성별 유효성 검사
  const handleGenderValid = (value) => {
    const isGenderValid = value === "" ? false : true;
    const genderErrorMessage = "성별을 선택해주세요.";

    setFormValid((prev) => ({
      ...prev,
      isGenderTouched: true,
      isGenderValid,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      genderErrorMessage,
    }));
  };

  // 전체 유효성 검사 (Submit 시)
  const handleEveryValid = () => {
    setFormValid((prev) => ({
      ...prev,
      isNameTouched: true,
      isEmailTouched: true,
      isPasswordTouched: true,
      isPasswordCheckTouched: true,
      isPhoneNumberTouched: true,
      isAddressTouched: true,
      isGenderTouched: true,
    }));
  };

  return {
    formValid,
    formValidMessage,
    handleNameValid,
    handleEmailValid,
    handlePasswordValid,
    handlePasswordCheckValid,
    handlePhoneNumberValid,
    handleAddrValid,
    handleGenderValid,
    handleEveryValid,
  };
}
