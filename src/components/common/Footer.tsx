import styled from "styled-components";

const Footer = () => {
  const footerInfo = [
    `(주)으라茶茶  대표이사 김영채, 오연주, 정명진`,
    `서울특별시 강남구 서울특별시 강남구 테헤란로 443, 2층`,
    `contact@eurachacha.com`,
    `사업자등록번호 023-11-01222 사업자정보확인`,
    `통신판매업신고번호 제2023-서울서초-231120호`,
  ];
  const notice = `이 사이트는 포트폴리오용 사이트로 연습용 사이트 입니다.`;

  return (
    <FooterContainer>
      <FooterWrapper>
        <StyledInfo>
          {footerInfo.map((contents, idx) => {
            const itemKey = `${idx}`;
            return <span key={itemKey}>{contents}</span>;
          })}
        </StyledInfo>
        <span>{notice}</span>
      </FooterWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3rem;
  font-weight: var(--weight-thin);
`;

const FooterWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 1280px;
  padding: 3.4rem 0rem 1.5rem 0rem;
  height: 8.5rem;
  border-top: 1px solid var(--color-gray-100);
  text-align: center;
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 60rem;
  margin-bottom: 1.5rem;
`;

export default Footer;
