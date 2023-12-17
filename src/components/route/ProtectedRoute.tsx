import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useAuthorization from "@/hooks/useAuthorization";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { PrivateRouteProps } from "@/types/routeAuthorization";

const ProtectedRoute = ({ allowedRoles, modalMessage, location }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const isAuthenticatedUser = useAuthorization({ allowedRoles });
  const [modalOpen, setModalOpen] = useState({ isOpen: false, message: "" });

  useEffect(() => {
    if (modalMessage && modalMessage !== "") {
      setModalOpen({ isOpen: true, message: modalMessage });
    } else {
      navigateLocation();
    }
  }, []);

  const navigateLocation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof location === "number") {
      navigate(location);
    } else {
      navigate(location);
    }
  };

  if (!isAuthenticatedUser) {
    return (
      <ModalWrapper>
        <Modal isOpen={modalOpen.isOpen} message={modalOpen.message}>
          <ButtonWrapper onSubmit={navigateLocation}>
            <Button value="확인" size="sm" variant="point" />
          </ButtonWrapper>
        </Modal>
      </ModalWrapper>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

const ModalWrapper = styled.div`
  font-weight: var(--weight-semibold);
  text-align: center;
`;

const ButtonWrapper = styled.form`
  width: 100%;
`;
