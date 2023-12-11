import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "@/components/common/Button";
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
