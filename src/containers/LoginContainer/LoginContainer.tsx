import { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import userApi from "@/apis/services/users";
// component
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
// constant
import { AUTH_TOKEN_KEY } from "@/constants/api";

const LoginContainer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLoggedInUserState = useSetRecoilState(loggedInUserState);
  const [showLoginCheckAlert, setShowLoginCheckAlert] = useState(false);
  const loginFailMessage = "아이디와 패스워드를 확인해주세요.";

  const loginHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const credentials = { email, password };
      const { data } = await userApi.loginUser(credentials);
      if (data.ok === 1) {
        setLoggedInUserState(data.item);
        navigate("/");
        localStorage.setItem(AUTH_TOKEN_KEY, data.item.token.accessToken);
      }
    } catch (error) {
      setShowLoginCheckAlert(true);
    }
  };

  return (
    <LoginContainerLayer onSubmit={loginHandleSubmit}>
      <InputWrapper>
        {showLoginCheckAlert && (
          <LoginCheckModalWrapper>
            <Modal isOpen={showLoginCheckAlert} iconRequired={false} message={loginFailMessage}>
              <LoginCheckModalButton
                onClick={() => {
                  setShowLoginCheckAlert(false);
                }}
              >
                확인
              </LoginCheckModalButton>
            </Modal>
          </LoginCheckModalWrapper>
        )}
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </InputWrapper>
      <ButtonWrapper>
        <div>
          <Button size="lg" value="로그인" variant="point" />
        </div>
        <div>
          <NavLink to="/signUp">
            <Button size="lg" value="화원가입" variant="sub" />
          </NavLink>
        </div>
      </ButtonWrapper>
    </LoginContainerLayer>
  );
};

const LoginContainerLayer = styled.form`
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 28rem;
  max-width: 34rem;
`;

const LoginCheckModalWrapper = styled.div`
  position: absolute;
  color: var(--color-black);
  font-weight: var(--weight-bold);
`;
const LoginCheckModalButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.8rem 0 0.2rem 0;
  width: 100%;
  border-top: 1px solid var(--color-gray-100);
  color: var(--color-sub-500);
  font-size: 1.6rem;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  input {
    width: 100%;
    height: 5rem;
    margin-bottom: 1.4rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  & > * {
    height: 5.2rem;
    margin-top: 1.5rem;
  }
`;

export default LoginContainer;
