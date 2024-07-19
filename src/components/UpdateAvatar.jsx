import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from "../AuthContext";


const UpdateAvatar = ({ avatarModel, setAvatarModel }) => {
  const [avatar, setAvatar] = useState(null);
  const inputAvatar = useRef(null);
  const { auth, user, getUserInfo } = useAuth();


  const handleFileChange = (event) => {
    if (event.target.files.length > 0) setAvatar(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", avatar, user._id);
    formData.append("userId", user._id);
    
    axios
      .put("http://localhost:5000/api/update-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`
        }})
      .then((res) => {
        console.log(res.data);
        getUserInfo(auth.token);
         // Close the modal on success
         setAvatarModel(!avatarModel);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  return (
    <>
      {avatarModel && (
        <div id="crud-modal" className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-4 max-w-md w-full">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Avatar</h3>
              <button type="button" onClick={() => setAvatarModel(!avatarModel)} className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="py-4">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img src={avatar ? URL.createObjectURL(avatar) : user.imgUrl} alt="Current Avatar" className="object-cover w-full h-full" />
                </div>
              </div>
              <form onSubmit={handleUpload} className="flex flex-col items-center">
                <input type="file" name="avatar" id="avatar" onChange={handleFileChange} ref={inputAvatar} className="hidden" />
                <button type="button" onClick={() => inputAvatar.current.click()} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
                  Select New Avatar
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Update Avatar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateAvatar;
