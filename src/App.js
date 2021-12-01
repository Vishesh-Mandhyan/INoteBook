import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotesState from "./context/notes/noteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() {
  return (
    <>
      <NotesState>
       <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </NotesState>
    </>
  );
}

export default App;
