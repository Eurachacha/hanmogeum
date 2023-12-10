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
import Login from "@/components/login/Login";

const LoginContainer = () => {
  return (
    <Login redirectAfterLogin="/">
      <ButtonWrapper>
        <div>
          <Button size="lg" value="로그인" variant="point" />
        </div>
        <div>
          <NavLink to="/signUp">
            <Button size="lg" value="회원가입" variant="sub" />
          </NavLink>
        </div>
      </ButtonWrapper>
    </Login>
  );
};

const ButtonWrapper = styled.div`
  width: 100%;
  & > * {
    height: 5.2rem;
    margin-top: 1.5rem;
  }
`;

export default LoginContainer;
