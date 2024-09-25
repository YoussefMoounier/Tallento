import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import LoadingSpinner from "../../components/isLoading/LoadingSpinner";
import { authActions } from "../../redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "./google.png";
import "./form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(authActions.login(JSON.parse(userInfo)));
    }

    const query = new URLSearchParams(location.search);
    const user = query.get("user");

    if (user) {
      const parsedUser = JSON.parse(decodeURIComponent(user));
      if (
        !parsedUser.bio ||
        parsedUser.bio.trim() === "" ||
        !parsedUser.phone ||
        parsedUser.phone.trim() === "" ||
        !parsedUser.gender ||
        parsedUser.gender.trim() === ""
      ) {
        window.location.href = `/profile/${parsedUser._id}`;
      }

      dispatch(authActions.login(parsedUser));
      localStorage.setItem("userInfo", JSON.stringify(parsedUser));
    }
    const qerror = query.get("error");
    if (qerror) {
      const parsedError = decodeURIComponent(qerror);
      toast.error(parsedError);
    }
  }, [dispatch, location.search]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleAuth = (e) => {
    e.preventDefault();
    window.open(`${process.env.REACT_APP_API_URL}/api/auth/google`, "_self");
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    setIsLoading(true);
    try {
      await dispatch(loginUser({ email, password }));
    } catch (error) {
      toast.error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="form-container">
      <h1 className="form-title">تسجيل الدخول</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            البريد الالكتروني
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            placeholder="ادخل البريد الالكتروني هنا"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password" className="form-label">
            كلمة السر
          </label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              id="password"
              placeholder="ادخل كلمة السر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button className="form-btn" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : "تسجيل الدخول"}
        </button>
        <button
          className="google_btn"
          onClick={googleAuth}
          disabled={isLoading}
        >
          <span>تسجيل الدخول باستخدام Google</span>
          <img src={google} alt="google icon" />
        </button>
      </form>

      <div className="form-footer">
        نسيت كلمة المرور? <Link to="/forgot-password">اضغط هنا</Link>
      </div>
    </section>
  );
};

export default Login;
