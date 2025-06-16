import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRole } from "../Utils/roles";

const AdminProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        setAuthorized(false);
        return;
      }
      const role = await getUserRole(currentUser.uid);
      setAuthorized(role === "admin");
    });
    return () => unsubscribe();
  }, []);

  if (authorized === null) return <div>Loading...</div>;

  if (!authorized) return <Navigate to="/" />;

  return children;
};

export default AdminProtectedRoute;
