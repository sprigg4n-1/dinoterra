import axios from "axios";

import { BASE_URL_DINO } from "@/config/config";

export const getFoundLocations = async (place?: string, period?: string) => {
  try {
    const params = new URLSearchParams();

    if (place?.trim()) params.append("place", place.trim());
    if (period?.trim()) params.append("period", period.trim());

    const response = await axios.get(`${BASE_URL_DINO}/locations`, { params });

    return response.data;
  } catch (error) {
    console.error(`Error with get locations: ${error}`);
  }
};

export const addFoundLocation = async (
  place: string,
  latitude: string,
  longitude: string,
  dino_id: number
) => {
  try {
    const response = await axios.post(`${BASE_URL_DINO}/locations`, {
      latitude: latitude,
      longitude: longitude,
      place: place,
      dino_id: dino_id,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with add location: ${error}`);
  }
};

export const deleteFoundLocation = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL_DINO}/locations/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with deleting found location: ${error}`);
  }
};
