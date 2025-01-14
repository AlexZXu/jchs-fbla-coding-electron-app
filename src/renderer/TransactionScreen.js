/* eslint-disable */

import React from 'react';
import styles from './styles/Transactions.module.css'
import { Link } from 'react-router-dom';
import TransactionList from './TransactionList';

function TransactionScreen() {
  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <Link className={styles["nav-button"]} to="/balance">Balance Details</Link>
        <Link className={styles["nav-button"]} to="/budget">Budgeting</Link>
        <Link className={`${styles["nav-button"]} ${styles["active"]}`} to="/transactions">Transactions</Link>
        <Link className={styles["nav-button"]} to="/settings">Settings</Link>
      </nav>
      <div className={styles["transactions-content"]}>
        <div className={styles["transactions-box"]}>
          <h2>All Transactions</h2>
          <TransactionList />
          <button className={styles["add-button"]}>Add Transactions</button>
        </div>
      </div>
    </div>
  );
}

export default TransactionScreen;
