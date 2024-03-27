import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Address from "../common/Address";
import DarkButton from "../common/DarkButton";
import Backdrop from "../common/Backdrop";
import useForm from "../hooks/useForm";
import useFormValidate from "../hooks/useFormValidate";

const Layout = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 90px 0 110px 0;
  padding: 0 2rem;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  margin-top: 60px;
`;

const Title = styled.p`
  font-size: 1.6rem;
  margin: auto;
  margin-bottom: 3rem;
`;

const InputCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1.7rem;
`;

const InputTitle = styled.label`
  font-size: 0.7rem;
  letter-spacing: 2px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 0.6rem;
  flex: 1 1 auto;
  border: 1px solid var(--color-lightgray);
`;

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  color: red;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  cursor: pointer;
`;

const InputFile = styled.input`
  width: 50%;
  display: none;
`;

const RadioOptions = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
`;

const InputRadio = styled.input`
  box-sizing: content-box;
  padding: 1rem;
  cursor: pointer;
`;

const ButtonSubmit = styled.div`
  margin-top: 1.7rem;
`;

export default function SignUp() {
  const {
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
  } = useFormValidate();

  const { form, handleInput, handleSubmit, handleProfileImage, handleGender, handleAddr } = useForm(
    formValid,
    handleEveryValid,
    handleGenderValid
  );
  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const profileImageRef = useRef(null);

  // 우편번호 모달 열림/닫힘
  const handleAddrModal = () => setIsAddrModalOpen((prev) => !prev);

  return (
    <Layout>
      <Form id="signUpForm" onSubmit={handleSubmit}>
        <Title>Create Account</Title>

        <Profile>
          <Image
            src={form.profileImage}
            alt="avatar"
            onClick={() => profileImageRef.current.click()}
          />
          <InputFile
            type="file"
            ref={profileImageRef}
            accept="image/*"
            onChange={handleProfileImage}
          />
        </Profile>

        <InputCard>
          <InputTitle htmlFor="name">NAME</InputTitle>
          <Input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={form.name}
            onChange={handleInput}
            onBlur={() => handleNameValid(form.name)}
            placeholder="이름을 입력해주세요"
          />
          {!formValid.isNameValid && formValid.isNameTouched && (
            <ErrorMessage>{formValidMessage.nameErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <InputCard>
          <InputTitle htmlFor="email">EMAIL</InputTitle>
          <Input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            value={form.email}
            onChange={handleInput}
            onBlur={() => handleEmailValid(form.email)}
            placeholder="이메일을 입력해주세요"
          />
          {!formValid.isEmailValid && formValid.isEmailTouched && (
            <ErrorMessage>{formValidMessage.emailErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <InputCard>
          <InputTitle htmlFor="password">PASSWORD</InputTitle>
          <Input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={form.password}
            onChange={handleInput}
            onBlur={() => handlePasswordValid(form.password)}
            placeholder="비밀번호를 입력해주세요"
          />
          {!formValid.isPasswordValid && formValid.isPasswordTouched && (
            <ErrorMessage>{formValidMessage.passwordErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <InputCard>
          <InputTitle htmlFor="passwordCheck">CHECK PASSWORD</InputTitle>
          <Input
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            autoComplete="off"
            value={form.passwordCheck}
            onChange={handleInput}
            onBlur={() => handlePasswordCheckValid(form.password, form.passwordCheck)}
            placeholder="비밀번호를 확인해주세요"
          />
          {!formValid.isPasswordCheckValid && formValid.isPasswordCheckTouched && (
            <ErrorMessage>{formValidMessage.passwordCheckErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <InputCard>
          <InputTitle htmlFor="phoneNumber">PHONE NUMBER</InputTitle>
          <Input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            autoComplete="off"
            value={form.phoneNumber}
            onChange={handleInput}
            onBlur={() => handlePhoneNumberValid(form.phoneNumber)}
            placeholder="전화번호를 입력해주세요"
          />
          {!formValid.isPhoneNumberValid && formValid.isPhoneNumberTouched && (
            <ErrorMessage>{formValidMessage.phoneNumberErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <InputCard>
          <InputTitle htmlFor="address">ADDRESS</InputTitle>
          <Input
            type="text"
            id="address"
            name="address"
            autoComplete="off"
            value={form.address}
            onChange={handleInput}
            onClick={handleAddrModal}
            readOnly
            placeholder="주소를 입력해주세요"
          />
          {Boolean(form.address) && (
            <>
              <Input
                type="text"
                id="detailAddress"
                name="detailAddress"
                autoComplete="off"
                value={form.detailAddress}
                onChange={handleInput}
                onBlur={() => handleAddrValid(form.detailAddress)}
                placeholder="상세주소를 입력해주세요"
              />
            </>
          )}
          {!formValid.isAddressValid && formValid.isAddressTouched && (
            <ErrorMessage>{formValidMessage.addressErrorMessage}</ErrorMessage>
          )}
        </InputCard>
        {ReactDOM.createPortal(
          <Backdrop isModalOpen={isAddrModalOpen} handleModal={handleAddrModal} />,
          document.getElementById("backdrop")
        )}
        {isAddrModalOpen && <Address handleAddrModal={handleAddrModal} handleAddr={handleAddr} />}

        <InputCard>
          <InputTitle>GENDER</InputTitle>
          <RadioOptions>
            <Option>
              <InputTitle htmlFor="mail">male</InputTitle>
              <InputRadio
                type="radio"
                id="mail"
                name="gender"
                value="mail"
                checked={form.gender === "mail"}
                onChange={handleGender}
              />
            </Option>
            <Option>
              <InputTitle htmlFor="femail">female</InputTitle>
              <InputRadio
                type="radio"
                id="femail"
                name="gender"
                value="femail"
                checked={form.gender === "femail"}
                onChange={handleGender}
              />
            </Option>
            <Option>
              <InputTitle htmlFor="other">other</InputTitle>
              <InputRadio
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={form.gender === "other"}
                onChange={handleGender}
              />
            </Option>
          </RadioOptions>
          {!formValid.isGenderValid && formValid.isGenderTouched && (
            <ErrorMessage>{formValidMessage.genderErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <ButtonSubmit>
          <DarkButton type="submit" text="CREATE" />
        </ButtonSubmit>
      </Form>
    </Layout>
  );
}
