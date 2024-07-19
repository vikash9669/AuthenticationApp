import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const EditDetails = ({ model, setModel }) => {
  const { user, getUserInfo } = useAuth();
  const [userData, setUserData] = useState({
    phone: user.phone,
    name: user.name,
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:5000/api/update-profile/${user._id}`, userData)
      .then((res) => {
        console.log("User updated:", res.data);
        alert("User updated successfully");
        // Optionally reset form or navigate on success
        getUserInfo(`${auth.token}`);
      })
      .catch((err) => {
        console.error(err); // Handle error
      });

    setModel(!model);
  };

  return (
    <>
      {model && (
      <div
        id="crud-modal"
        className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-4 max-w-md w-full">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Update User Details
            </h3>
            <button
              type="button"
              onClick={() => setModel(!model)}
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

          <form onSubmit={handleUpdate} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="col-span-2 ">
                <label
                  htmlFor="Phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Phone"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
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
              Update Details
            </button>
          </form>
        </div>
      </div>
       
      )}

    </>
  );
};

export default EditDetails;
