import {
  Edit,
  SimpleForm,
  TextField,
  Labeled,
  SelectInput,
  TextInput,
  NumberInput,
  SelectArrayInput,
  BooleanInput,
  FileInput,
  FileFieldProps,
  ImageField,
  useRecordContext,
} from "react-admin";
import { useRecoilValue } from "recoil";
import { CardMedia } from "@mui/material";
import { nestedCodeState } from "@/recoil/atoms/codeState";
import { MainImageType, ProductDetail } from "@/types/products";

const validateForm = (values: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!values.price) {
    errors.price = "판매가격을 입력해주세요.";
  } else if (values.price <= 0) {
    errors.price = "판매가격은 1원 이상이어야 합니다.";
  }
  if (!values.name || !values.name.replace(/\s/gi, "")) {
    errors.name = "상품명을 입력해주세요.";
  }
  if (!values.quantity) {
    errors.quantity = "수량을 입력해주세요.";
  } else if (values.quantity <= 0) {
    errors.quantity = "수량은 0개 이상이어야 합니다.";
  }
  if (!values.mainImages) {
    errors.mainImages = "이미지를 등록해주세요.";
  }
  if (!values.extra.pack) {
    errors["extra.pack"] = "포장 형태를 선택해주세요.";
  }
  if (!values.extra.teaType) {
    errors["extra.teaType"] = "차 종류를 선택해주세요.";
  }
  if (!values.extra.taste || values.extra.taste.length <= 0) {
    errors["extra.taste"] = "맛을 선택해주세요.";
  }
  if (!values.extra.hashTag || values.extra.hashTag.length <= 0) {
    errors["extra.hashTag"] = "상황을 선택해주세요.";
  } else if (values.extra.hashTag.length > 5) {
    errors.extra.hashTag = "최대 5개까지 등록 가능합니다.";
  }
  if (!values.content || !values.content.trim()) {
    errors.content = "상품 설명은 10글자 이상 입력해야 합니다.";
  }
  return errors;
};

const PreviewImageField = ({ record }: { record: MainImageType }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return (
    <CardMedia component="img" image={baseUrl + record.url} alt="" sx={{ maxWidth: "200px", maxHeight: "200px" }} />
  );
};

const CustomImageField = ({
  customSrc,
  customTitle,
  ...props
}: { customSrc?: string; customTitle?: string } & FileFieldProps) => {
  const record = useRecordContext<MainImageType>();
  if (!record.url) return <ImageField source={customSrc || "src"} title={customTitle || "title"} {...props} />;
  return <PreviewImageField record={record} />;
};

const ProductEdit = () => {
  const nestedCodes = useRecoilValue(nestedCodeState);
  const record = useRecordContext<ProductDetail>();

  const packCodes = nestedCodes?.productCategory.codes[0];
  const packChoices =
    packCodes && packCodes.sub
      ? packCodes.sub.map((obj) => {
          return { id: obj.code, name: obj.value };
        })
      : [{ id: "", name: "" }];

  const teaTypeCodes = nestedCodes?.productCategory.codes[2];
  const teaTypeChoices =
    teaTypeCodes && teaTypeCodes.sub
      ? teaTypeCodes.sub.map((obj) => {
          return { id: obj.code, name: obj.value };
        })
      : [{ id: "", name: "" }];

  const tasteCodes = nestedCodes?.productCategory.codes[3];
  const tasteChoices =
    tasteCodes && tasteCodes.sub
      ? tasteCodes.sub.map((obj) => {
          return { id: obj.code, name: obj.value };
        })
      : [{ id: "", name: "" }];

  const hashTagCodes = nestedCodes?.productCategory.codes[4];
  const hashTagChoices =
    hashTagCodes && hashTagCodes.sub
      ? hashTagCodes.sub.map((obj) => {
          return { id: obj.code, name: obj.value };
        })
      : [{ id: "", name: "" }];

  return (
    <Edit
      sx={{
        "& .RaLabeled-label": {
          minWidth: 120,
        },
        "& span": {
          fontSize: "1.8rem",
          lineHeight: "initial",
        },
        "& input": {
          fontSize: "1.6rem",
        },
        "& .MuiInputBase-input": {
          height: "40px",
          display: "flex",
          alignItems: "center",
        },
        "& .MuiSelect-select": {
          height: "40px",
          display: "flex",
          alignItems: "center",
        },
        "& .MuiChip-root span": {
          fontSize: "1.6rem",
          fontWeight: "var(--weight-semibold)",
          height: "24px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--color-sub-500)",
          color: "var(--color-white)",
          borderRadius: 4,
        },
      }}
    >
      <SimpleForm validate={validateForm}>
        <b style={{ fontSize: "2rem", padding: "12px 0" }}>상품 기본 정보</b>
        <Labeled source="_id" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <TextField source="_id" label="상품 ID" />
        </Labeled>
        <FileInput
          isRequired
          label="상품 이미지"
          source="mainImages"
          placeholder={
            <>
              <p>+</p>
              <span>사진 수정하기</span>
            </>
          }
          accept="image/*"
          sx={{
            flexDirection: "row",
            alignItems: "center",
            "& .RaFileInput-dropZone p": { fontSize: "5rem", marginTop: 5, color: "var(--color-gray-200)" },
            "& .RaFileInput-dropZone span": { color: "var(--color-gray-200)" },
            "& .RaFileInput-dropZone": {
              padding: "20px 0",
              margin: "0 10px",
              width: "200px",
              height: "200px",
              borderRadius: 30,
            },
            "& .RaFileInput-removeButton button": { padding: 0, top: -10, right: -10, position: "absolute" },
            "& svg": { width: 20, height: 20 },
            "& .previews": { position: "relative" },
          }}
        >
          <CustomImageField record={record} label="title" customSrc="src" customTitle="title" />
        </FileInput>

        <Labeled
          isRequired
          source="name"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: "70%",
          }}
        >
          <TextInput isRequired source="name" label="상품명" sx={{ width: "100%" }} />
        </Labeled>

        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: "0 4px" }}>
            <NumberInput step={1000} label="판매가격(원)" source="price" isRequired defaultValue={1000} />
          </div>
          <div style={{ flex: 1, padding: "0 4px" }}>
            <NumberInput step={1} label="수량(개)" source="quantity" isRequired defaultValue={1} />
          </div>
        </div>
        <hr style={{ border: "0.5px solid var(--color-gray-100)", width: "100%" }} />

        <b style={{ fontSize: "2rem", padding: "12px 0" }}>상품 상세 정보</b>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "0 18px",
          }}
        >
          <BooleanInput
            label="베스트상품"
            source="extra.isBest"
            sx={{
              "& .MuiFormControlLabel-root": { display: "flex", flexDirection: "column-reverse" },
              "& span": { fontSize: "1.4rem" },
            }}
          />
          <BooleanInput
            label="디카페인"
            source="extra.isDecaf"
            sx={{
              "& .MuiFormControlLabel-root": { display: "flex", flexDirection: "column-reverse" },
              "& span": { fontSize: "1.4rem" },
            }}
          />
          <SelectInput
            isRequired
            label="포장형태"
            source="extra.pack"
            choices={packChoices}
            sx={{ padding: "0 4px", "& .MuiInputBase-root": { fontSize: "1.4rem", padding: "4px 0" } }}
          />
          <SelectInput
            isRequired
            label="차 종류"
            source="extra.teaType"
            choices={teaTypeChoices}
            sx={{ padding: "0 4px", "& .MuiInputBase-root": { fontSize: "1.4rem", padding: "4px 0" } }}
          />
        </div>
        <div style={{ display: "flex", width: "70%" }}>
          <SelectArrayInput
            isRequired
            label="맛"
            source="extra.taste"
            choices={tasteChoices}
            sx={{ padding: "0 4px", flex: 1 }}
          />
          <SelectArrayInput
            isRequired
            label="상황"
            source="extra.hashTag"
            choices={hashTagChoices}
            sx={{ padding: "0 4px", flex: 1 }}
            helperText="5개 까지만 등록 가능합니다."
          />
        </div>
        <TextInput
          isRequired
          label="상품 설명"
          source="content"
          multiline
          sx={{ width: "70%", "& textarea": { fontSize: "1.4rem", padding: "8px 0" } }}
        />
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
