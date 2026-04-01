import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperadminDashboard from "../dashboards/SuperadminDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";
import ManagerDashboard from "../dashboards/ManagerDashboard";
import PelangganDashboard from "../dashboards/PelangganDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    
    console.log("Dashboard - Token:", token ? "Ada" : "TIDAK ADA");
    console.log("Dashboard - User raw:", userRaw);
    
    if (!token || !userRaw) { 
      console.warn("Redirect ke login: token atau user tidak ada");
      navigate("/"); 
      return; 
    }
    
    try {
      const user = JSON.parse(userRaw);
      console.log("User yang diparsing:", user);
      
      if (!user.role) {
        console.warn("User tidak memiliki role");
        navigate("/");
        return;
      }
      
      setRole(user.role);
      console.log("Role set ke:", user.role);
    } catch (err) {
      console.error("Error parsing user:", err);
      navigate("/");
    }
  }, [navigate]);

  if (!role) return null;

  switch (role) {
    case "superadmin": return <SuperadminDashboard />;
    case "admin":      return <AdminDashboard />;
    case "manager":    return <ManagerDashboard />;
    case "pelanggan":  return <PelangganDashboard />;
    default:           navigate("/"); return null;
  }
};

export default Dashboard;