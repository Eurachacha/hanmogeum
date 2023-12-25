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
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import TokenExpireModal from "./components/common/TokenExpireModal";

const queryClient = new QueryClient();

const App = () => {
  const setFlattenCodeState = useSetRecoilState(flattenCodeState);
  const setNestedCodeState = useSetRecoilState(nestedCodeState);
  useAxiosInterceptor();

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
      <AppWrapper>
        <Header />
        <ContentsWrapper>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingSpinner />}>
              <TokenExpireModal />
              <Outlet />
            </Suspense>
            {import.meta.env.VITE_DEVELOPMENT_OPTIONS === "TRUE" && <ReactQueryDevtools initialIsOpen={false} />}{" "}
          </QueryClientProvider>
        </ContentsWrapper>
        <Footer />
      </AppWrapper>
    </>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
`;

const ContentsWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 65px;
  height: auto;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;
