"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/userSlice";
import { useRouter } from "next/navigation";

const AuthWrap = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrap;