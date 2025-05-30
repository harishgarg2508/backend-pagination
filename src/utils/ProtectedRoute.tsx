import { Outlet ,Navigate } from "react-router-dom";
import { useUser } from "../pages/userdata";

const ProtectedRoute:React.FC = ()=>{
    const {isAuthenticated}  = useUser()
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoute