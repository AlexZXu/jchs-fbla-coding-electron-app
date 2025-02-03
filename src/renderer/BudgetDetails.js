/* eslint-disable */

import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/BudgetDetails.module.css";
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp, updateDoc, setDoc, doc } from 'firebase/firestore';
import twoDecimal from "../../lib/TwoDecimal";
import fetchSingleRecord from "../../lib/fetchSingleRecord";
const BudgetDetails = () => {
  const [budgetData, setBudgetData] = React.useState({
    categories: {
      entertainment: {
        goal: 0,
        spent: 0
      },
      essentials: {
        goal: 0,
        spent: 0
      },
      dining: {
        goal: 0,
        spent: 0
      },
      gas: {
        goal: 0,
        spent: 0,
      },
      other: {
        goal: 0,
        spent: 0,
      },
      savings: {
        goal: 0,
        spent: 0,
      },
    },
    goal: 0,
    totalSpent: 0
  })

  const [budgetId, setBudgetId] = React.useState(0)

  const [goalData, setGoalData] = React.useState([
    {category: "Dining", goal: 23.32},
    {category: "Gas", goal: 45.32},
    {category: "Savings", goal: 24.00},
    {category: "Entertainment", goal: 50.00},
    {category: "Essentials", goal: 60.00},
    {category: "Other", goal: 32.00},
  ])

  function modifyGoalData(category, value) {
    console.log(value)
    let previousGoalData = [...goalData]
    console.log(category)
    previousGoalData.forEach((el, id) => {
      console.log(el, id)
      if (el.category.toLowerCase() == category.toLowerCase()) {
        previousGoalData[id].goal = Number(value)
      }
    })

    setGoalData(previousGoalData)
  }

  const [keys, setKeys] = React.useState(["Entertainment", "Essentials", "Dining", "Gas", "Other", "Savings"])

  async function getBudget() {
    const budgetData = await fetchSingleRecord("generalBudgets");

    for (const item of goalData) {
      item.goal = budgetData.categories[item.category.toLowerCase()].goal
    }

    setBudgetId(budgetData.id)

    setBudgetData(budgetData)
  }

  function cancel() {
    setEditOpen(false)

    getBudget()
  }

  async function update() {
    const docRef = doc(db, "generalBudgets", budgetId);
    const uid = sessionStorage.getItem("uid")

    const payload = {
      categories: {
        entertainment: {
          goal: goalData[3].goal
        },
        essentials: {
          goal: goalData[4].goal
        },
        dining: {
          goal: goalData[0].goal
        },
        gas: {
          goal: goalData[1].goal
        },
        other: {
          goal: goalData[5].goal
        },
        savings: {
          goal: goalData[2].goal
        }
      }
    }

    await setDoc(docRef, payload, {merge: true})

  }

  async function submit() {
    await update()

    await getBudget()
    setEditOpen(false)
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
          {keys.map((item) => (
            <div className={styles["budget-item"]} key={item}>
              <span className={styles["budget-category"]}>{item}</span>
              <div className={styles["budget-amount"]}>
                <span className={styles.amount}>${twoDecimal(budgetData.categories[item.toLowerCase()].spent)} /</span>
                {
                  editOpen ?
                  <input className={styles["budget-input"]} value={goalData.find(i => i.category.toUpperCase() == item.toUpperCase()).goal} onChange={(e) => {modifyGoalData(item, e.target.value)}}>
                  </input> :
                  <span className={styles["budget-goal"]}>
                    {twoDecimal(budgetData.categories[item.toLowerCase()].goal)}
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
             <button className={styles["cancel-button"]} onClick={() => {cancel()}}>Cancel</button>
             <button className={styles["submit-button"]} onClick={() => {submit()}}>Submit</button>
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
