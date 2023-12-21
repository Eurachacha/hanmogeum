import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@/components/common/Button";

const ErrorPage = () => {
  return (
    <ErrorPageLayer>
      <img src="/images/emptyTea.png" alt="" />
      <h2>찾으시는 페이지가 없습니다.</h2>
      <p>
        요청하신 주소를 찾을 수 없습니다. <br />
        다시 한번 확인해 주시기 바랍니다.
      </p>
      <Link to="/">
        <Button size="md" variant="point" value="홈으로 돌아가기"></Button>
      </Link>
    </ErrorPageLayer>
  );
};

export default ErrorPage;

const ErrorPageLayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 120px;

  h2 {
    font-size: 2.8rem;
    color: var(--color-gray-300);

    margin-top: 18px;
  }
  p {
    font-size: 1.8rem;
    color: var(--color-gray-200);
    line-height: 2.8rem;

    margin: 14px 0 30px 0;
  }
`;
