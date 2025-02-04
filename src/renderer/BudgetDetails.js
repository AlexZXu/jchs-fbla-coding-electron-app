//Imports
import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/BudgetDetails.module.css";
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp, updateDoc, setDoc, doc } from 'firebase/firestore';
import twoDecimal from "../../lib/TwoDecimal";
import fetchSingleRecord from "../../lib/fetchSingleRecord";
//Budget Details Specifics
function BudgetDetails() {
  //Constant of all the categories initialization
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
  //Sets the budget id
  const [budgetId, setBudgetId] = React.useState(0)
  //Creates the categories preused
  const [goalData, setGoalData] = React.useState([
    {category: "Dining", goal: 23.32},
    {category: "Gas", goal: 45.32},
    {category: "Savings", goal: 24.00},
    {category: "Entertainment", goal: 50.00},
    {category: "Essentials", goal: 60.00},
    {category: "Other", goal: 32.00},
  ])
  //Sets the goals of the savings
  const [goal, setGoal] = React.useState(0)
  //Function to edit the goal
  function modifyGoalData(category, value) {
    //Sets the variables
    let previousGoalData = [...goalData]
    let hasNegative = false
    previousGoalData.forEach((el, id) => {
      //checks if the category matches
      if (el.category.toLowerCase() == category.toLowerCase()) {
        if (Number(value) < 0) {
          hasNegative = true;
        }
        previousGoalData[id].goal = Number(value)
      }
    })
    //If its negative set a warning
    if (hasNegative == true) {
      setNegativeWarn(true);
    }
    else if (hasNegative == false) {
      setNegativeWarn(false);

    //   //shift
    //   if (goal > 0) {
    //     const valueForOther = goal - previousGoalData[0].goal - previousGoalData[1].goal - previousGoalData[2].goal - previousGoalData[3].goal - previousGoalData[4].goal
    //     if (valueForOther >= 0) {
    //       previousGoalData[5].goal = valueForOther
    //     }
    //     else {
    //       setGoal((prevGoal) => prevGoal - valueForOther)
    //     }
    //   }
    // }
    }

    //Sets the goal data if it passes the checks
    setGoalData(previousGoalData)
  }

  function matchSum() {
    let sum = 0
    for (const row of goalData) {
      sum += row.goal
    }

    setGoal(sum)
  }

  //Sets the constants of the categories
  const [keys, setKeys] = React.useState(["Entertainment", "Essentials", "Dining", "Gas", "Other", "Savings"])

  const [negativeWarn, setNegativeWarn] = React.useState(false);

  //Gets the budget
  async function getBudget() {
    //fetches the recrods
    const budgetData = await fetchSingleRecord("generalBudgets");
    //sets all the items of the goal
    for (const item of goalData) {
      item.goal = budgetData.categories[item.category.toLowerCase()].goal
    }
    //sets the values
    setBudgetId(budgetData.id)

    setGoal(budgetData.goal)

    setBudgetData(budgetData)
  }
  //Function to cancel editing
  function cancel() {
    setEditOpen(false)
    setNegativeWarn(false)
    getBudget()
  }
  //Updates the values
  async function update() {
    //get hte constants
    const docRef = doc(db, "generalBudgets", budgetId);
    const uid = sessionStorage.getItem("uid")

    //Makes  alist of the categories and adding the goal data
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
      },
      goal: Number(goal)
    }

    await setDoc(docRef, payload, {merge: true})
  }

  //Function to submit the changes
  async function submit() {
    //makes sure update and get the budget before locking changes
    await update()

    await getBudget()
    setEditOpen(false)
  }
  //Gets the budget
  React.useState(() => {
    getBudget()
  }, [])
  //Check is it is editable or not
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
                  <input className={styles["budget-input"]} value={goalData.find(i => i.category.toUpperCase() == item.toUpperCase()).goal} onChange={(e) => {modifyGoalData(item, e.target.value)}} type="number">
                  </input> :
                  <span className={styles["budget-goal"]}>
                    {twoDecimal(budgetData.categories[item.toLowerCase()].goal)}
                  </span>
                }
                <span className={styles.percentage}>{((goalData.find(i => i.category.toUpperCase() == item.toUpperCase()).goal / budgetData.goal) * 100).toFixed(1)}%</span>
              </div>
              <Link className={styles["see-more"]} to="/budget/transactions" state={{category: item}}>See More</Link>
            </div>
          ))}
        </div>

        <div style={{display: 'flex'}}>
          <div className={styles["total-spent"]}>
            <span> ${budgetData.totalSpent.toFixed(2)} / </span>
            {
              editOpen ?
              <input className={styles["goal-input"]} type="number" value={goal} onChange={(e) => {setGoal(e.target.value); if (Number(e.target.value) < 0) {setNegativeWarn(true)} else{setNegativeWarn(false)}}}></input>
              :
              <span> ${budgetData.goal}</span>
            }
          </div>
          <div className={styles["progress-bar"]}>
            <div className={styles["progress"]} style={{ width: (budgetData.totalSpent / budgetData.goal) * 100 + '%' }}></div>
          </div>
        </div>

        <div className={styles["button-group"]}>
          {
            negativeWarn == true &&
            <div className={styles["warning-message"]}>Budgets can't be negative!</div>
          }
          {
            editOpen ?
            <>
             <button className={styles["cancel-button"]} onClick={() => {cancel()}}>Cancel</button>
             <button className={styles["sum-button"]} onClick={() => {matchSum()}}>Set Total to Sum</button>
             <button className={styles["submit-button"]} style={{background: negativeWarn ? "#808080" : "#4CAF50"}} onClick={() => {if (negativeWarn == false) {submit()}}}>Submit</button>
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
