import React, { useState } from "react";
import login from "../assets/login.png";
import axios from "axios";


import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const[fullname,setFullname]=useState("");
  const[username,setUsername]=useState("");
  const[phone,setPhone]=useState("");
  const[password,setPassword]=useState("");

  const submit=async()=>{
    console.log("hiii");
    await axios.post("http://localhost:3001/register",{
      fullname: fullname,
      username: username,
      phone: phone,
      password: password
    }).then((res)=>{
      alert("Account Created Successfully");
      navigate("/");
    }).catch((err)=>{
      console.log(err);
      alert("Error while creating account");
    })
  }
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="hidden lg:block bg-purple-100 w-full h-screen ">
          <div className="w-full h-full flex">
            <img src={login} className="w-1/2 h-1/2 m-auto" />
          </div>
        </div>

        {/* form */}
        <div className="p-10 flex flex-col items-center w-full h-screen font-body">
          <h1 className="text-fuchsia-600 font-bold my-10 text-2xl lg:text-4xl font-body">
            Create your account
          </h1>

          <div className="flex flex-col items-center gap-4 bg-white p-5 rounded-md">
            <div>
              <label className="text-base text-purple-700">FullName</label>
              <br />
              <input
                type="text"
                className="rounded-lg border-gray-400 h-10 focus:ring-pink-600"
                onChange={(e)=>{setFullname(e.target.value)}}
              />
            </div>

            <div>
              <label className="text-base text-purple-700">Username</label>
              <br />
              <input
                type="text"
                className="rounded-lg border-gray-400 h-10 focus:ring-pink-600"
                onChange={(e)=>{setUsername(e.target.value)}}
              />
            </div>

            <div>
              <label className="text-base text-purple-700">Password</label>
              <br />
              <input
                type="password"
                className="rounded-lg border-gray-400 h-10 focus:ring-pink-600"
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>

            <div>
              <label className="text-base text-purple-700">Phone</label>
              <br />
              <input
                type="number"
                className="rounded-lg border-gray-400 h-10 focus:ring-pink-600"
                onChange={(e)=>{setPhone(e.target.value)}}
              />
            </div>

            <button className="mt-10 shadow bg-fuchsia-600 border-fuchsia-600 hover:bg-fuchsia-700 hover:fuchsia-teal-700 rounded-lg text-white px-4 py-2 font-medium w-40 lg:w-56" onClick={submit}>
              Register
            </button>

            {/* <p>Trouble logging in?</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
