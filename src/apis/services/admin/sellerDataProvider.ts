import { withLifecycleCallbacks } from "react-admin";
import { fileUploadInstance, privateInstance } from "@/apis/instance";
import { ResponseAttachFile } from "@/types/file";

interface GetListParams {
  pagination: { page: number; perPage: number };
  sort: { field: string; order: "ASC" | "DESC" };
  filter: any;
  meta?: any;
}

const createImageFormData = (params: any) => {
  const formData = new FormData();
  formData.append("attach", params.data.mainImages.rawFile);
  return formData;
};

const sellerDataProvider = withLifecycleCallbacks(
  {
    getList: async (resource: string, params: GetListParams) => {
      const response = await privateInstance.get(
        `/seller/${resource}?page=${params.pagination.page}&limit=${params.pagination.perPage}&sort={"${
          params.sort.field
        }":${params.sort.order === "ASC" ? "-1" : ""}${params.sort.order === "DESC" ? "1" : ""}}`,
      );
      const { item, pagination } = response.data;
      return {
        data: item,
        total: pagination.total,
        pageInfo: {
          hasNextPage: pagination.totalPages - pagination.page > 0,
          hasPreviousPage: pagination.page !== 1,
        },
      };
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
            pack: [params.data.extra.pack],
            teaType: [params.data.extra.teaType],
            mainImages: [params.data.mainImages],
          },
          previousData: params.previousData,
        };
        const formData = createImageFormData(newData);
        try {
          const { data: fileResponseData } = await fileUploadInstance.post<ResponseAttachFile>("/files", formData);
          const { file } = fileResponseData;

          if (!file) return params;
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
      },
    },
  ],
);

export default sellerDataProvider;
