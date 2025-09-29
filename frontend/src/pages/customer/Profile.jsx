import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchCustomerAPI } from "../../hooks/customerAPI";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetchCustomerAPI(1);
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <ProfileSideBar />

      {/* Content Area */}
      <div className="flex-1 p-6">
        <Outlet context={{ user, setUser }} />
      </div>
    </div>
  );
};

export default Profile;
