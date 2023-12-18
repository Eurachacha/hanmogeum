import { DataProvider } from "react-admin";
import { privateInstance } from "@/apis/instance";

const sellerDataProvider: DataProvider = {
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
    const { data } = await privateInstance.post(`/${resource}`, params.data);
    return { data };
  },
  update: async (resource, params) => {
    const response = await privateInstance.patch(`/seller/${resource}/${params.id}`, {
      state: params.data.state,
    });
    const { item } = response.data;
    return { data: item };
  },
  updateMany: async (resource, params) => {
    const promises = params.ids.map((id: string | number) => privateInstance.put(`/${resource}/${id}`, params.data));
    await Promise.all(promises);
    return { data: params.ids };
  },
  delete: async (resource, params) => {
    const { data } = await privateInstance.delete(`/${resource}/${params.id}`);
    return { data };
  },
  deleteMany: async (resource, params) => {
    const promises = params.ids.map((id: string | number) => privateInstance.delete(`/${resource}/${id}`));
    await Promise.all(promises);
    return { data: params.ids };
  },
};

export default sellerDataProvider;
