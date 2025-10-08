import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import { getMeAPI } from "../../hooks/authAPI";
import { useAuth } from "../../context/AuthProvider";

const Profile = () => {
  // const [user, setUser] = useState(null);
  const { user, setUser } = useAuth();

    useEffect(() => {
    console.log("loop0")
    console.log(user)
  }, [])

  useEffect(() => {
    if(!user) return;

    console.log("loop1")
    console.log(user)
  }, [user])

  // const fetchData = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       getMeAPI(token).then((res) => {
  //         setUser(res.data);
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <ProfileSideBar />

      {/* Content Area */}
      <div className="flex-1 p-6">
        {user && <Outlet context={{ user, setUser }} />}
        
      </div>
    </div>
  );
};

export default Profile;
