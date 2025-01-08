import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Logout Handler
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // Handle link click
  const handleLinkClick = (e) => {
    e.stopPropagation();
    setDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header-right">
      {user ? (
        <>
          <div
            className="header-right-user-info"
            onClick={() => setDropdown((prev) => !prev)}
            ref={dropdownRef}
          >
            <div className="user"></div>
            <img
              src={user?.profilePhoto.url}
              alt="user"
              className="h-14 w-14"
            />
            {dropdown && (
              <div className="absolute left-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item flex items-center p-2 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <i className="bi bi-file-person mr-2"></i>
                  <span>حسابي</span>
                </Link>
                <Link
                  to={`/payments`}
                  className="header-dropdown-item flex items-center p-2 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <i className="bi bi-currency-dollar mr-2"></i>
                  <span>رصيدي</span>
                </Link>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    logoutHandler();
                  }}
                  className="header-dropdown-item flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <i className="bi bi-box-arrow-in-left mr-2"></i>
                  <span>تسجيل خروج</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
