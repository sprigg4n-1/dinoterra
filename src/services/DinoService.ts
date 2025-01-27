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

export const createDino = async (
  name: string,
  description: string,
  diet: string,
  dietDescription: string,
  period: string,
  periodDescription: string
) => {
  try {
    const response = await axios.post(`${BASE_URL_DINO}/dinos`, {
      name: name,
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
