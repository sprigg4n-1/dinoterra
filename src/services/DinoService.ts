import axios from "axios";

import { BASE_URL_DINO } from "@/config/config";

export const getDinos = async (
  limit: number = 12,
  page: number = 0,
  name?: string,
  type?: string,
  diet?: string,
  period?: string,
  placeLocation?: string
) => {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("size", limit.toString());

    if (name?.trim()) params.append("name", name.trim());
    if (type?.trim()) params.append("type", type.trim());
    if (diet?.trim()) params.append("diet", diet.trim());
    if (period?.trim()) params.append("period", period.trim());
    if (placeLocation?.trim())
      params.append("placeLocation", placeLocation.trim());

    const response = await axios.get(`${BASE_URL_DINO}/dinos`, { params });

    return response.data;
  } catch (error) {
    console.error(`Error with getting dinos: ${error}`);
  }
};

export const getFiveRandomDinos = async () => {
  try {
    const response = await axios.get(`${BASE_URL_DINO}/fiveRandomDinos`);

    return response.data;
  } catch (error) {
    console.error(`Error with getting five random dinos: ${error}`);
  }
};

export const getSimilarDinos = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL_DINO}/similarDinos/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with getting similar dinos: ${error}`);
  }
};

export const getDinoById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL_DINO}/dinos/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with getting dino: ${error}`);
  }
};

export const createDino = async (
  name: string,
  latinName: string,
  description: string,
  typeOfDino: string,
  length: number,
  weight: number,
  diet: string,
  dietDescription: string,
  period: string,
  periodDate: string,
  periodDescription: string
) => {
  try {
    const response = await axios.post(`${BASE_URL_DINO}/dinos`, {
      name: name,
      latinName: latinName,
      description: description,
      typeOfDino: typeOfDino,
      length: length,
      weight: weight,
      diet: diet,
      dietDescription: dietDescription,
      period: period,
      periodDate: periodDate,
      periodDescription: periodDescription,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with create dino: ${error}`);
  }
};

export const changeDino = async (
  id: number,
  name: string,
  latinName: string,
  description: string,
  typeOfDino: string,
  length: number,
  weight: number,
  diet: string,
  dietDescription: string,
  period: string,
  periodDate: string,
  periodDescription: string
) => {
  try {
    const response = await axios.put(`${BASE_URL_DINO}/dinos/${id}`, {
      name: name,
      latinName: latinName,
      description: description,
      typeOfDino: typeOfDino,
      length: length,
      weight: weight,
      diet: diet,
      dietDescription: dietDescription,
      period: period,
      periodDate: periodDate,
      periodDescription: periodDescription,
    });

    return response.data;
  } catch (error) {
    console.error(`Error with changing dino: ${error}`);
  }
};

export const deleteDino = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL_DINO}/dinos/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with deleting dino: ${error}`);
  }
};
