import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../components/posts/PostItem";
import { Oval } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import request from "../../utils/request";
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

useEffect(() => {
  // Check if bio, phone, or gender are empty or missing and open the update profile modal
  if (
    profile &&
    user?._id === profile._id &&
    (!profile.bio ||
      profile.bio.trim() === "" ||
      !profile.phone ||
      profile.phone.trim() === "" ||
      !profile.gender ||
      profile.gender.trim() === "")
  ) {
    setUpdateProfile(true);
  }
}, [profile, user]);

  const formSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!file) return toast.warning("There is no file!");

      const formData = new FormData();
      formData.append("image", file);

      dispatch(uploadProfilePhoto(formData));
    },
    [file, dispatch]
  );

  const deleteAccountHandler = useCallback(() => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  }, [dispatch, user]);

  const handleStartChat = useCallback(
    async (otherUserId) => {
      const userId1 = user._id;
      const chatName = `${userId1}-${otherUserId}`;

      try {
        await request.post("/api/chats/create", {
          userId1,
          userId2: otherUserId,
          chatName,
        });
        navigate(`/chat`);
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    },
    [user, navigate]
  );

  return (
    <section className="profile">
      {loading ? (
        <div className="loading-spinner">
          <Oval color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="profile-header">
            <div className="profile-image-wrapper">
              <img
                src={
                  file ? URL.createObjectURL(file) : profile?.profilePhoto?.url
                }
                alt=""
                className="profile-image"
              />
              {user?._id === profile?._id && (
                <form onSubmit={formSubmitHandler}>
                  <abbr title="choose profile photo">
                    <label
                      htmlFor="file"
                      className="bi bi-camera-fill upload-profile-photo-icon"
                    ></label>
                  </abbr>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button className="upload-profile-photo-btn" type="submit">
                    تغيير الصورة
                  </button>
                </form>
              )}
            </div>
            <h1 className="profile-username">{profile?.username}</h1>
            <div className="user-info">
              <strong>اللقب: </strong>
              <span className="profile-bio">{profile?.bio}</span>
            </div>
            <div className="user-info">
              <div>
                <strong>تاريخ الانضمام: </strong>
                <span>{new Date(profile?.createdAt).toDateString()}</span>
              </div>
              {profile?.birthday && (
                <div>
                  <strong>تاريخ الميلاد: </strong>
                  <span>{new Date(profile.birthday).toDateString()}</span>
                </div>
              )}
              {profile?.phone && (
                <div>
                  <strong>الهاتف: </strong>
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile?.gender && (
                <div>
                  <strong>النوع: </strong>
                  <span>{profile.gender === "male" ? "ذكر" : "أنثى"}</span>
                </div>
              )}
              {profile?.gender === "male" && (
                <div>
                  <strong>لحية: </strong>
                  <span>{profile.hasBeard ? "نعم" : "لا"}</span>
                </div>
              )}
              {profile?.gender === "female" && (
                <div>
                  <strong>حجاب: </strong>
                  <span>{profile?.wearsHijab ? "نعم" : "لا"}</span>
                </div>
              )}
            </div>
            {user?._id === profile?._id && (
              <button
                onClick={() => setUpdateProfile(true)}
                className="profile-update-btn"
              >
                <i className="bi bi-file-person-fill"></i>
                تحديث البيانات
              </button>
            )}

            {user?._id !== profile?._id && (
              <button
                className="chat-btn"
                onClick={() => handleStartChat(profile._id)}
              >
                بدء محادثة<i className="bi bi-chat"></i>
              </button>
            )}
          </div>
          <div className="profile-posts-list">
            <h2 className="profile-posts-list-title">
              {profile?.username} منشورات
            </h2>
            {profile?.posts?.map((post) => (
              <PostItem
                key={post._id}
                post={post}
                username={profile?.username}
                userId={profile?._id}
              />
            ))}
          </div>
          {user?._id === profile?._id && (
            <button
              onClick={deleteAccountHandler}
              className="delete-account-btn"
            >
              مسح حسابي
            </button>
          )}
          {updateProfile && (
            <UpdateProfileModal
              profile={profile}
              setUpdateProfile={setUpdateProfile}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Profile;
