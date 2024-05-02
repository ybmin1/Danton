import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
//import Address from "../common/Address";
import DarkButton from "../common/DarkButton";
//import Backdrop from "../common/Backdrop";
import useForm from "../hooks/useForm";
import useFormValidate from "../hooks/useFormValidate";
import CountryDropdown from "../components/SignUp/CountryDropdown";

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
  max-width: 500px;
  margin-top: 60px;
`;

const Title = styled.p`
  font-size: 1.6rem;
  margin: auto;
  margin-bottom: 3rem;
`;

const InputCardWrapper = styled.div`
  display: flex;
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
  max-height: 36.8px;
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

const ProfileForm = ({ isSignUp, userData }) => {
  const {
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
  } = useFormValidate();

  const {
    form,
    handleInput,
    handleSubmit,
    handleProfileImage,
    handleCountry,
    handleGender,
  } = useForm(
    formValid,
    handleEveryValid,
    handleCountryValid,
    handleGenderValid
  );
  //const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const profileImageRef = useRef(null);

  return (
    <Layout>
      <Form id="signUpForm" onSubmit={handleSubmit}>
        <Title>{isSignUp ? "Create Account" : "Edit My Details"}</Title>

        <Profile>
          <Image
            src={isSignUp ? form.profileImage : userData.profileImage}
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
            placeholder={isSignUp ? "Please enter your name" : userData.name}
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
            placeholder={isSignUp ? "Please enter your email" : userData.email}
          />
          {!formValid.isEmailValid && formValid.isEmailTouched && (
            <ErrorMessage>{formValidMessage.emailErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <InputCardWrapper>
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
              placeholder="Please enter your password"
            />
            {!formValid.isPasswordValid && formValid.isPasswordTouched && (
              <ErrorMessage>
                {formValidMessage.passwordErrorMessage}
              </ErrorMessage>
            )}
          </InputCard>

          <InputCard>
            <InputTitle htmlFor="passwordCheck">CONFIRM PASSWORD</InputTitle>
            <Input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              autoComplete="off"
              value={form.passwordCheck}
              onChange={handleInput}
              onBlur={() =>
                handlePasswordCheckValid(form.password, form.passwordCheck)
              }
              placeholder="Please confirm your password"
            />
            {!formValid.isPasswordCheckValid &&
              formValid.isPasswordCheckTouched && (
                <ErrorMessage>
                  {formValidMessage.passwordCheckErrorMessage}
                </ErrorMessage>
              )}
          </InputCard>
        </InputCardWrapper>

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
            placeholder={
              isSignUp ? "Please enter your phone number" : userData.phoneNumber
            }
          />
          {!formValid.isPhoneNumberValid && formValid.isPhoneNumberTouched && (
            <ErrorMessage>
              {formValidMessage.phoneNumberErrorMessage}
            </ErrorMessage>
          )}
        </InputCard>

        <InputCard>
          <InputTitle htmlFor="country">COUNTRY</InputTitle>
          <CountryDropdown
            id="country"
            name="country"
            handleCountry={(option) =>
              handleCountryValid("country", option.value)
            }
            isSignUp={isSignUp}
            userData={userData}
          />
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
            onBlur={() => handleAddr1Valid(form.address)}
            placeholder={
              isSignUp ? "Please enter your address" : userData.address
            }
          />

          {!formValid.isAddress1Valid && formValid.isAddress1Touched && (
            <ErrorMessage>{formValidMessage.addressErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <InputCardWrapper>
          <InputCard>
            <InputTitle htmlFor="city">CITY</InputTitle>
            <Input
              type="text"
              id="city"
              name="city"
              autoComplete="off"
              value={form.city}
              onChange={handleInput}
              onBlur={() => handleCityValid(form.city)}
              placeholder={isSignUp ? "Please enter your city" : userData.city}
            />

            {!formValid.isCityValid && formValid.isCityTouched && (
              <ErrorMessage>{formValidMessage.cityErrorMessage}</ErrorMessage>
            )}
          </InputCard>

          <InputCard>
            <InputTitle htmlFor="postcode">POSTCODE</InputTitle>
            <Input
              type="text"
              id="postcode"
              name="postcode"
              autoComplete="off"
              value={form.postcode}
              onChange={handleInput}
              onBlur={() => handlePostcodeValid(form.postcode)}
              placeholder={
                isSignUp ? "Please enter your postcode" : userData.postcode
              }
            />

            {!formValid.isPostcodeValid && formValid.isPostcodeTouched && (
              <ErrorMessage>
                {formValidMessage.postcodeErrorMessage}
              </ErrorMessage>
            )}
          </InputCard>
        </InputCardWrapper>

        {/* {ReactDOM.createPortal(
          <Backdrop
            isModalOpen={isAddrModalOpen}
            handleModal={handleAddrModal}
          />,
          document.getElementById("backdrop")
        )}
        {isAddrModalOpen && (
          <Address handleAddrModal={handleAddrModal} handleAddr={handleAddr} />
        )} */}

        <InputCard>
          <InputTitle>GENDER</InputTitle>
          <RadioOptions>
            <Option>
              <InputTitle htmlFor="male">male</InputTitle>
              <InputRadio
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={
                  isSignUp
                    ? form.gender === "male"
                    : form.gender
                    ? form.gender === "male"
                    : userData.gender === "male"
                }
                onChange={handleGender}
              />
            </Option>
            <Option>
              <InputTitle htmlFor="female">female</InputTitle>
              <InputRadio
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={
                  isSignUp
                    ? form.gender === "female"
                    : form.gender
                    ? form.gender === "female"
                    : userData.gender === "female"
                }
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
                checked={
                  isSignUp
                    ? form.gender === "other"
                    : form.gender
                    ? form.gender === "other"
                    : userData.gender === "other"
                }
                onChange={handleGender}
              />
            </Option>
          </RadioOptions>
          {!formValid.isGenderValid && formValid.isGenderTouched && (
            <ErrorMessage>{formValidMessage.genderErrorMessage}</ErrorMessage>
          )}
        </InputCard>

        <ButtonSubmit>
          <DarkButton
            type="submit"
            text={isSignUp ? "CREATE" : "SAVE DETAILS"}
          />
        </ButtonSubmit>
      </Form>
    </Layout>
  );
};

export default ProfileForm;
