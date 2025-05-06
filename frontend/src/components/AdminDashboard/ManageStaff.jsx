import '../../css/AdminDashboard/admin-dashboard.css'
import '../../css/AdminDashboard/manage-content.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useParams } from 'react';

function ManageStaff() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
  // Fetch all users 
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/staffs'); // Get users from the backend
        setUsers(response.data.staff);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []); // runs once on mount

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/user/${id}`);
      if (response.data.success) {
        // Remove the deleted user from the users state to update the UI
        setUsers(users.filter(user => user._id !== id));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  function handleAddUser() {
    navigate('/a-dash/addStaff')
  }

  const handleUpdateUser = (userId) => {
    navigate(`/a-dash/updateStaff/${userId}`);
  };

    return (
        <>
            <div className="admin-dash">
                <h1 className="admin-dash-heading">Manage Staff</h1>
                
                <div className="manage">
                    <button className="add" onClick={handleAddUser}>Add Staff</button>
                    <div className="table-container">
                    <table className="manage-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button className="update-btn" onClick={() => handleUpdateUser(user._id)}>Update</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    
                </div>

            </div>
        </>
    );
}

export default ManageStaff;