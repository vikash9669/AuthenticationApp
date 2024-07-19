import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import EditDetails from "./EditDetails";
import UpdateAvatar from "./UpdateAvatar";

const Home = () => {
  const inputAvatar = useRef(null);
  const navigate = useNavigate();
  const [model, setModel] = useState(false);
  const [avatarModel, setAvatarModel] = useState(false);
  const { auth, user, getUserInfo } = useAuth();

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("auth")) || null;
    if (userInfo) {
      getUserInfo(userInfo.token);
    } else {
      navigate("/login");
    }
  }, []);

  console.log(user.imgUrl, "user image");
  const handleInputAvatar = () => {
    setAvatarModel(!avatarModel);
  };

  return (
    <>
      <EditDetails model={model} setModel={setModel} />
      <UpdateAvatar avatarModel={avatarModel} setAvatarModel={setAvatarModel} />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center p-6 w-full max-w-2xl bg-white rounded-lg shadow-lg">
          <div className="avatar mb-4">
            <div
              className="w-40 h-40 rounded-full overflow-hidden cursor-pointer"
              onClick={() => handleInputAvatar()}
            >
              {user.imgUrl ? (
                <img src={user.imgUrl} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Default Avatar" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-center mb-4">
            <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg shadow-md mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Name:</span>
                <span className="text-gray-900 font-semibold">{user.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Email:</span>
                <span className="text-gray-900 font-semibold">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Phone:</span>
                <span className="text-gray-900 font-semibold">{user.phone}</span>
              </div>
            </div>
            <button
              className="w-full max-w-sm bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 mb-4"
              onClick={() => setModel(!model)}
            >
              Edit Details
            </button>
            <div className="w-full max-w-sm flex justify-around">
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700"
                onClick={() => navigate("/allemployees")}
              >
                All Employee
              </button>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700"
                onClick={() => navigate("/addemployee")}
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
