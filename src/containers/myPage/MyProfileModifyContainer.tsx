import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
/* types */
import { InputType, InputProps } from "@/types/input";
import { CommonCustomStyle } from "@/types/customStyle";
import { RequestUpdateUser } from "@/types/users";
/* components */
import ItemInput from "@/components/itemInput/ItemInput";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
/* util */
import autoHyphenPhoneNumber from "@/utils/autoHyphenPhoneNumber";
/* api */
import userApi from "@/apis/services/users";
/* constants */
import PASSWORD_MIN_LENGTH from "@/constants/signUpValidation";
import ContentsTitle from "@/components/contentsTitle/ContentsTitle";
import ContainerHeader from "@/components/myPage/ContainerHeader.";
import additionalAuthState from "@/recoil/atoms/additionalAuthState";
import isValidPhoneNumber from "@/utils/isValidatePhoneNumber";

interface InputDataType {
  title: string;
  showValidationMessage: boolean;
  validationMessage?: string;
  type?: InputType;
  isTitleImportant?: boolean;
  inputProps: InputProps;
  includeButton?: boolean;
  buttonValue?: string;
  buttonOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  buttonDisabled?: boolean;
}

interface SignUpDataType {
  email: string;
  password: string;
  passwordAgain: string;
  name: string;
  phoneNumber: string;
  address: string;
  addressDetail: string;
}

interface SignUpErrorType extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

const inputCustomStyle: CommonCustomStyle = { width: "32rem" };

const MyProfileEditContainer = () => {
  const loggedInUser = useRecoilValue(loggedInUserState);

  const [signUpData, setSignUpData] = useState<SignUpDataType>({
    email: loggedInUser?.email || "",
    password: "",
    passwordAgain: "",
    name: loggedInUser?.name || "",
    phoneNumber: loggedInUser?.phone || "",
    address: loggedInUser?.address || "",
    addressDetail: loggedInUser?.detailAddress || "",
  });
  const [validationMessage, setValidationMessage] = useState({
    email: "",
    password: "",
    passwordAgain: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState({ isOpen: false, message: "", goToPrevPage: false });
  const [isActiveSignUpButton, setIsActiveSignUpButton] = useState(false);
  const [isActiveEmailButton, setIsActiveEmailButton] = useState(true);
  const isAdditionalLogined = useRecoilValue(additionalAuthState);
  const setLoggedInUserState = useSetRecoilState(loggedInUserState);

  // 수정하기 버튼을 눌렀을 때 발생하는 이벤트 함수입니다.
  const signUpSubmitClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const onlyNumberPhone = signUpData.phoneNumber.replace(/[^0-9]/g, "");
    const updateData: RequestUpdateUser = {}; // 빈 객체로 초기화
    if (signUpData?.password) updateData.password = signUpData.password;
    if (signUpData?.name) updateData.name = signUpData.name; // 여기서는 옵셔널 체이닝이 필요 없습니다.
    if (onlyNumberPhone) updateData.phone = onlyNumberPhone;
    if (signUpData.address || signUpData.addressDetail) {
      updateData.address = `${signUpData.address}`;
      updateData.detailAddress = `${signUpData.addressDetail}`;
    }
    try {
      await userApi.updateUserProfile(loggedInUser?._id || -1, updateData);
      const responseUserProfile = await userApi.getUserProfile(loggedInUser?._id || -1);
      setLoggedInUserState(responseUserProfile.data.item);
      setShowModal((prevState) => ({ ...prevState, isOpen: true, message: "수정이 완료되었습니다." }));
    } catch (error) {
      console.error(error);
      const signupError = error as SignUpErrorType;
      const errorMessage = signupError.message || "회원가입 중 문제가 발생했습니다.";
      setShowModal((prevState) => ({ ...prevState, isOpen: true, message: errorMessage }));

      setIsActiveEmailButton(true);
    }
  };

  const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openPostcode = useDaumPostcodePopup();
  const addressSearchHandleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    openPostcode({
      onComplete: (data) => {
        // 주소 검색 결과 처리
        const fullAddress = data.address;
        const extraAddress = data.buildingName ? ` (${data.buildingName})` : "";
        setSignUpData((prevState) => ({
          ...prevState,
          address: fullAddress,
          addressDetail: extraAddress,
        }));
      },
    });
  };

  const modalClickHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (showModal.goToPrevPage) {
      navigate("/myPage/profile");
    }
    setShowModal((prevState) => {
      return { ...prevState, isOpen: false };
    });
  };

  useEffect(() => {
    if (
      validationMessage.password === "" &&
      validationMessage.passwordAgain === "" &&
      validationMessage.phoneNumber === ""
    ) {
      setIsActiveSignUpButton(true);
    } else {
      setIsActiveSignUpButton(false);
    }
  }, [signUpData, validationMessage, isActiveEmailButton]);

  useEffect(() => {
    setIsActiveEmailButton(true);
    if (signUpData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email)) {
      setValidationMessage((prevState) => ({ ...prevState, email: "유효한 이메일 주소를 입력해주세요." }));
    } else {
      setValidationMessage((prevState) => ({ ...prevState, email: "" }));
    }
  }, [signUpData.email]);

  useEffect(() => {
    if (signUpData.password && signUpData.password.length < PASSWORD_MIN_LENGTH) {
      setValidationMessage((prevState) => ({ ...prevState, password: "패스워드는 8글자 이상으로 입력해주세요." }));
    } else {
      setValidationMessage((prevState) => ({ ...prevState, password: "" }));
    }
  }, [signUpData.password]);

  useEffect(() => {
    if (signUpData.passwordAgain && signUpData.password !== signUpData.passwordAgain) {
      setValidationMessage((prevState) => ({ ...prevState, passwordAgain: "동일한 패스워드로 입력해주세요." }));
    } else {
      setValidationMessage((prevState) => ({ ...prevState, passwordAgain: "" }));
    }
  }, [signUpData.passwordAgain, signUpData.password]);
  useEffect(() => {
    const formattingPhoneNumber = autoHyphenPhoneNumber(signUpData.phoneNumber);
    setSignUpData((prevState) => ({ ...prevState, phoneNumber: formattingPhoneNumber }));
    if (signUpData.phoneNumber && !isValidPhoneNumber(signUpData.phoneNumber)) {
      setValidationMessage((prevState) => ({ ...prevState, phoneNumber: "올바른 휴대폰 번호를 입력해주세요." }));
    } else {
      setValidationMessage((prevState) => ({ ...prevState, phoneNumber: "" }));
    }
  }, [signUpData.phoneNumber]);

  useEffect(() => {
    if (!isAdditionalLogined) {
      setShowModal({ isOpen: true, goToPrevPage: true, message: "추가 로그인이 필요합니다." });
    }
  }, []);

  // Input 데이터
  const itemInputData: InputDataType[] = [
    {
      // 이메일
      title: "이메일",
      isTitleImportant: false,
      showValidationMessage: validationMessage.email !== "",
      validationMessage: validationMessage.email,
      inputProps: {
        name: "email",
        type: "email",
        required: true,
        placeholder: "이메일을 입력해주세요.",
        onChange: inputHandleChange,
        value: loggedInUser?.email || "",
        customStyle: { width: "32rem", color: "var(--color-gray-200)" },
      },
    },
    {
      // 비밀번호
      title: "비밀번호",
      isTitleImportant: false,
      showValidationMessage: validationMessage.password !== "",
      validationMessage: validationMessage.password,
      inputProps: {
        type: "password",
        name: "password",
        required: true,
        placeholder: "변경할 비밀번호를 입력해주세요.",
        onChange: inputHandleChange,
        value: signUpData.password,
        customStyle: inputCustomStyle,
      },
      includeButton: false,
    },
    {
      // 비밀번호 확인
      title: "비밀번호 확인",
      showValidationMessage: validationMessage.passwordAgain !== "",
      validationMessage: validationMessage.passwordAgain,
      isTitleImportant: false,

      inputProps: {
        type: "password",
        name: "passwordAgain",
        required: true,
        placeholder: "비밀번호를 한번 더 입력해주세요.",
        onChange: inputHandleChange,
        value: signUpData.passwordAgain,
        customStyle: inputCustomStyle,
      },
      includeButton: false,
    },
    {
      // 이름
      title: "이름",
      showValidationMessage: false,
      isTitleImportant: false,
      inputProps: {
        type: "text",
        name: "name",
        required: true,
        placeholder: "이름을 입력해주세요",
        onChange: inputHandleChange,
        value: signUpData.name,
        customStyle: inputCustomStyle,
      },
      includeButton: false,
    },
    {
      // 휴대폰 번호
      title: "휴대폰",
      isTitleImportant: false,
      showValidationMessage: validationMessage.phoneNumber !== "",
      validationMessage: validationMessage.phoneNumber,
      inputProps: {
        type: "tel",
        maxLength: 17,
        name: "phoneNumber",
        placeholder: "숫자만 입력해주세요.",
        onChange: inputHandleChange,
        value: signUpData.phoneNumber,
        customStyle: inputCustomStyle,
      },
      includeButton: false,
    },
    {
      // 주소
      title: "주소",
      showValidationMessage: false,
      isTitleImportant: false,
      inputProps: {
        type: "text",
        name: "address",
        disabled: true,
        placeholder: "주소 검색",
        onChange: inputHandleChange,
        value: signUpData.address,
        customStyle: inputCustomStyle,
      },
      includeButton: true,
      buttonValue: "주소검색",
      buttonOnClick: addressSearchHandleClick,
    },
    {
      // 상세 주소
      title: "상세주소",
      showValidationMessage: false,
      isTitleImportant: false,
      inputProps: {
        type: "text",
        name: "addressDetail",
        placeholder: "상세 주소를 입력해주세요.",
        onChange: inputHandleChange,
        value: signUpData.addressDetail,
        customStyle: inputCustomStyle,
      },
    },
  ];

  return (
    <SignUpContainerLayer>
      <ContainerHeader title="내 정보 변경" />
      <ContentsTitle title="내 정보 변경"></ContentsTitle>
      <ModalWrapper>
        <Modal isOpen={showModal.isOpen} iconRequired={false} message={showModal.message}>
          <CheckModalButton type="submit" onClick={modalClickHandle}>
            확인
          </CheckModalButton>
        </Modal>
      </ModalWrapper>
      <FromWrapper noValidate>
        <InputListStyle>
          {itemInputData.map((itemInput) => {
            return (
              <ItemWrapper key={`${itemInput.inputProps.name}_ItemWrapper`}>
                <ItemInput
                  key={`${itemInput.inputProps.name}_ItemInput`}
                  title={itemInput.title}
                  isTitleImportant={itemInput.isTitleImportant}
                  showValidationMessage={itemInput.showValidationMessage}
                  validationMessage={itemInput.validationMessage}
                  includeButton={itemInput.includeButton}
                  inputProps={{ ...itemInput.inputProps }}
                  buttonValue={itemInput?.buttonValue}
                  buttonOnClick={itemInput?.buttonOnClick}
                  buttonDisabled={itemInput?.buttonDisabled}
                />
              </ItemWrapper>
            );
          })}
        </InputListStyle>

        <ButtonWrapper onClick={signUpSubmitClick}>
          <Button disabled={!isActiveSignUpButton} value="수정완료" size="lg" variant="point"></Button>
        </ButtonWrapper>
      </FromWrapper>
    </SignUpContainerLayer>
  );
};

const SignUpContainerLayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FromWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 55rem;
  gap: 5rem;
  input:invalid {
    border: 1px solid -var(--color-red);
  }
`;

const InputListStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckModalButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 1.8rem 0 0.2rem 0;
  background-color: inherit;
  border: none;
  width: 100%;
  font-weight: var(--weight-semibold);
  border-top: 1px solid var(--color-gray-100);
  color: var(--color-sub-500);
  font-size: 1.6rem;
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  border: none;
  background-color: unset;
  width: 100%;
  button {
    font-weight: var(--weight-semibold);
  }
`;
const ModalWrapper = styled.div`
  font-weight: var(--weight-medium);
`;

export default MyProfileEditContainer;
