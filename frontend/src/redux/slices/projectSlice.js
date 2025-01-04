import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import request from "../../utils/request";

const initialState = {
  project: {
    title: "",
    description: "",
    status: "مفتوح",
    budget: "",
    duration: "",
    ownerId: "",
    skills: [],
    offers: [],
  },
  projects: [],
  loading: false,
  error: null,
  isProjectCreated: false,
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    const response = await request.get("/api/projects");
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, projectData }) => {
    const response = await request.put(`/api/projects/${id}`, projectData);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectField(state, action) {
      const { field, value } = action.payload;
      state.project[field] = value;
    },
    setProjectSkills(state, action) {
      state.project.skills = action.payload.skills;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setProjectCreated(state) {
      state.isProjectCreated = true;
      state.loading = false;
    },
    clearProjectCreated(state) {
      state.isProjectCreated = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    resetProject(state) {
      state.project = initialState.project;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        state.projects[index] = action.payload;
      });
  },
});

export const {
  setProjectField,
  setProjectSkills,
  setLoading,
  clearLoading,
  setProjectCreated,
  clearProjectCreated,
  setError,
  clearError,
  resetProject,
} = projectSlice.actions;

export default projectSlice.reducer;

export const createProject = (newProject) => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const { user } = getState().auth;
    newProject.ownerId = user._id;
    const response = await request.post("/api/projects", newProject);

    dispatch(setProjectCreated());
    toast.success("Project created successfully");
    dispatch(resetProject());
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(error.message);
  } finally {
    dispatch(clearLoading());
  }
};
