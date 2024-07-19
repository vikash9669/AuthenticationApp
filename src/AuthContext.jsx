import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const AuthContext = createContext();
import { Navigate, useNavigate } from "react-router-dom";

 const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        id:null,
        token:null,
    });
    const [user, setUser] = useState({
        _id:null,
        email:null,
        phone:null,
        name:null,
        imgUrl:null,
    });

    const getUserInfo = (token) => {
        axios
          .get("http://localhost:5000/api/me", {
            headers: { "x-auth-token": token },
          })
          .then((res) => {
            setUser(res.data);
            
          })
          .catch((err) => {
            alert("Session Expired Login Again!");
            navigate("/login")
            console.error(err); // Handle error
          });
      };

    const login =(id, token)=>{
        setAuth({id, token});
        localStorage.setItem('auth', JSON.stringify({id, token}));
    };

    const register = (id, token)=>{
        setAuth({id, token});
        localStorage.setItem('auth', JSON.stringify({id, token}));
    
    };

    return(
        <AuthContext.Provider value={{auth, setAuth, user, login, register, getUserInfo}}>
            {children}  
        </AuthContext.Provider>
    )
};
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);