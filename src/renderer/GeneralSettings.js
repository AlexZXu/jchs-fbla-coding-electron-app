//imports
import React from 'react';
import styles from './styles/GeneralSettings.module.css';
import { Link } from 'react-router-dom';


//function to the general settings
function GeneralSettings() {
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
        <div className={styles["general-box"]}>
          <h2 className={styles["section-title"]}>General</h2>
          <div className={styles["settings-info"]}>
            <p><strong>Language:</strong> English (United States)</p>
            <p><strong>Currency:</strong> USD</p>
          </div>
          <div className={styles["account-actions"]}>
            <Link className={styles["back-button"]} to="/settings">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralSettings;
