import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import StartChat from "./Pages/StartChat";
import Signup from "./Pages/Signup";
import Report from "./Pages/Report";

export default function App(){
  return(
    <>
      <Routes>
        <Route  path="/" element={<Login/>}/>
        <Route  path="/StartChat/:username/:token" element={<StartChat/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Report/:id/:token/:username" element={<Report/>}/>
      </Routes>
    </>
  )
}