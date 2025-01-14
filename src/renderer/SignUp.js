/* eslint-disable */
import { Link } from 'react-router-dom';
import styles from './styles/Auth.module.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { auth } from '../../lib/firebase';

function SignUp() {
  const [stage, setStage] = React.useState(1);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [verify, setVerify] = React.useState("")
  const [errorMessage, setErrorMessage] = React.useState("")

  async function signup(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      window.localStorage.setItem("user_id", user.uid)
      console.log(user)
      // ...
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
        <img
          src={require("../../assets/logo.png")}
          alt="FINCORP Logo"
          className="logo"
        />
        <h2>Sign Up</h2>
        {
          stage == 1 ?
          <form className={styles["input-group"]}>
            <label>First Name</label>
            <input type="text" placeholder="Enter your first name" onChange={(e) => {setFirstName(e.target.value)}} value={firstName} />
            <label>Last Name</label>
            <input type="text" placeholder="Enter your last name" onChange={(e) => {setLastName(e.target.value)}} value={lastName} />
            <button onClick={() => {setStage(2)}} className={styles["submit-button"]}>Continue</button>
          </form>
          :
          <form className={styles["input-group"]}>
            <label>Email</label>
            <input type="text" placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value)}} value={email} />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" onChange={(e) => {setPassword(e.target.value)}} value={password} />
            <label>Verify Password</label>
            <input type="password" placeholder="Verify your password" onChange={(e) => {setVerify(e.target.value)}} value={verify} />

            {errorMessage}
            <button type="submit" className={styles["submit-button"]} onClick={signup}>Sign Up</button>
          </form>
        }


        <div className={styles["links"]}>
          <Link to="/">Already have an account? Log In here</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
