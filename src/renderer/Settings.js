import React from 'react';
import styles from './styles/Settings.module.css';
import { Link } from 'react-router-dom';

function Settings() {
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
        <div className={styles["settings-box"]}>
          <h2 className={styles["section-title"]}>Settings</h2>
          <ul className={styles["settings-list"]}>
            <Link to="/settings/account">
              <li className={styles["clickable"]}>
                <span>Account</span>
                <span className={styles["arrow"]}>&gt;</span>
              </li>
            </Link>
            <Link to="/settings/general">
              <li className={styles["clickable"]}>
                <span>General</span>
                <span className={styles["arrow"]}>&gt;</span>
              </li>
            </Link>
            <Link to="/settings/help">
              <li className={styles["clickable"]}>
                <span>Help</span>
                <span className={styles["arrow"]}>&gt;</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Settings;
