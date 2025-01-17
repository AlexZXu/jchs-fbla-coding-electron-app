import React from 'react';
import styles from './styles/Balance.module.css';
import { Link } from 'react-router-dom';

function Balance() {
  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <Link className={`${styles["nav-button"]} ${styles["active"]}`} to="/balance">Balance Details</Link>
        <Link className={styles["nav-button"]} to="/budget">Budgeting</Link>
        <Link className={styles["nav-button"]} to="/transactions">Transactions</Link>
        <Link className={styles["nav-button"]} to="/settings">Settings</Link>
      </nav>
      <div className={styles["balance-details-content"]}>
        <div className={styles["balance-box"]}>
          <h2 className={styles["overview-title"]}>Balance Details</h2>
          <h3 className={styles["overview-subtitle"]}>Current Balance</h3>
          <h1 className={styles["overview-balance"]}>$19,076,721.74</h1>
          <div className={styles["income-expense-details"]}>
            <div>
              <p className={styles["overview-subtitle"]}>Income this month</p>
              <p className={styles["income"]}>$340,045.23</p>
            </div>
            <div>
              <p className={styles["overview-subtitle"]}>Income this year</p>
              <p className={styles["income"]}>$2,740,045.87</p>
            </div>
            <div>
              <p className={styles["overview-subtitle"]}>Expenses this month</p>
              <p className={styles["expenses"]}>$201,304.89</p>
            </div>
            <div className={styles["overview-subtitle"]}>
              <p>Expenses this year</p>
              <p className={styles["expenses"]}>$3,658,390.22</p>
            </div>
          </div>
        </div>
        <div className={styles["summary-boxes"]}>
          <div className={styles["summary-box"]}>
            <h3>Income and Expenses</h3>
            <p className={styles["overview-title"]}>This Month</p>
          </div>
          <div className={styles["summary-box"]}>
            <h3>Income and Expenses</h3>
            <p className={styles["overview-title"]}>This Year</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
