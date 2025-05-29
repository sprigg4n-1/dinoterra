import axios from "axios";

import {
  BASE_URL_SECURITY,
  BASE_URL_DINO,
  BASE_DEV_API_URL,
} from "@/config/config";

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
      throw new Error(error.response.data);
    }
    throw new Error("Network error");
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
  } catch (error) {
    console.error(`Error with auth user: ${error}`);
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

// export const getUserByToken = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL_SECURITY}/user-data`, {
//       withCredentials: true,
//     });

//     return response.data;
//   } catch (error) {
//     console.error(`Error with getting user`);
//   }
// };

// admin and user

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

export const changeUser = async (
  id: number,
  name: string,
  lastname: string,
  username: string,
  password: string,
  role: string
) => {
  try {
    const response = await axios.put(
      `${BASE_URL_SECURITY}/users/${id}`,
      {
        name: name,
        lastname: lastname,
        username: username,
        password: password,
        role: role,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error with changing user: ${error}`);
  }
};

export const updateUserProfilePhoto = async (
  userId: number,
  imagePath: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL_SECURITY}/users/update-profile-photo/${userId}`,
      { imagePath },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error with adding profile photo: ${error}`);
  }
};

export const getUserProfilePhoto = async (userId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL_SECURITY}/users/profile-photo/${userId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error with getting profile photo: ${error}`);
  }
};

export const deleteUserProfilePhoto = async (userId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL_SECURITY}/users/profile-photo/${userId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error with deleting profile photo: ${error}`);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL_SECURITY}/users/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(`Error with deleting user: ${error}`);
  }
};

// favorite
export const addFavoriteDino = async (userId: number, dinosaurId: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL_SECURITY}/fav-add?userId=${userId}&dinosaurId=${dinosaurId}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding dinosaur to favorites: ${error}`);
    return null;
  }
};

export const removeFavoriteDino = async (
  userId: number,
  dinosaurId: number
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL_SECURITY}/fav-remove?userId=${userId}&dinosaurId=${dinosaurId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error removing dinosaur from favorites: ${error}`);
    return null;
  }
};

export const getFavoriteDinos = async (userId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL_DINO}/dinos/fav-list/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting favorite dinos: ${error}`);
    return null;
  }
};

export const isFavoriteDino = async (userId: number, dinoId: number) => {
  try {
    const params = new URLSearchParams();

    params.append("userId", userId.toString());
    params.append("dinoId", dinoId.toString());

    const response = await axios.get(`${BASE_URL_DINO}/isFavoriteDino`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting favorite dinos: ${error}`);
    return null;
  }
};
