import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchActivities = createAsyncThunk(
  "activities/fetchActivities",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/activities");
      return res.data;
    } catch (err) {
      return rejectWithValue("Erreur de chargement");
    }
  }
);

export const fetchFilteredActivities = createAsyncThunk(
  "activities/fetchFilteredActivities",
  async (filters, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/activities/filtred", { params: filters });
      return res.data.activities;
    } catch (err) {
      return rejectWithValue("Erreur de filtrage");
    }
  }
);

export const createActivity = createAsyncThunk(
  "activities/createActivity",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/activities", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue("Erreur de création");
    }
  }
);

export const updateActivity = createAsyncThunk(
  "activities/updateActivity",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/activities/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Erreur de mise à jour");
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: {
    activities: [],
    loading: false,
    error: null,
    // 🆕 Add filters to the initial state
    query: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  },
  reducers: {
    clearFilteredActivities: (state) => {
      state.activities = [];
    },
    // 🆕 Set filters
    setFilters: (state, action) => {
      const { query, location, minPrice, maxPrice } = action.payload;
      state.query = query;
      state.location = location;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
    },
    // 🆕 Reset filters
    resetFilters: (state) => {
      state.query = '';
      state.location = '';
      state.minPrice = '';
      state.maxPrice = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
        state.loading = false;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
        state.loading = false;
      })
      .addCase(fetchFilteredActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.activities.push(action.payload);
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.activities.findIndex((a) => a._id === updated._id);
        if (index !== -1) {
          state.activities[index] = updated;
        }
      });
  },
});

export const { clearFilteredActivities, setFilters, resetFilters } = activitiesSlice.actions;
export default activitiesSlice.reducer;