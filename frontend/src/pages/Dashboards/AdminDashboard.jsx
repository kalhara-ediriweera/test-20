import { Outlet } from "react-router-dom";
import AdminNav from "../../components/AdminDashboard/AdminNav";
import '../../css/AdminDashboard/admin-dashboard.css';


function AdminDashboard() {
    return (
        <>
            <div className="dash">
                <AdminNav />
                <Outlet />
            </div>
        </>
    );
}

export default AdminDashboard;