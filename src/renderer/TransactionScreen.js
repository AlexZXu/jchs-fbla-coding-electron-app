/* eslint-disable */

import React from 'react';
import styles from './styles/Transactions.module.css'
import { Link } from 'react-router-dom';

function TransactionScreen() {
  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <button className={styles["nav-button"]}>Balance Details</button>
        <button className={styles["nav-button"]}>Budgeting</button>
        <Link className={styles["nav-button active"]} to="/transactions">Transactions</Link>
        <button className={styles["nav-button"]}>Settings</button>
      </nav>
      <div className={styles["transactions-content"]}>
        <div className={styles["transactions-box"]}>
          <h2>All Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1/8/2025</td>
                <td>Papa John's</td>
                <td>+10,000</td>
              </tr>
              <tr>
                <td>1/8/2025</td>
                <td>Papa John's</td>
                <td>-5,730</td>
              </tr>
              <tr>
                <td>1/8/2025</td>
                <td>Papa John's</td>
                <td>+6,750</td>
              </tr>
              <tr>
                <td>1/8/2025</td>
                <td>Papa John's</td>
                <td>+750</td>
              </tr>
            </tbody>
          </table>
          <button className={styles["add-button"]}>Add Transactions</button>
        </div>
      </div>
    </div>
  );
}

export default TransactionScreen;
