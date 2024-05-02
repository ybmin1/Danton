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
    isCountryTouched: false,
    isCountryValid: false,
    isAddress1Touched: false,
    isAddress1Valid: false,
    isCityTouched: false,
    isCityValid: false,
    isPostcodeTouched: false,
    isPostcodeValid: false,
    isGenderTouched: false,
    isGenderValid: false,
  });
  const [formValidMessage, setFormValidMessage] = useState({
    nameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    passwordCheckErrorMessage: "",
    phoneNumberErrorMessage: "",
    countryErrorMessage: "",
    addressErrorMessage: "",
    cityErrorMessage: "",
    postcodeErrorMessage: "",
    genderErrorMessage: "",
  });

  // 이름 유효성 검사
  const handleNameValid = (value) => {
    let nameErrorMessage = "";

    if (value.length === 0) {
      nameErrorMessage = "Please enter your name";
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
      emailErrorMessage = "Please enter your email address";
    } else if (!isValidReg) {
      emailErrorMessage = "Please enter a valid email address";
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
      passwordErrorMessage = "Please enter your password";
    } else if (!isValidReg) {
      passwordErrorMessage =
        "Use a password that has 8 to 15 characters. Use at least one number, one letter and one special character ";
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
      passwordCheckErrorMessage = "Please confirm your password";
    } else if (!isValidSame) {
      passwordCheckErrorMessage = "Passwords do not match";
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
    const regex = /^\d{7,15}$/;
    const isValidReg = regex.test(value);
    const isValidLength = value.length !== 0;
    let phoneNumberErrorMessage = "";

    if (!isValidLength) {
      phoneNumberErrorMessage = "Please enter your phone number";
    } else if (!isValidReg) {
      phoneNumberErrorMessage =
        "Please enter a valid phone number (7-15 digits)";
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

  // 주소1 유효성 검사
  const handleAddr1Valid = (address) => {
    const isAddress1Valid = address !== "";
    let addressErrorMessage = "";

    if (!isAddress1Valid) {
      addressErrorMessage = "Please enter your address";
    }

    setFormValid((prev) => ({
      ...prev,
      isAddress1Touched: true,
      isAddress1Valid,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      addressErrorMessage,
    }));
  };

  // 시티 유효성 검사
  const handleCityValid = (city) => {
    const isCityValid = city !== "";
    let cityErrorMessage = "";

    if (!isCityValid) {
      cityErrorMessage = "Please enter your city";
    }

    setFormValid((prev) => ({
      ...prev,
      isCityTouched: true,
      isCityValid,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      cityErrorMessage,
    }));
  };

  // 우편번호 유효성 검사
  const handlePostcodeValid = (postcode) => {
    const isPostcodeValid = postcode !== "";
    let postcodeErrorMessage = "";

    if (!isPostcodeValid) {
      postcodeErrorMessage = "Please enter your postcode";
    }

    setFormValid((prev) => ({
      ...prev,
      isPostcodeTouched: true,
      isPostcodeValid,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      postcodeErrorMessage,
    }));
  };

  // 나라 유효성 검사
  const handleCountryValid = (value) => {
    const isCountryValid = value !== "";
    let countryErrorMessage = "";

    if (!isCountryValid) {
      countryErrorMessage = "Please select your country";
    }

    setFormValid((prev) => ({
      ...prev,
      isCountryTouched: true,
      isCountryValid,
    }));
    setFormValidMessage((prev) => ({
      ...prev,
      countryErrorMessage,
    }));
  };

  // 성별 유효성 검사
  const handleGenderValid = (value) => {
    const isGenderValid = value !== "";
    let genderErrorMessage = "";

    if (!isGenderValid) {
      genderErrorMessage = "Please select your gender";
    }

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
      isCountryTouched: true,
      isAddress1Touched: true,
      isCityTouched: true,
      isPostcodeTouched: true,
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
    handleCountryValid,
    handleAddr1Valid,
    handleCityValid,
    handlePostcodeValid,
    handleGenderValid,
    handleEveryValid,
  };
}
