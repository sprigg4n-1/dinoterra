import { BASE_URL_AUTH } from "@/config/config";
import axios from "axios";

export const getUsers = async () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    const response = await axios.get(`${BASE_URL_AUTH}/users`, {
      auth: { username: userData.username, password: userData.password },
    });

    return response.data;
  } catch (error) {
    console.error(`Error with getting users: ${error}`);
  }
};

export const getUserById = async (id: number) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    const response = await axios.get(`${BASE_URL_AUTH}/users/${id}`, {
      auth: { username: userData.username, password: userData.password },
    });

    return response.data;
  } catch (error) {
    console.error(`Error with getting user with ${id} id: ${error}`);
  }
};

export const createUser = async (
  name: string,
  lastname: string,
  username: string,
  password: string,
  role: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL_AUTH}/users-register`,
      {
        name: name,
        lastname: lastname,
        username: username,
        password: password,
        role: role,
      },
      { withCredentials: true }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with register user: ${error}`);
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL_AUTH}/users-login`,
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );

    const userData = { username };
    localStorage.setItem("user", JSON.stringify(userData));

    console.log("User logged in:", userData);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with auth user: ${error}`);
  }
};

export const logoutUser = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.post(
      `${BASE_URL_AUTH}/users-logout`,
      {},
      {
        withCredentials: true,
        auth: { username: userData.username, password: userData.password },
      }
    );

    localStorage.removeItem("user");
    console.log(response.data);
  } catch (error) {
    console.error("Error logging out:", error);
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
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    const response = await axios.put(
      `${BASE_URL_AUTH}/users/${id}`,
      {
        name: name,
        lastname: lastname,
        username: username,
        password: password,
        role: role,
      },
      {
        auth: { username: userData.username, password: userData.password },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error with changing user: ${error}`);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    const response = await axios.delete(`${BASE_URL_AUTH}/users/${id}`, {
      auth: { username: userData.username, password: userData.password },
    });

    return response.data;
  } catch (error) {
    console.error(`Error with deleting user: ${error}`);
  }
};
