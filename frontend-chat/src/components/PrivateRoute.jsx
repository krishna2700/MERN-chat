import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("userInfo") || null);
  const token = currentUser?.token;
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
