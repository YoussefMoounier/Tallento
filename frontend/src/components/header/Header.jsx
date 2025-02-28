import { LanguageContext } from "../../context/LanguageContext";
import React, { useContext } from "react";
import {
  FaSearch,
  FaPlusCircle,
  FaBriefcase,
  FaCubes,
  FaUsers,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { IoMdHome, IoMdMail } from "react-icons/io";
import { FiLogIn, FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";
import HeaderRight from "./HeaderRight";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
// import "./header.css";

const Header = () => {
  const [SideMenuShow, setSideMenuShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { language, toggleLanguage } = useContext(LanguageContext);

  // Translations object
  const translations = {
    en: {
      home: "Home",
      search: "Search for Talents",
      browsePosts: "Browse Posts",
      browseProjects: "Browse Projects",
      addProject: "Add Project",
      myProjects: "My Projects",
      newAccount: "New Account",
      login: "Login",
      profile: "Profile",
      messages: "Messages",
    },
    ar: {
      home: "الرئيسية",
      search: "ابحث عن موهوبين",
      browsePosts: "تصفح المنشورات",
      browseProjects: "تصفح المشاريع",
      addProject: "أضف مشروع",
      myProjects: "مشاريعي",
      newAccount: "حساب جديد",
      login: "دخول",
      profile: "الملف الشخصي",
      messages: "الرسائل",
    },
  };

  const toggleMenu = () => {
    setSideMenuShow(!SideMenuShow);
  };

  const closeMenu = () => {
    setSideMenuShow(false);
  };

  return (
    <>
      {SideMenuShow && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />
      )}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px- py-2 flex items-center justify-around">
          {/* Mobile Menu Button - Only shows on small screens */}
          <FiMenu
            className="text-purple-800 text-xl lg:hidden"
            onClick={toggleMenu}
          />
          <Link to={"/"}>
            <img
              src={logo}
              className="h-14 w-14 rounded-full lg:hidden"
              alt="logo"
            />
          </Link>

          {/* Language toggle */}
          <button
            className="px-8 py-0 rounded-full bg-purple-600 text-white hover:bg-purple-700"
            onClick={toggleLanguage}
          >
            {language === "en" ? "ع" : "En"}
          </button>

          {/* Mobile Menu - Slides in from the side */}
          <div
            className={`fixed top-[73px] ${
              language === "en" ? "left-0" : "right-0"
            } w-64 h-[calc(100vh-73px)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              SideMenuShow
                ? "translate-x-0"
                : `${
                    language === "en" ? "-translate-x-full" : "translate-x-full"
                  }`
            } lg:hidden`}
          >
            <nav className="flex flex-col p-4 ">
              <Link
                to="/posts"
                className="py-3 hover:text-purple-600 hover:bg-purple-200"
                onClick={closeMenu}
              >
                {translations[language].browsePosts}
              </Link>
              <Link
                to="/projects"
                className="py-3 hover:text-purple-600 hover:bg-purple-200"
                onClick={closeMenu}
              >
                {translations[language].browseProjects}
              </Link>
              <Link
                to="/my-projects"
                className="py-3 hover:text-purple-600 hover:bg-purple-200"
                onClick={closeMenu}
              >
                {translations[language].myProjects}
              </Link>
              <Link
                to="/add-project"
                className="py-3 hover:text-purple-600 hover:bg-purple-200"
                onClick={closeMenu}
              >
                {translations[language].addProject}
              </Link>
              {/* Mobile-only links */}
              <Link
                to="/search"
                className="py-3 rounded-md p-2 hover:bg-purple-200 hover:text-purple-600"
                onClick={closeMenu}
              >
                {translations[language].search}
              </Link>
              {user ? (
                <>
                  <Link
                    to="/chat"
                    className="py-3 rounded-md p-2 hover:bg-purple-200 hover:text-purple-600"
                    onClick={closeMenu}
                  >
                    {translations[language].messages}
                  </Link>
                  <Link

                    className="py-3 rounded-md p-2 hover:bg-purple-200 hover:text-purple-600"
                  >
                    {translations[language].profile}
                    <HeaderRight />
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="py-3 rounded-md p-2 hover:bg-purple-200 hover:text-purple-600"
                  onClick={closeMenu}
                >
                  {translations[language].login}
                </Link>
              )}
            </nav>
          </div>
          {/* Center Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/posts" className="hover:text-purple-600">
              {translations[language].browsePosts}
            </Link>
            <Link to="/projects" className="hover:text-purple-600">
              {translations[language].browseProjects}
            </Link>
            <Link to={"/home"}>
              <img src={logo} className="h-14 w-14 rounded-full" alt="logo" />
            </Link>
            <Link to="/my-projects" className="hover:text-purple-600">
              {translations[language].myProjects}
            </Link>
            <Link to="/add-project" className="hover:text-purple-600">
              {translations[language].addProject}
            </Link>
          </nav>
          {/* Right side icons - Hidden on mobile */}
          <div className="flex items-center gap-4 ">
            {user ? (
              <>
                <Link
                  to="/search"
                  className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:text-purple-600"
                >
                  <FaSearch className="text-white h-5 w-5 hover:text-purple-600" />
                </Link>
                <Link
                  to="/chat"
                  className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:text-purple-600"
                >
                  <IoMdMail className="text-white w-5 h-5 hover:text-purple-600" />
                </Link>
                <HeaderRight className="flex flex-col items-center" />
              </>
            ) : (
              <>
              <Link
                to="/login"
                className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:text-purple-600"
              >
                <FiLogIn className="text-white w-5 h-5 hover:text-purple-600" />
              </Link>
              <Link
                to="/register"
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:text-purple-600"
              >
                <FaUserCircle className="text-white w-12 h-12 hover:text-purple-600"/>
              </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
