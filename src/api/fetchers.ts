import { Axios } from "axios";
import { AxiosInstance } from "./axios";

export const createDogUser = async ({
  ...data
}: {
  token: string | string[] | undefined;
  name: string;
  address: string;
  birth: string;
  picture: string;
  description: string;
  breed: string;
  gender: string;
  isNeutered: boolean;
  age: number;
  weight: number;
  height: number;
  dogMbti: string;
}) => {
  const res = await AxiosInstance.post(`dog`, {
    ...data,
    
  },{
    headers: {
      id: data.token
    }
  });

  return res.data;
};

export const getDogDetail = async (id: string | string[] | undefined, token: string | string[] | undefined) => {
  const res = await AxiosInstance.get(`dog/${id}`, {
    headers: {
      id: token,
    },
  });

  return res.data;
};

export const getAllDogList = async () => {
  const res = await AxiosInstance.get(`dog`);

  return res.data;
};

export const getLikedDogList = async () => {
  const res = await AxiosInstance.get(`dog/like`);

  return res.data;
};

export const postLikeDog = async (id: string) => {
  const res = await AxiosInstance.post(`like`, {
    targetDogId: id,
  });

  return res.data;
};

