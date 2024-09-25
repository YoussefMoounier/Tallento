import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import CreatePosts from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import SearchableComponent from "./search/SearchableComponent";
import CreateProject from "./components/createProject/CreateProject";
import ProjectsList from "./components/projects/ProjectsList";
import EditProject from "./components/projects/EditProject";
import MyProjects from "./components/projects/MyProjects";
import ProjectCard from "./components/projects/projectCard/ProjectCard";
import ChatApp from "./components/chat/Chat";
import PaymentsPage from "./pages/payments/PaymentsPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./pages/payments/CheckoutForm";
import { PaymentComplete } from "./pages/payments/PaymentComplete";
import axios from "axios";
import { authActions } from "./redux/slices/authSlice";
import UserList from "./components/users/UserList";
import HomePage from "./pages/HomePage";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer theme="colored" position="top-center" />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts-page" element={<PostsPage />} />
          <Route path="/search" element={<SearchableComponent />} />
          <Route path="/payment-complete" element={<PaymentComplete />} />
          <Route
            path="/payments"
            element={user ? <PaymentsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={
              user ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-project"
            element={user ? <CreateProject /> : <Navigate to="/login" />}
          />
          <Route path="/projects" element={<ProjectsList />} />
          <Route
            path="/edit-project/:id"
            element={user ? <EditProject /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-projects"
            element={user ? <MyProjects /> : <Navigate to="/login" />}
          />
          <Route
            path="/post-form"
            element={user ? <CreatePosts /> : <Navigate to="/login" />}
          />
          <Route path="/project/:id" element={<ProjectCard />} />
          <Route
            path="/chat"
            element={user ? <ChatApp /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat/:id"
            element={user ? <ChatApp /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/users/:userId/verify/:token"
            element={!user ? <VerifyEmail /> : <Navigate to="/" />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/posts" element={<PostsPage />}></Route>
          <Route
            path="create-post"
            element={user ? <CreatePosts /> : <Navigate to="/" />}
          />
          <Route path="posts/details/:id" element={<PostDetails />} />
          <Route path="posts/categories/:category" element={<Category />} />
          <Route
            path="/admin-dashboard"
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/block"
            element={user?.isAdmin ? <UserList /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard/comments-table"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );

}

export default App;
