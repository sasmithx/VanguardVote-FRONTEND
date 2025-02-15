import React from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";

const Home = () => {

  useUserAuth();

  return (
    <DashboardLayout activeMenu='Dashboard'>
    <div>Home</div>
    </DashboardLayout>
  )
}

export default Home