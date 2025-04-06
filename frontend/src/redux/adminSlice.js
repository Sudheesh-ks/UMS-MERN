import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../services/apiService.js"

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("admin/users")
    return response.data.users;
  } catch (err) {
    console.log(err)
    return rejectWithValue("Failed to Fetch Users")
  }
})

export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("admin/users", userData)
    return response.data.user
  } catch (err) {
    return rejectWithValue("Failed to Create User")
  }
})

export const updateUser = createAsyncThunk("admin/updateUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`admin/users/${userData.id}`, userData)
    return response.data.user
  } catch (err) {
    return rejectWithValue("User already exists")
  }
})

export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`admin/users/${userId}`)
    return userId
  } catch (err) {
    return rejectWithValue("Failed to Delete User")
  }
})

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
        state.error = null
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
        state.error = null
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        )
        state.error = null
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter((user) => user.id !== action.payload)
        state.error = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default adminSlice.reducer
