import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to police users by default
    navigate("/user/police");
  }, [navigate]);

  return null;
};

export default UserManagement;
