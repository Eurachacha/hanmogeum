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
  if (!values.extra.pack || values.extra.pack.length <= 0) {
    errors.extra.pack = "포장 형태를 선택해주세요.";
  }
  if (!values.extra.teaType || values.extra.teaType.length <= 0) {
    errors.extra.teaType = "차 종류를 선택해주세요.";
  }
  if (!values.extra.taste || values.extra.taste.length <= 0) {
    errors.extra.taste = "맛을 선택해주세요.";
  }
  if (!values.extra.hashTag || values.extra.hashTag.length <= 0) {
    errors.extra.hashTag = "상황을 선택해주세요.";
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
    <Edit>
      <SimpleForm validate={validateForm}>
        <Labeled source="_id">
          <TextField source="_id" label="상품 ID" />
        </Labeled>
        <Labeled source="name">
          <TextInput source="name" label="상품명" />
        </Labeled>

        <FileInput
          isRequired
          label="상품 이미지 등록"
          source="mainImages"
          placeholder={<p>여기를 클릭하거나 파일을 드래그하여 등록하세요.</p>}
          accept="image/*"
          sx={{
            "& .RaFileInput-dropZone": { padding: "20px 0", width: "50%" },
            "& .RaFileInput-removeButton button": { padding: 0, top: 0 },
            "& svg": { width: 20, height: 20 },
          }}
        >
          <CustomImageField record={record} label="title" customSrc="src" customTitle="title" />
        </FileInput>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: "0 4px" }}>
            <NumberInput step={1000} label="판매가격(원)" source="price" isRequired defaultValue={1000} />
          </div>
          <div style={{ flex: 1, padding: "0 4px" }}>
            <NumberInput step={1} label="수량(개)" source="quantity" isRequired defaultValue={1} />
          </div>
        </div>
        <hr style={{ border: "0.5px solid var(--color-gray-100)", width: "100%" }} />
        <p>상품 세부 정보</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <BooleanInput
            label="베스트상품"
            source="extra.isBest"
            sx={{ "& .MuiFormControlLabel-root": { display: "flex", flexDirection: "column-reverse" } }}
          />
          <BooleanInput
            label="디카페인"
            source="extra.isDecaf"
            sx={{ "& .MuiFormControlLabel-root": { display: "flex", flexDirection: "column-reverse" } }}
          />
          <SelectInput
            isRequired
            label="포장형태"
            source="extra.pack"
            choices={packChoices}
            sx={{ padding: "0 4px" }}
          />
          <SelectInput
            isRequired
            label="차 종류"
            source="extra.teaType"
            choices={teaTypeChoices}
            sx={{ padding: "0 4px" }}
          />
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <SelectArrayInput label="맛" source="extra.taste" choices={tasteChoices} sx={{ padding: "0 4px", flex: 1 }} />
          <SelectArrayInput
            label="상황"
            source="extra.hashTag"
            choices={hashTagChoices}
            sx={{ padding: "0 4px", flex: 1 }}
            helperText="5개 까지만 등록 가능합니다."
          />
        </div>
        {/* TODO: RichTextInput 사용  */}

        <TextInput label="상품 설명" source="content" />
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
