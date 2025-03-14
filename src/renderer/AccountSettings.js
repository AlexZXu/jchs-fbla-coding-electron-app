import React from 'react';
import styles from './styles/AccountSettings.module.css';
import { Link } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import fetchSingleRecord from '../../lib/fetchSingleRecord';

function AccountSettings() {

  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  async function getUserInfo() {
    const userData = await fetchSingleRecord("users", null);
    setUsername(userData.username);
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
  }
  
  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <Link className={styles["nav-button"]} to="/balance">Balance Details</Link>
        <Link className={styles["nav-button"]} to="/budget">Budgeting</Link>
        <Link className={styles["nav-button"]} to="/transactions">Transactions</Link>
        <Link className={`${styles["nav-button"]} ${styles["active"]}`} to="/settings">Settings</Link>
      </nav>
      <div className={styles["settings-content"]}>
        <div className={styles["account-box"]}>
          <h2 className={styles["section-title"]}>Account</h2>
          <div className={styles["settings-info"]}>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>First Name:</strong> {firstName}</p>
            <p><strong>Last Name:</strong> {lastName}</p>
          </div>
          <div className={styles["account-actions"]}>
            <Link className={styles["back-button"]} to="/settings">Back</Link>
            <button className={styles["signout-button"]}>Sign out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
