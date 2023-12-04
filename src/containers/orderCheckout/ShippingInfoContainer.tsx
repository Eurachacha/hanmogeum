import { useState } from "react";
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

  return (
    <>
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button value="주소검색" size="md" variant="sub" />
        </div>
      </FormInput>
      <FormInput title="">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Input
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, setDetailAddress)}
            value={detailAddress}
            placeholder="상세주소를 입력해주세요."
            inputStyle="normal"
            customStyle={{ padding: "8px", "font-size": "1.4rem" }}
          />
        </div>
      </FormInput>
    </>
  );
};

export default ShippingInfoContainer;
