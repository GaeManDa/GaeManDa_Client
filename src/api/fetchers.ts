import { Axios } from "axios";
import { AxiosInstance } from "./axios";
import { Dog } from "../types/Dog";

export const createDogUser = async ({
  ...data
}: {
  token: string;
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
  });
  
  return res.data;
};

export const getDogDetail = async (id: string | string[] | undefined) => {
  const res = await AxiosInstance.get(`dog`, {
    headers: {
      id: id,
    },
  });
  
  return res.data;
};

export const getAllDogList = async () => {
  const res = await AxiosInstance.get(`dog`);
  
  return res.data as Dog[];
};

export const getLikedDogList = async (id: string) => {
  const res = await AxiosInstance.get(`dog/like`, {
    headers: { id },
  });
  
  return res.data as Dog[];
};

export const postLikeDog = async (id: string, userId: string) => {
  const res = await AxiosInstance.post(`like`, {
    targetDogId: id,
  }, {
    headers: { id: userId },
  });
  
  return res.data;
};
