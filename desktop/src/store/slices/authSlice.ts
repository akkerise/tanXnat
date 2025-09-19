import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { username: string; password: string }) => {
    const res = await axios.post(`${API_URL}/auth/login`, payload);
    return res.data as { accessToken: string; refreshToken?: string };
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload: { username: string; password: string }) => {
    const res = await axios.post(`${API_URL}/auth/register`, payload);
    return res.data;
  }
);

type AuthState = {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  status: 'idle',
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // API returns token shape from session service; try common fields
        const token = (action.payload as any).accessToken || (action.payload as any).token || '';
        state.token = token;
        if (token) localStorage.setItem('token', token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(register.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(register.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message || 'Register failed'; });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
