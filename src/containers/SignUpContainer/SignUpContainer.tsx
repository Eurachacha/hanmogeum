import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useDaumPostcodePopup } from "react-daum-postcode";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
/* types */
import { InputType, InputProps } from "@/types/input";
import { CommonCustomStyle } from "@/types/customStyle";
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
import { AUTH_TOKEN_KEY } from "@/constants/api";

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

const SignUpContainer = () => {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState<SignUpDataType>({
    email: "",
    password: "",
    passwordAgain: "",
    name: "",
    phoneNumber: "",
    address: "",
    addressDetail: "",
  });
  const [validationMessage, setValidationMessage] = useState({
    email: "",
    password: "",
    passwordAgain: "",
    phoneNumber: "",
  });
  const [showModal, setShowModal] = useState({ isOpen: false, message: "" });
  const [isActiveSignUpButton, setIsActiveSignUpButton] = useState(false);
  const [isActiveEmailButton, setIsActiveEmailButton] = useState(true);
  const setLoggedInUserState = useSetRecoilState(loggedInUserState);
  const [showConfetti, setShowConfetti] = useState(false);

  // 가입하기 버튼을 눌렀을 때 발생하는 이벤트 함수입니다.
  const signUpSubmitClick = async () => {
    const onlyNumberPhone = signUpData.phoneNumber.replace(/[^0-9]/g, "");
    try {
      const response = await userApi.signUpUser({
        email: signUpData.email,
        password: signUpData?.password,
        name: signUpData.name,
        phone: onlyNumberPhone,
        address: `${`${signUpData.address} ${signUpData.addressDetail}`}`,
        type: "user",
        extra: {},
      });
      if (response.data.ok === 1) {
        const credentials = { email: signUpData.email, password: signUpData.password };
        const { data } = await userApi.loginUser(credentials);
        if (data.ok === 1) {
          setLoggedInUserState(data.item);
          localStorage.setItem(AUTH_TOKEN_KEY, data.item.token.accessToken);
          navigate("/?welcome=true");
          setShowConfetti(true);
        }
      }
    } catch (error) {
      console.error(error);
      const signupError = error as SignUpErrorType;
      const errorMessage = signupError.message || "회원가입 중 문제가 발생했습니다.";
      setShowModal({ isOpen: true, message: errorMessage });
      setIsActiveEmailButton(true);
    }
  };

  // 입력 필드가 변경될 때마다 값을 저장하는 함수입니다.
  const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 이메일 중복확인 버튼을 눌렀을때 발생하는 이벤트 함수입니다.
  const emailDuplicateHandleClick = async () => {
    /// users/email?email=s1@market.com
    try {
      const { data } = await userApi.emailDuplicateCheck(signUpData.email);
      if (data.ok === 1) {
        // 사용 가능한 이메일
        setShowModal({ isOpen: true, message: "가입 가능한 이메일 입니다." });
        setIsActiveEmailButton(false);
      } else if (data.ok === 0) {
        // 사용 불가능한 이메일
        setShowModal({ isOpen: true, message: "이미 가입한 이메일 입니다." });
        setIsActiveEmailButton(true);
      }
    } catch (error: unknown) {
      const signupError = error as SignUpErrorType;
      let errorMessage = "";
      if (signupError.response?.status === 409) {
        errorMessage = "이미 등록된 이메일입니다.";
      } else {
        errorMessage = "유효하지 않은 이메일 형식입니다.";
      }
      setShowModal({ isOpen: true, message: errorMessage });
      setIsActiveEmailButton(true);
    }
  };

  // TODO: 커스텀 훅 사용하도록 ㄱ수정
  const openPostcode = useDaumPostcodePopup();
  const addressSearchHandleClick = () => {
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

  // 가입하기 버튼을 눌렀을때 발생하는 이벤트 함수입니다.
  const signUpFormHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // TODO: 다음 useEffect들 커스텀 훅으로 변경
  useEffect(() => {
    if (
      validationMessage.email === "" &&
      validationMessage.password === "" &&
      validationMessage.passwordAgain === "" &&
      validationMessage.phoneNumber === "" &&
      signUpData.name !== "" &&
      isActiveEmailButton === false
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
    if (signUpData.phoneNumber && !/^01[016789]-?\d{3,4}-?\d{4}$/.test(signUpData.phoneNumber)) {
      setValidationMessage((prevState) => ({ ...prevState, phoneNumber: "올바른 휴대폰 번호를 입력해주세요." }));
    } else {
      setValidationMessage((prevState) => ({ ...prevState, phoneNumber: "" }));
    }
  }, [signUpData.phoneNumber]);

  // Input 데이터
  const itemInputData: InputDataType[] = [
    {
      // 이메일
      title: "이메일",
      isTitleImportant: true,
      showValidationMessage: validationMessage.email !== "",
      validationMessage: validationMessage.email,
      inputProps: {
        name: "email",
        type: "email",
        required: true,
        placeholder: "이메일을 입력해주세요.",
        onChange: inputHandleChange,
        value: signUpData.email,
        customStyle: inputCustomStyle,
      },
      includeButton: true,
      buttonValue: "중복확인",
      buttonOnClick: emailDuplicateHandleClick,
      buttonDisabled: isActiveEmailButton === false,
    },
    {
      // 비밀번호
      title: "비밀번호",
      isTitleImportant: true,
      showValidationMessage: validationMessage.password !== "",
      validationMessage: validationMessage.password,
      inputProps: {
        type: "password",
        name: "password",
        required: true,
        placeholder: "비밀번호를 입력해주세요.",
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
      isTitleImportant: true,

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
      isTitleImportant: true,
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
      isTitleImportant: true,
      showValidationMessage: validationMessage.phoneNumber !== "",
      validationMessage: validationMessage.phoneNumber,
      inputProps: {
        type: "tel",
        maxLength: 13,
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
      <div>
        <Modal isOpen={showModal.isOpen} iconRequired={false} message={showModal.message}>
          <CheckModalButton onClick={() => setShowModal({ isOpen: false, message: "" })}>확인</CheckModalButton>
        </Modal>
      </div>
      <NoticeBar>
        <ImportantSpan>*</ImportantSpan>
        <span>필수입력사항</span>
      </NoticeBar>
      <FromWrapper noValidate onSubmit={signUpFormHandleSubmit}>
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
          <Button disabled={!isActiveSignUpButton} value="가입하기" size="lg" variant="point"></Button>
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

const NoticeBar = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid var(--color-gray-200);
  width: 55rem;
  padding-bottom: 0.8rem;
  margin-bottom: 2rem;
  font-size: 1.3rem;
  font-weight: var(----weight-medium);
`;
const ImportantSpan = styled.span`
  color: var(--color-red);
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

const CheckModalButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.8rem 0 0.2rem 0;
  width: 100%;
  border-top: 1px solid var(--color-gray-100);
  color: var(--color-sub-500);
  font-size: 1.6rem;
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  border: none;
  background-color: unset;
  width: 100%;
`;

export default SignUpContainer;
