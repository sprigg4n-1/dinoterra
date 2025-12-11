import axios from "axios";

import { BASE_DEV_API_URL } from "@/config/config";

// auth
export const registerUser = async (
  name: string,
  lastname: string,
  username: string,
  password: string,
  email: string,
  role: string
) => {
  try {
    const response = await axios.post(
      `${BASE_DEV_API_URL}/auth/sign-up`,
      {
        name: name,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        role: role,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error(error.response.data);
    } else {
      console.error("Network error");
    }

    return error?.response?.data;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_DEV_API_URL}/auth/sign-in`,
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(`Error with auth user: ${error}`);
    return error?.response?.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${BASE_DEV_API_URL}/auth/sign-out`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const checkStatus = async () => {
  try {
    const response = await axios.get(`${BASE_DEV_API_URL}/auth/check-status`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error checking status:", error);
  }
};

// user

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_DEV_API_URL}/users`);

    return response.data.data;
  } catch (error) {
    console.error(`Error with getting users: ${error}`);
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_DEV_API_URL}/users/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(`Error with getting user with ${id} id`);
  }
};

export const getUserProfilePhoto = async (userId: string) => {
  try {
    const response = await axios.get(
      `${BASE_DEV_API_URL}/users/images/${userId}`
    );

    return response.data.data;
  } catch (error) {
    console.error(`Error with getting profile photo: ${error}`);
  }
};

export const uploadUserProfilePhoto = async (user: string, file: string) => {
  try {
    const response = await axios.post(
      `${BASE_DEV_API_URL}/users/upload-image`,
      { file: file, user: user }
    );

    return response.data.data;
  } catch (error) {
    console.error(`Error with adding profile photo: ${error}`);
  }
};

export const deleteUserProfilePhoto = async (id: string) => {
  try {
    const response = await axios.delete(
      `${BASE_DEV_API_URL}/users/images/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(`Error with deleting profile photo: ${error}`);
  }
};

// favorite
export const addFavoriteDino = async (userId: string, dinosaurId: string) => {
  try {
    const response = await axios.post(`${BASE_DEV_API_URL}/users/favorites`, {
      user: userId,
      dino: dinosaurId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding dinosaur to favorites: ${error}`);
    return null;
  }
};

export const removeFavoriteDino = async (
  userId: string,
  dinosaurId: string
) => {
  try {
    const response = await axios.delete(
      `${BASE_DEV_API_URL}/users/${userId}/favorites/${dinosaurId}`
    );

    return response.data;
  } catch (error) {
    console.error(`Error removing dinosaur from favorites: ${error}`);
    return null;
  }
};

export const getFavoriteDinos = async (userId: string) => {
  try {
    const response = await axios.get(
      `${BASE_DEV_API_URL}/users/${userId}/favorites`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error getting favorite dinos: ${error}`);
    return null;
  }
};

export const isFavoriteDino = async (userId: string, dinoId: string) => {
  try {
    const response = await axios.get(
      `${BASE_DEV_API_URL}/users/${userId}/favorites/check/${dinoId}`
    );

    return response.data.data.isFavorite;
  } catch (error) {
    console.error(`Error with check favorite dinos: ${error}`);
    return null;
  }
};
