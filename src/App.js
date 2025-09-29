import logo from './logo.svg';
import styles from './App.module.css';
import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Join from './pages/Join/Join';
import Login from './pages/Login/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='join' element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
