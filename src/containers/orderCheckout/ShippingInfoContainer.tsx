import { useState } from "react";
import styled from "styled-components";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import FormInput from "@/components/orderCheckout/FormInput";

const ShippingInfoContainer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return setState(event.target.value);
  };

  const openPostcode = useDaumPostcodePopup();
  const handleAddressSearch = () => {
    openPostcode({
      onComplete: (data) => {
        setAddress(data.address);
        setDetailAddress(data.buildingName ? ` (${data.buildingName})` : "");
      },
    });
  };

  return (
    <ShippingInfoContainerLayer>
      <FormInput title="받는 분">
        <Input
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, setName)}
          value={name}
          placeholder="이름을 입력해주세요."
          inputStyle="normal"
          customStyle={{ padding: "8px", "font-size": "1.4rem" }}
        />
      </FormInput>
      <FormInput title="연락처">
        <Input
          type="tel"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, setPhone)}
          value={phone}
          placeholder="전화번호를 입력해주세요."
          inputStyle="normal"
          customStyle={{ padding: "8px", "font-size": "1.4rem" }}
        />
      </FormInput>
      <FormInput title="주소" $marginBottom="4px">
        <Input
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, setAddress)}
          value={address}
          placeholder="주소를 입력해주세요."
          inputStyle="normal"
          customStyle={{ padding: "8px", "font-size": "1.4rem" }}
        />
        <ButtonWrapper onClick={handleAddressSearch}>
          <Button value="주소검색" size="sm" variant="sub" />
        </ButtonWrapper>
      </FormInput>
      <FormInput title="">
        <InputWrapper>
          <Input
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, setDetailAddress)}
            value={detailAddress}
            placeholder="상세주소를 입력해주세요."
            inputStyle="normal"
            customStyle={{ padding: "8px", "font-size": "1.4rem" }}
          />
        </InputWrapper>
      </FormInput>
    </ShippingInfoContainerLayer>
  );
};

export default ShippingInfoContainer;

const ShippingInfoContainerLayer = styled.div`
  padding-top: 24px;
  min-width: 300px;
`;

const ButtonWrapper = styled.div`
  height: 45px;
  min-width: 72px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
