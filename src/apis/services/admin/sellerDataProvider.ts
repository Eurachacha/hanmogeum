import { withLifecycleCallbacks } from "react-admin";
import { fileUploadInstance, privateInstance } from "@/apis/instance";
import { ResponseAttachFile } from "@/types/file";

const createImageFormData = (params: any) => {
  const formData = new FormData();
  if (params.data.mainImages && params.data.mainImages?.length > 0) {
    formData.append("attach", params.data.mainImages[0].rawFile);
  }
  return formData;
};

const sellerDataProvider = withLifecycleCallbacks(
  {
    getList: async (resource: string) => {
      const response = await privateInstance.get(`/seller/${resource}`);
      const { item } = response.data;
      return { data: item, total: item.length };
    },
    getOne: async (resource, params) => {
      const response = await privateInstance.get(`/seller/${resource}/${params.id}`);
      const { item } = response.data;
      return { data: item };
    },
    getMany: async (resource, params) => {
      const { data } = await privateInstance.get(`/${resource}?ids=${params.ids.join(",")}`);
      return { data };
    },
    getManyReference: async (resource, params) => {
      const { data } = await privateInstance.get(`/${resource}?target=${params.target}&id=${params.id}`);
      return { data, total: data.length };
    },
    create: async (resource, params) => {
      const { data } = await privateInstance.post(`/seller/${resource}`, params.data);
      return { data: { ...data, id: data._id } };
    },
    update: async (resource, params) => {
      const response = await privateInstance.patch(
        `/seller/${resource}/${params.id}`,
        resource === "orders"
          ? {
              state: params.data.state,
            }
          : params.data,
      );
      const { item } = response.data;
      return { data: item };
    },
    updateMany: async (resource, params) => {
      const promises = params.ids.map((id: string | number) => privateInstance.put(`/${resource}/${id}`, params.data));
      await Promise.all(promises);
      return { data: params.ids };
    },
    delete: async (resource, params) => {
      const { data } = await privateInstance.delete(`/seller/${resource}/${params.id}`);
      return { data };
    },
    deleteMany: async (resource, params) => {
      const promises = params.ids.map((id: string | number) => privateInstance.delete(`/seller/${resource}/${id}`));
      await Promise.all(promises);
      return { data: params.ids };
    },
  },
  [
    {
      resource: "products",
      beforeCreate: async (params: any) => {
        const formData = createImageFormData(params);
        const { data: fileResponseData } = await fileUploadInstance.post<ResponseAttachFile>("/files", formData);
        const { file } = fileResponseData;
        const pack = [params.data.extra.pack];
        const teaType = [params.data.extra.teaType];
        const { price, show, name, quantity, buyQuantity, content } = params.data;
        return {
          data: {
            active: true,
            price,
            show,
            name,
            quantity,
            buyQuantity,
            content,
            mainImages: [{ url: file.path, fileName: file.name, orgName: file.originalname }],
            extra: {
              ...params.data.extra,
              pack,
              teaType,
            },
          },
        };
      },
      beforeUpdate: async (params) => {
        const newData = {
          id: params.id,
          data: {
            ...params.data,
            mainImages: [params.data.mainImages],
          },
          previousData: params.previousData,
        };
        const formData = createImageFormData(newData);
        try {
          const { data: fileResponseData } = await fileUploadInstance.post<ResponseAttachFile>("/files", formData);
          const { file } = fileResponseData;

          const updatedData = {
            id: params.id,
            data: {
              ...params.data,
              mainImages: [{ url: file.path, fileName: file.name, orgName: file.originalname }],
            },
            previousData: params.previousData,
          };

          return updatedData;
        } catch (error) {
          console.error("이미지 업로드 중 오류 발생", error);
          const errorResponse = params;

          return errorResponse;
        }
        // }
        return params;
      },
    },
  ],
);

export default sellerDataProvider;
