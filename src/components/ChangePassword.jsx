import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const ChangePassword = ({ passModel, setPassModel }) => {
  const { auth, setAuth } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("auth")) || null;
    if (userInfo) {
      setAuth({ ...auth, token: userInfo.token });
    }
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(auth.token,"--------------------------------")
    try {
      const response = await axios.put(
        "http://localhost:5000/api/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            "x-auth-token": `${auth.token}`
          },
        }
      );
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  return (
    <>
      {passModel && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-4 max-w-md w-full">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                change Password
              </h3>
              <button
                type="button"
                onClick={() => setPassModel(!passModel)}
                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4">
              <div className="col-span-2">
                <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Old Password"
                  required
                />
              </div>
              <div className="col-span-2 ">
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="New Password"
                  required
                />
              </div>
              <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              ><svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Change Password</button>
            </div>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </>
  );
};
export default ChangePassword;
