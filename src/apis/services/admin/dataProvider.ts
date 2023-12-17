import { DataProvider } from "react-admin";
import { privateInstance } from "@/apis/instance";

const dataProvider: DataProvider = {
  getList: async (resource: string) => {
    const response = await privateInstance.get(`/seller/${resource}`);
    const { item } = response.data;
    return { data: item, total: item.length };
  },
  getOne: async (resource, params) => {
    const { data } = await privateInstance.get(`/${resource}/${params.id}`);
    return { data };
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
    const { data } = await privateInstance.put(`/${resource}/${params.id}`, params.data);
    return { data };
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

export default dataProvider;
