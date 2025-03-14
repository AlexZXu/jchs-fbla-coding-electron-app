//Imports
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/Auth.module.css'


//Function to log in
function Login() {
  //Sets the constants
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("")
  const navigate = useNavigate()

  //Function to log in
  async function login(e) {
    e.preventDefault();
    //Makes sign in
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      //store user id in local storage
      sessionStorage.setItem("uid", user.uid);

      navigate("/home");
    })
    //Catches for any errors
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

          <button onClick={login} className={styles["submit-button"]}>Log In</button>
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
