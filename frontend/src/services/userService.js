import { axiosInstance } from "./apiService.js";

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/users/register", {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    })
    if (response && response.data && response.data.data) {
      console.log("User Successfully created")
      console.log(response.data.data)
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    } else {
      throw new Error("An Unexpected Error Occurred")
    }
  }
}

export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email: formData.email,
      password: formData.password,
    })
    if (response && response.data && response.data.data) {
      console.log("User Successfully logged in")
      console.log(response.data.data);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An Unexpected Error Occurred")
    }
  }
}
