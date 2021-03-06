import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Register from "./Components/Register/Register";
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import IndexPage from './Components/IndexPage/IndexPage';
import Profile from './Components/Profile/Profile';
import DashBoard from './Components/DashBoard/DashBoard';





export default function App() {
  return (
      <BrowserRouter>
      <IndexPage /> 
      <Routes>
        <Route path="/" element={<div></div>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/IniciandoSesion" element={<Navigate to= '/Login' />}/>

        <Route path='/Profile/:id' element={<Profile/>}></Route>

        <Route path="/DashBoard/*" element={<DashBoard />}>

          <Route path="welcome" element={<p>welcome</p>}/>
          <Route path="goodbye" element={<p>seeya</p>}/>

        </Route>             
        <Route path="*" element={< NotFound />}/>

      </Routes>
    </BrowserRouter>
  );
}
