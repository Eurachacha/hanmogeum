import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useAuthorization from "@/hooks/useAuthorization";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { PrivateRouteProps } from "@/types/routeAuthorization";

const ProtectedRoute = ({
  allowedRoles,
  modalMessage,
  isAdditionalAuthRequired = false,
  location,
}: PrivateRouteProps) => {
  const navigate = useNavigate();
  const isAuthenticatedUser = useAuthorization({ allowedRoles, isAdditionalAuthRequired });
  const [modalOpen, setModalOpen] = useState({ isOpen: false, message: "" });

  useEffect(() => {
    if (modalMessage && modalMessage !== "") {
      setModalOpen((prevState) => {
        return { ...prevState, message: modalMessage };
      });
    }
    if (!isAuthenticatedUser) {
      setModalOpen((prevState) => {
        return { ...prevState, isOpen: true };
      });
    }
  }, [isAuthenticatedUser]);

  const navigateLocation = () => {
    if (typeof location === "number") {
      navigate(location);
    } else {
      navigate(location);
    }
  };

  const modalSubmitHandle = () => {
    setModalOpen((prevState) => {
      return { ...prevState, isOpen: false };
    });

    navigateLocation();
  };

  if (!isAuthenticatedUser) {
    return (
      <ModalWrapper>
        <Modal isOpen={modalOpen.isOpen} message={modalOpen.message}>
          <ButtonWrapper onSubmit={modalSubmitHandle}>
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
