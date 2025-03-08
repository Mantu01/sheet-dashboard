"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "@/store/userSlice";

const AuthWrap = ({ children, requireAuth = true }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`);
        if (response.ok) {
          console.log(response);
          
          const data = await response.json();
          dispatch(login(data.user));
          router.push('/dashboard');
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
    if(isAuthenticated) {
      router.push("/dashboard");
    }
    if (!loading && requireAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, requireAuth, router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthWrap;
