/* eslint-disable */

import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/BudgetDetails.module.css";
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp, updateDoc, setDoc, doc } from 'firebase/firestore';
import twoDecimal from "../../lib/TwoDecimal";
import fetchSingleRecord from "../../lib/fetchSingleRecord";
const BudgetDetails = () => {
  const budgetData = {
    categories: {
      dining: {
        goal: 0,
        spent: 0
      },
      entertainment: {
        goal: 0,
        spent: 0
      },
      essentials: {
        goal: 0,
        spent: 0
      },
      gas: {
        goal: 0,
        spent: 0,
      },
      savings: {
        goal: 0,
        spent: 0,
      },
      other: {
        goal: 0,
        spent: 0,
      },
    },
    goal: 0,
    totalSpent: 0
  }

  const [goalData, setGoalData] = React.useState([
    {category: "Dining", goal: 23.32},
    {category: "Gas", goal: 45.32},
    {category: "Savings", goal: 24.00},
    {category: "Entertainment", goal: 50.00},
    {category: "Essentials", goal: 60.00},
    {category: "Other", goal: 32.00},
  ])

  function modifyGoalData(category, value) {
    let previousGoalData = [...goalData]
    previousGoalData.find(i => i.category == category).goal = value
    console.log(previousGoalData)

    setGoalData(previousGoalData)
  }

  async function getBudget() {
    const balanceData = await fetchSingleRecord("generalBudgets");

    console.log(balanceData)
  }

  React.useState(() => {
    getBudget()
  }, [])

  const [editOpen, setEditOpen] = React.useState(false)

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
          {Object.keys(budgetData.categories).map((item) => (
            <div className={styles["budget-item"]} key={item}>
              <span className={styles["budget-category"]}>{item}</span>
              <div className={styles["budget-amount"]}>
                <span className={styles.amount}>${twoDecimal(budgetData.categories[item].spent)} /</span>
                {
                  editOpen ?
                  <input className={styles["budget-input"]} value={goalData.find(i => i.category == item.toUpperCase()).goal} onChange={(e) => {modifyGoalData(item, e.target.value)}}>
                  </input> :
                  <span className={styles["budget-goal"]}>
                    {twoDecimal(budgetData.categories[item].goal)}
                  </span>
                }
                <span className={styles.percentage}>{item.percentage}%</span>
              </div>
              <button className={styles["see-more"]}>See More</button>
            </div>
          ))}
        </div>

        <div style={{display: 'flex'}}>
          <h3 className={styles["total-spent"]}>
            ${budgetData.totalSpent.toFixed(2)} / ${budgetData.goal}
          </h3>
          <div className={styles["progress-bar"]}>
            <div className={styles["progress"]} style={{ width: '45.7%' }}></div>
          </div>
        </div>

        <div className={styles["button-group"]}>
          {
            editOpen ?
            <>
             <button className={styles["cancel-button"]} onClick={() => {setEditOpen(true)}}>Cancel</button>
             <button className={styles["submit-button"]} onClick={() => {}}>Submit</button>
            </>
            :
            <button className={styles["edit-button"]} onClick={() => {setEditOpen(true)}}>Edit Budgets</button>
          }
          <Link className={styles["go-back"]} to="/budget">Go Back</Link>
        </div>

      </div>
    </div>
  );
};

export default BudgetDetails;
