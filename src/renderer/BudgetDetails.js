/* eslint-disable */

import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/BudgetDetails.module.css";
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp, updateDoc, setDoc, doc } from 'firebase/firestore';

const BudgetDetails = () => {
  const budgetData = [
    { category: "Dining", amount: 38.84, percentage: 34 },
    { category: "Gas", amount: 29.03, percentage: 26 },
    { category: "Savings", amount: 60.35, percentage: 37 },
    { category: "Entertainment", amount: 30.26, percentage: 17 },
    { category: "Gifts", amount: 15.07, percentage: 9 },
    { category: "Essentials", amount: 5.14, percentage: 2 },
  ];

  const totalBudget = 250;
  const totalSpent = budgetData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <Link className={styles["nav-button"]} to="/balance">Balance Details</Link>
        <Link className={`${styles["nav-button"]} ${styles.active}`} to="/budget/details">Budgeting</Link>
        <Link className={styles["nav-button"]} to="/transactions">Transactions</Link>
        <Link className={styles["nav-button"]} to="/settings">Settings</Link>
      </nav>

      <div className={styles["budgeting-content"]}>
        <h2 className={styles["section-title"]}>Budget Summary</h2>
        <div className={styles["budget-list"]}>
          {budgetData.map((item) => (
            <div className={styles["budget-item"]} key={item.category}>
              <span className={styles["budget-category"]}>{item.category}</span>
              <div className={styles["budget-amount"]}>
                <span className={styles.amount}>${item.amount.toFixed(2)}</span>
                <span className={styles.percentage}>{item.percentage}%</span>
              </div>
              <button className={styles["see-more"]}>See More</button>
            </div>
          ))}
        </div>

        <div style={{display: 'flex'}}>
          <h3 className={styles["total-spent"]}>
            ${totalSpent.toFixed(2)} / ${totalBudget}
          </h3>
          <div className={styles["progress-bar"]}>
            <div className={styles["progress"]} style={{ width: '45.7%' }}></div>
          </div>
        </div>

        <div>

        <Link className={styles["go-back"]} to="/budget">Go Back</Link>
        </div>

      </div>
    </div>
  );
};

export default BudgetDetails;
