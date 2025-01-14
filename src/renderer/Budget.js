import React from 'react';
import styles from './styles/Budget.module.css';
import { Link } from 'react-router-dom';

function Budget() {
  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <Link className={styles["nav-button"]} to="/balance">Balance Details</Link>
        <Link className={`${styles["nav-button"]} ${styles["active"]}`} to="/budget">Budgeting</Link>
        <Link className={styles["nav-button"]} to="/transactions">Transactions</Link>
        <Link className={styles["nav-button"]} to="/settings">Settings</Link>
      </nav>
      <div className={styles["budgeting-content"]}>
        <div className={styles["budget-box"]}>
          <h2>Budgeting</h2>
          <h3>Budget This Month</h3>
          <h1>$114,159.17 / $250,000</h1>
          <div className={styles["progress-bar"]}>
            <div className={styles["progress"]} style={{ width: '45.7%' }}></div>
          </div>
          <p>Amount Spent</p>
          <div className={styles["amount-spent-box"]}>
            <h3>$135,840.83</h3>
          </div>
        </div>
        <div className={styles["recommendations-and-history"]}>
          <div className={styles["recommendations-box"]}>
            <h3>Recommended Budgets</h3>
            <div className={styles["recommendations"]}>
              <div className={styles["recommendation"]} style={{ backgroundColor: 'lightgreen' }}>
                <p>60%</p>
                <p>$204,000</p>
              </div>
              <div className={styles["recommendation"]} style={{ backgroundColor: 'lightyellow' }}>
                <p>75%</p>
                <p>$255,000</p>
              </div>
              <div className={styles["recommendation"]} style={{ backgroundColor: 'lightorange' }}>
                <p>80%</p>
                <p>$272,000</p>
              </div>
            </div>
            <button className={styles["set-budget-button"]}>Set As Budget</button>
          </div>
          <div className={styles["history-box"]}>
            <h3>Budget History</h3>
            <p>Previous Month Budget</p>
            <p>$300,000</p>
            <p>Details</p>
            <p>$102.39 over budget</p>
            <p>92% of income that month</p>
            <button className={styles["check-history-button"]}>Check History</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
