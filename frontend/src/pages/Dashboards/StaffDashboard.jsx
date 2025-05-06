import { Outlet } from "react-router-dom";
import StaffNav from "../../components/StaffDashboard/StaffNav";
import '../../css/AdminDashboard/admin-dashboard.css';

function StaffDashboard() {
    return (
        <>
            <div className="dash">
                <StaffNav />
                <Outlet />
            </div>
        </>
    );
}

export default StaffDashboard;