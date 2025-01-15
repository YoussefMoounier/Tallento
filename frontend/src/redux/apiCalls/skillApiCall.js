import { setSkills, removeSkill } from "../slices/skillSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch all skills
export function fetchAllSkills() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/skills", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(setSkills(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete skill
export function deleteSkill(skillId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/skills/${skillId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(removeSkill(skillId));
      toast.success("Skill deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}