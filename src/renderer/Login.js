/* eslint-disable */
// src/Login.js
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/Auth.module.css'

/*
const docRef = doc(db, "transactions", "1");
    const docSnap = await getDoc(docRef);

    const data = await docSnap.data()

    setFromUser(data?.FromUser)
    setToUser(data?.ToUser)
    */

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("")
  const navigate = useNavigate()

  async function login(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      navigate("/home")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage)
    });
  }


  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <div className={styles["logo-container"]}>
          <img
            src={require("../../assets/logo.png")}
            alt="FINCORP Logo"
            className={styles["logo"]}
          />
          FinApp
        </div>

        <h2>Login</h2>
        <form className={styles["input-group"]}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value)}} value={email} />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" onChange={(e) => {setPassword(e.target.value)}} value={password} />
          {errorMessage}

          <button type="submit" onClick={login} className={styles["submit-button"]}>Log In</button>
        </form>
        <div className={styles["links"]}>
          <a href="/">Forgot username or password?</a>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>

  );
}

export default Login;
