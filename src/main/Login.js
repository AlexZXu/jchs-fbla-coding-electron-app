// src/Login.js
import React from 'react';
import '../main/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Fincorp</h1>
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="links">
            <a href="#">Forgot username or password? <span>Reset Here</span></a>
            <a href="#">Don't have an account? <span>Sign Up</span></a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
