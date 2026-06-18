import axios from "axios";

import { BASE_DEV_API_V2_URL } from "@/config/config";
import { IDinoV2 } from "@/config/types";

const BASE = `${BASE_DEV_API_V2_URL}/dinos`;

export const getDinoV2ByLatinName = async (latinName: string) => {
  try {
    const response = await axios.get(BASE, { params: { latinName, size: 1 } });
    return response.data.data.dinos as IDinoV2[];
  } catch (error) {
    console.error(`Error with getting dino v2 by latin name: ${error}`);
    return null;
  }
};

export const getDinosV2 = async (
  page: number = 0,
  size: number = 10,
  name?: string,
  type?: string,
  diet?: string,
  period?: string,
) => {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("size", size.toString());

    if (name?.trim()) params.append("name", name.trim());
    if (type?.trim()) params.append("type", type.trim());
    if (diet?.trim()) params.append("diet", diet.trim());
    if (period?.trim()) params.append("period", period.trim());

    const response = await axios.get(BASE, { params });

    return response.data.data;
  } catch (error) {
    console.error(`Error with getting dinos v2: ${error}`);
  }
};

export const getFiveRandomDinosV2 = async () => {
  try {
    const response = await axios.get(`${BASE}/random`);

    return response.data.data;
  } catch (error) {
    console.error(`Error with getting random dinos v2: ${error}`);
  }
};

export const getSimilarDinosV2 = async (id: string) => {
  try {
    const response = await axios.get(`${BASE}/${id}/similar`);
    return response.data.data as IDinoV2[];
  } catch (error) {
    console.error(`Error with getting similar dinos v2: ${error}`);
    return [];
  }
};

export const getDinoV2ById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE}/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(`Error with getting dino v2: ${error}`);
  }
};

export const createDinoV2 = async (data: {
  name: { uk: string; en: string };
  latinName: string;
  typeOfDino: string;
  period: string;
  periodDate: string;
  diet: string;
  length: number;
  weight: number;
  article?: { uk: object | null; en: object | null };
}) => {
  try {
    const response = await axios.post(BASE, data);

    return response.data;
  } catch (error) {
    console.error(`Error with creating dino v2: ${error}`);
  }
};

export const updateDinoV2 = async (
  id: string,
  data: {
    name?: { uk: string; en: string };
    latinName?: string;
    typeOfDino?: string;
    period?: string;
    periodDate?: string;
    diet?: string;
    length?: number;
    weight?: number;
    article?: { uk: object | null; en: object | null };
  },
) => {
  try {
    const response = await axios.put(`${BASE}/${id}`, data);

    return response.data;
  } catch (error) {
    console.error(`Error with updating dino v2: ${error}`);
  }
};

export const deleteDinoV2 = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE}/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with deleting dino v2: ${error}`);
  }
};

// isMain: true → cover (shown in catalog card + page header), only one allowed
// isMain: false (default) → regular gallery image
export const uploadDinoImageV2 = async (
  dinoId: string,
  file: string,
  isMain: boolean = false,
) => {
  try {
    const response = await axios.post(`${BASE}/upload-image`, {
      dino: dinoId,
      file,
      isMain,
    });

    return response.data;
  } catch (error) {
    console.error(`Error with uploading dino image v2: ${error}`);
  }
};

export const deleteDinoImageV2 = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE}/images/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with deleting dino image v2: ${error}`);
  }
};

export const uploadArticleImageV2 = async (
  dinoId: string,
  file: string,
  caption?: { uk: string; en: string },
) => {
  try {
    const response = await axios.post(`${BASE}/upload-article-image`, {
      dino: dinoId,
      file,
      caption,
    });

    return response.data;
  } catch (error) {
    console.error(`Error with uploading article image v2: ${error}`);
  }
};

export const deleteArticleImageV2 = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE}/article-images/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with deleting article image v2: ${error}`);
  }
};

export const getFoundLocationsV2 = async (place?: string, period?: string) => {
  try {
    const params = new URLSearchParams();

    if (place?.trim()) params.append("place", place.trim());
    if (period?.trim()) params.append("period", period.trim());

    const response = await axios.get(`${BASE}/found-locations`, { params });

    return response.data.data;
  } catch (error) {
    console.error(`Error with getting found locations v2: ${error}`);
  }
};

export const addFoundLocationV2 = async (
  dinoId: string,
  place: { uk: string; en: string },
  latitude: number,
  longitude: number,
) => {
  try {
    const response = await axios.post(`${BASE}/found-location`, {
      dino: dinoId,
      place,
      latitude,
      longitude,
    });

    return response.data;
  } catch (error) {
    console.error(`Error with adding found location v2: ${error}`);
  }
};

export const deleteFoundLocationV2 = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE}/found-locations/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with deleting found location v2: ${error}`);
  }
};
