import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = ({ children }) => {
    const token = Cookies.get("party_menu_token");
    if (!token) { 
         return <Navigate to="/signin" replace />;
    }

  return (children)
}

export default ProtectedRoutes