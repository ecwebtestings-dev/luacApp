import ManageProjects from "../Admins/manageProjects"
import ManageEvents from "../Admins/manageEvents"
import { useAuth } from "../../Context/useAuth"

export default function RoledBaseProjects() {

  const {user}=useAuth()
  return user?.role ==='admin'?<ManageProjects/>:<ManageEvents/>
  
}
