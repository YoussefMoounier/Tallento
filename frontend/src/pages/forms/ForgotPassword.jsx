import { useState } from "react";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";
import LoadingSpinner from "../../components/isLoading/LoadingSpinner";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  // Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");

    setIsLoading(true); // Start loading state
    try {
      await dispatch(forgotPassword(email));
      setIsLoading(false); // Stop loading state on success
      toast.success("Password reset email sent successfully.");
    } catch (error) {
      setIsLoading(false); // Stop loading state on error
      console.error("Password Reset Error:", error.message);
      toast.error("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Forgot Password</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
           البريد الالكتروني
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            placeholder="ادخل البريد الالكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="form-btn" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
