import React from 'react';
import styles from './styles/AccountSettings.module.css';
import { Link } from 'react-router-dom';

function AccountSettings() {
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
          <p><strong>Username:</strong> RichBoi64</p>
          <p><strong>First Name:</strong> Warren</p>
          <p><strong>Last Name:</strong> Buffet</p>
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
