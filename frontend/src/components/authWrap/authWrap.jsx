"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "@/store/userSlice";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const AuthWrap = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false); // Track if we've redirected once

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, { withCredentials: true });
        if (data?.data) {
          
          dispatch(login(data.data));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        dispatch(logout());
      }
      setLoading(false);
    };

    if (!isAuthenticated) {
      verifyUserSession();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!loading && !hasRedirected) {
      if (isAuthenticated && pathname === "/login") {
        router.replace("/dashboard");
      } else if (!isAuthenticated && pathname !== "/login") {
        router.replace("/login");
      }
      setHasRedirected(true);
    }
  }, [loading, isAuthenticated, pathname, router, hasRedirected]);

  if (loading) return <LoadingSpinner />;

  return <>{children}</>;
};

export default AuthWrap;
