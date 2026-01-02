import React from 'react'
const handleLogoutConfirm = () => {
    localStorage.removeItem('authData')
    navigate("/login");
  };
const UserDashboard = () => {
  return (
    <div>
      <p>user dashboard</p>
      
    </div>
  )
}

export default UserDashboard
