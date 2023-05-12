import React, { useState } from "react";
import login from "../assets/login.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Signup from "./Signup";

const Login = () => {
    localStorage.clear();
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        navigate("/signup");
    };

    const submit = async () => {
        await axios
            .post(`http://localhost:3001/login`, {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res);
                if (res.data.success && res.data.data && res.data.auth) {
                    // console.log("hiii");
                    // console.log(res.data.data._id);
                    localStorage.setItem("token", res.data.auth);
                    localStorage.setItem("_id", res.data.data._id);
                    localStorage.setItem("username", res.data.data.username)
                    // localStorage.setItem("username", res.data.data[0].username);
                    //navigate(`/FriendList/${res.data.auth}/${res.data.data._id}/${res.data.data.username}`);
                    navigate(`/StartChat/${res.data.data.username}/${res.data.auth}`);
                } else {
                    alert("Invalid Credentials");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                    <h1 className="text-fuchsia-600 font-bold my-10 text-4xl font-body">
                        Login
                    </h1>

                    <div className="flex flex-col items-center gap-4 bg-white p-10 rounded-md">
                        <div>
                            <label className="text-base text-purple-700">Username</label>
                            <br />
                            <input
                                type="text"
                                className="rounded-md border-gray-400 h-10 focus:ring-pink-600"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-base text-purple-700">Password</label>
                            <br />
                            <input
                                type="password"
                                className="rounded-md border-gray-400 h-10 focus:ring-pink-600"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <p className="text-fuchsia-600 font-medium text-left">
                            Forgot Password?
                        </p>

                        <button
                            className="mt-10 shadow bg-fuchsia-600 border-fuchsia-600 hover:bg-fuchsia-700 hover:fuchsia-teal-700 rounded-md text-white px-4 py-2 font-medium w-40"
                            onClick={submit}
                        >
                            Login
                        </button>

                        {/* <p>Trouble logging in?</p> */}
                    </div>

                    <div>
                        <p className="text-fuchsia-600 font-medium text-left">
                            Don't have an account?{" "}
                            <span
                                className="text-fuchsia-800 font-bold text-lg cursor-pointer"
                                onClick={signUp}
                            >
                                {" "}
                                SignUp{" "}
                            </span>{" "}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
