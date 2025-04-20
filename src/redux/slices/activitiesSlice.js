import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchActivities = createAsyncThunk(
    "activities/fetchActivities",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/activities");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || "Erreur de chargement");
        }
    }
);

export const createActivity = createAsyncThunk(
    "activities/createActivity",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post("/api/activities", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || "Erreur lors de la création");
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
        selectedActivity: null,
    },
    reducers: {
        setSelectedActivity: (state, action) => {
            state.selectedActivity = action.payload;
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
            .addCase(createActivity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload._id) {
                    state.activities.push(action.payload);
                }
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;
