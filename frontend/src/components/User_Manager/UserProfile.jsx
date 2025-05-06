

import { Outlet } from 'react-router-dom';
import '../../css/HomePage/userProfile.css';
import UserNav from './usernav';


function UserProfile() {

    

    return (
        <>
            <div className="user-profile">
                <div className="user-right">
                    <UserNav />
                </div>
                <div className="user-left">
                    <Outlet />
                </div>
                
            </div>
        </>
    );
}

export default UserProfile;