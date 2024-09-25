import { clearLoading, createProject, resetProject, setError, setLoading, setProjectCreated } from "../slices/projectSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export const createNewProject = (newProject) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const response = await request.post("/api/projects", newProject, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create project");
    }

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
