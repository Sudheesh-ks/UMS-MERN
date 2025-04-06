import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../services/apiService";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/register", formData)
      localStorage.setItem("userInfo", JSON.stringify(response.data.user.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      return response.data.user.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed")
    }
  } 
)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", formData)
      console.log(response.data.newUser)
      localStorage.setItem("userInfo", JSON.stringify(response.data.newUser))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      return true
    } catch (error) {
      return rejectWithValue("Invalid credentials")
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData, { rejectWithValue }) => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("username", formData.username)
      formDataToSend.append("email", formData.email)
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar)
      }

      const { data } = await axiosInstance.post(`/users/update/profile/${JSON.parse(localStorage.getItem("userInfo"))._id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      localStorage.setItem("userInfo", JSON.stringify(data.user))
      return data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Profile update failed")
    }
  }
)

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  localStorage.removeItem("userInfo")
  localStorage.removeItem("token")
  return null;
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    loader: false,
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loader = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loader = false
        state.user = action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loader = false
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loader = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loader = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false
        state.error = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.loader = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loader = false
        state.user = action.payload
        state.error = null
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loader = false
        state.error = action.payload
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
  },
})

export default userSlice.reducer;
