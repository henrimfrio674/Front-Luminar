/* eslint-disable @typescript-eslint/ban-types */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})


export const registerUser = async (
  url: string,
  data: Object,
  setData: Function
) => {
  const response = await api.post(url, data);
  setData(response.data);

  //teste
};

export const login = async (url: string, data: Object, setData: Function) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const find = async (url: string, setData: Function, header: Object) => {
  const response = await api.get(url, header);
  setData(response.data);
};

export const register = async (
  url: string,
  data: Object,
  setData: Function,
  header: Object
) => {
  const response = await api.post(url, data, header);
  setData(response.data);
};

export const update = async (
  url: string,
  data: Object,
  setData: Function,
  header: Object
) => {
  const response = await api.put(url, data, header);
  setData(response.data);
};

export const remove = async (url: string, header: Object) => {
  await api.delete(url, header);
};
