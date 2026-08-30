import { useAuth } from "../../Context/useAuth"
import UserDashboard from "../Users/userDashboard"
import AdminDashboard from "../Admins/adminDashboard"

export default function RoleBasedOverview() {
    const {user}=useAuth()
    return user?.role === 'admin'? <AdminDashboard/>:<UserDashboard/>
    
}
