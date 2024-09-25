import {
  FaSearch,
  FaPlusCircle,
  FaBriefcase,
  FaCubes,
  FaUsers,
} from "react-icons/fa";
import { IoMdHome, IoMdMail } from "react-icons/io";
import "./header.css";
import { FiLogIn, FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CgUserAdd } from "react-icons/cg";
import HeaderRight from "./HeaderRight";
import { Link } from "react-router-dom";
import { DiGhostSmall } from "react-icons/di";

const Header = () => {
  const [SideMenuShow, setSideMenuShow] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setSideMenuShow(!SideMenuShow);
  };

  const closeMenu = () => {
    setSideMenuShow(false);
  };

  return (
    <>
      {SideMenuShow && <div className="overlay show" onClick={closeMenu} />}
      <div className="navbar-container">
        <div className={`side-menu ${SideMenuShow ? "show" : ""}`}>
          <ul>
            <li>
              <Link onClick={closeMenu} className="navbar-link" to="/">
                <span className="title">الرئيسية</span>
                <span className="icon">
                  <FaCubes />
                </span>
              </Link>
            </li>
            {!user && (
              <li>
                <Link onClick={closeMenu} className="navbar-link" to="/search">
                  <span className="title">ابحث عن موهوبين</span>
                  <span className="icon">
                    <FaUsers />
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link onClick={closeMenu} className="navbar-link" to="/posts">
                <span className="title">تصفح المنشورات</span>
                <span className="icon">
                  <DiGhostSmall />
                </span>
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} className="navbar-link" to="/projects">
                <span className="title">تصفح المشاريع</span>
                <span className="icon">
                  <FaCubes />
                </span>
              </Link>
            </li>
            {user && (
              <li onClick={closeMenu}>
                <Link className="navbar-link" to="/add-project">
                  <span className="title">أضف مشروع</span>
                  <span className="icon">
                    <FaPlusCircle />
                  </span>
                </Link>
              </li>
            )}
            {user && (
              <>
                <li>
                  <Link
                    onClick={closeMenu}
                    className="navbar-link"
                    to="/my-projects"
                  >
                    <span className="title">مشاريعي</span>
                    <span className="icon">
                      <FaBriefcase />
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="navbar">
          <div className="main-icons">
            <div className=" navbar-link" onClick={toggleMenu}>
              <span className="icon">
                <FiMenu />
              </span>
            </div>
            <Link className="navbar-link" to="/">
              <span className="title"></span>
              <span className="icon">
                <IoMdHome />
              </span>
            </Link>
            <Link onClick={closeMenu} className="navbar-link" to="/posts">
              <span className="title"></span>
              <span className="icon">
                <DiGhostSmall />
              </span>
            </Link>
          </div>

          <div className="logo">
            <Link className="navbar-link" to="/">
              <span className="logo-text">Tallento</span>
            </Link>
          </div>
          <div className="navbar-links">
            <div className="links-list">
              <ul>
                {!user && (
                  <li>
                    <Link className="navbar-link" to="/search">
                      <span className="icon">
                        <FaUsers />
                      </span>
                      <span className="title">ابحث عن موهوبين</span>
                    </Link>
                  </li>
                )}
                <li>
                  <Link onClick={closeMenu} className="navbar-link" to="/posts">
                    <span className="icon">
                      <DiGhostSmall />
                    </span>
                    <span className="title">تصفح المنشورات</span>
                  </Link>
                </li>
                <li>
                  <Link className="navbar-link" to="/projects">
                    <span className="icon">
                      <FaCubes />
                    </span>
                    <span className="title">تصفح المشاريع</span>
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link className="navbar-link" to="/add-project">
                      <span className="icon">
                        <FaPlusCircle />
                      </span>
                      <span className="title">أضف مشروع</span>
                    </Link>
                  </li>
                )}
                {user && (
                  <>
                    <li>
                      <Link className="navbar-link" to="/my-projects">
                        <span className="icon">
                          <FaBriefcase />
                        </span>
                        <span className="title">مشاريعي</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="notifiction-search-icons">
            <ul>
              <li>
                <Link className="navbar-link" to="/search">
                  <span className="icon">
                    <FaSearch />
                  </span>
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link className="navbar-link" to="/chat">
                      <span className="icon">
                        <IoMdMail />
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {!user && (
              <div className="nav-log-btns">
                <Link className="logout-btn" to="/register">
                  <span className="icon">
                    <CgUserAdd />
                  </span>
                  <span className="title">حساب جديد</span>
                </Link>
                <Link className="login-btn" to="/login">
                  <span className="title">دخول</span>
                  <span className="icon">
                    <FiLogIn />
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="user-side">
            <div className="nav-user-container">{user && <HeaderRight />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
