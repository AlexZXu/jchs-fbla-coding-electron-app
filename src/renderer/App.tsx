/* eslint-disable */
import { MemoryRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../lib/firebase';
import Login from './Login';
import SignUp from './SignUp';
import HomeScreen from './HomeScreen'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}
