import "@/App.css";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { RecoilRoot } from "recoil";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const App = () => {
  return (
    <RecoilRoot>
      <Header />
      <ContentsWrapper>
        <Outlet />
      </ContentsWrapper>
      <Footer />
    </RecoilRoot>
  );
};

export default App;

const ContentsWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 80vh;
`;
