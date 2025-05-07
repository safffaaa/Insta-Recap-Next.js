import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectIsAuthenticated } from "../store/authSlice";
import { useEvent } from "../hooks/useEvent";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const { loginRequired } = useEvent();

  useEffect(() => {
    if (loginRequired && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router, loginRequired]);

  return loginRequired ? (isAuthenticated ? children : null) : children;
};

export default ProtectedRoute;
