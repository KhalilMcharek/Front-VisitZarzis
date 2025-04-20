// src/redux/slices/reservationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Admin: fetch all reservations
export const fetchAllReservations = createAsyncThunk(
  "reservations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/bookings");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Erreur de chargement des réservations");
    }
  }
);

// Manager: fetch own reservations
export const fetchManagerReservations = createAsyncThunk(
  "reservations/fetchManager",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/bookings/manager");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Erreur de chargement des réservations");
    }
  }
);
export const updateReservationStatus = createAsyncThunk(
  "reservations/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/bookings/update-status/${id}`, { status });
      return res.data.booking;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Échec de mise à jour");
    }
  }
);


const reservationSlice = createSlice({
  name: "reservations",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Admin
      .addCase(fetchAllReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Manager
      .addCase(fetchManagerReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagerReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchManagerReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map((res) =>
          res._id === updated._id ? updated : res
        );
      });
      
  },
});

export default reservationSlice.reducer;
