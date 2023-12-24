import { useRecoilState } from "recoil";
import Modal from "./Modal";
import tokenExpireModalState from "@/recoil/atoms/tokenExpireModalState";
import Button from "./Button";

const TokenExpireModal = () => {
  const [isTokenExpireModalOpen, setIsTokenExpireModalOpen] = useRecoilState(tokenExpireModalState);

  const handleModal = () => {
    setIsTokenExpireModalOpen(false);
    window.location.assign("/login");
  };

  return (
    <div style={{ zIndex: 99999 }}>
      <Modal isOpen={isTokenExpireModalOpen} message="토큰이 만료되었습니다.\n로그인 페이지로 이동합니다.">
        <Button value="확인" size="sm" variant="sub" onClick={handleModal} />
      </Modal>
    </div>
  );
};

export default TokenExpireModal;
