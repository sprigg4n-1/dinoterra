import { BASE_URL_DINO } from "@/config/config";
import axios from "axios";

export const getDinos = async () => {
  try {
    const response = await axios.get(`${BASE_URL_DINO}/dinos`);

    return response.data;
  } catch (error) {
    console.error(`Error with getting dinos: ${error}`);
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
  diet: string,
  dietDescription: string,
  period: string,
  periodDescription: string
) => {
  try {
    const response = await axios.post(`${BASE_URL_DINO}/dinos`, {
      name: name,
      latinName: latinName,
      description: description,
      diet: diet,
      dietDescription: dietDescription,
      period: period,
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
  diet: string,
  dietDescription: string,
  period: string,
  periodDescription: string
) => {
  try {
    const response = await axios.put(`${BASE_URL_DINO}/dinos/${id}`, {
      name: name,
      latinName: latinName,
      description: description,
      diet: diet,
      dietDescription: dietDescription,
      period: period,
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
