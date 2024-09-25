import "./verify-email.css";
import { Link,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector(state => state.auth);

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);

  return (
    <section className="verfiy-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon"></i>
          <h1 className="verfiy-email-title">
            تم تفعيل بريدك الالكتروني بنجاح
          </h1>
          <Link to="/login" className="verify-email-link">
             سجل الدخول من هنا
          </Link>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">هناك خطأ</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
