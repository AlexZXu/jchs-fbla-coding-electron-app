import React from "react";
import styles from "./styles/BudgetDetails.module.css";
import { Link } from "react-router-dom";
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
    <div className={styles.budgetContainer}>
      <nav className={styles.navBar}>
        <Link className={styles.navItem} to="/home">Home</Link>
        <Link className={styles.navItem} to="/balance">Balance Details</Link>
        <Link className={`${styles.navItem} ${styles.active}`} to="/budget/details">Budgeting</Link>
        <Link className={styles.navItem} to="/transactions">Transactions</Link>
        <Link className={styles.navItem} to="/settings">Settings</Link>
      </nav>

      <div className={styles.budgetContent}>
        <h2 className={styles.budgetTitle}>Budget Summary</h2>
        <div className={styles.budgetList}>
          {budgetData.map((item) => (
            <div className={styles.budgetItem} key={item.category}>
              <span className={styles.budgetCategory}>{item.category}</span>
              <div className={styles.budgetAmount}>
                <span className={styles.amount}>${item.amount.toFixed(2)}</span>
                <span className={styles.percentage}>{item.percentage}%</span>
              </div>
              <button className={styles.seeMore}>See More</button>
            </div>
          ))}
        </div>
        <h3 className={styles.totalSpent}>
          ${totalSpent.toFixed(2)} / ${totalBudget}
        </h3>
        <Link className={styles.goBack} to="/budget">Go Back</Link>
      </div>
    </div>
  );
};

export default BudgetDetails;