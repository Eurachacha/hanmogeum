import "@/App.css";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { Suspense, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import codeApi from "@/apis/services/code";
import { flattenCodeState, nestedCodeState } from "@/recoil/atoms/codeState";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ScrollTop from "./components/common/ScrollTop";

const queryClient = new QueryClient();

const App = () => {
  const setFlattenCodeState = useSetRecoilState(flattenCodeState);
  const setNestedCodeState = useSetRecoilState(nestedCodeState);

  // API를 요청하여 Code를 Set해오는 함수
  const getCodeData = async () => {
    try {
      const { data } = await codeApi.getCode();
      setFlattenCodeState(data.item.flatten);
      setNestedCodeState(data.item.nested);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCodeData();
  }, []);

  return (
    <>
      <ScrollTop />
      <Header />
      <ContentsWrapper>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ContentsWrapper>
      <Footer />
    </>
  );
};

export default App;

const ContentsWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 65px;
  min-height: 80vh;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;
