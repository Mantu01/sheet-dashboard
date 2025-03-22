"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/store/userSlice";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";

const AuthWrap = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, 
          { withCredentials: true }
        );
        
        if (data?.data) {
          dispatch(login(data.data));
          router.push("/dashboard");
        } else {
          router.push("/login");
          dispatch(logout());
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    if (!isAuthenticated || (isAuthenticated && !user)) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  if (loading) return <LoadingSpinner />;

  return <>{children}</>;
};

export default AuthWrap;