//Imports
import styles from './styles/BudgetHistory.module.css'
import { Link } from 'react-router-dom';
import React from 'react';
import fetchRecords from '../../lib/fetchRecords';
import dayjs from 'dayjs';
import { IoClose, IoOpenOutline } from 'react-icons/io5';

//Function for the budget history
function BudgetHistory() {
  //Set the constants
  const [budgetHistory, setBudgetHistory] = React.useState([])
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [detailsTarget, setDetailsTarget] = React.useState(0)

  const [month, setMonth] = React.useState("")
  const [categories, setCategories] = React.useState({})
  const [goal, setGoal] = React.useState(0)
  const [spent, setSpent] = React.useState(0)

  //Fetches the data from the database
  async function fetchData() {
    const budgetData = await fetchRecords("generalBudgets", "month", "desc");

    setBudgetHistory(budgetData)
  }
  //SEts the details of the history
  function setDetails() {
    //Gets the record
    const record = budgetHistory[detailsTarget]
    //Sets all of the values
    setMonth(record.month)
    setCategories(record.categories)
    setGoal(record.goal)
    setSpent(record.totalSpent)
  }
  //Calls the data
  React.useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <Link className={styles["nav-button"]} to="/balance">Balance Details</Link>
        <Link className={`${styles["nav-button"]} ${styles["active"]}`} to="/budget">Budgeting</Link>
        <Link className={`${styles["nav-button"]}`} to="/transactions">Transactions</Link>
        <Link className={styles["nav-button"]} to="/settings">Settings</Link>
      </nav>
      <div className={styles["history-content"]}>
        <div className={styles["history-box"]}>
          <h2 className={styles["section-title"]}><div>Budget History</div><div><Link to="/budget" className={styles["back-button"]}>Go Back</Link></div></h2>

          <div className={styles["history-header"]}>
            <div style={{marginLeft: '5px'}}>
              Date
            </div>
            <div style={{marginLeft: '5px'}}>
              Spent
            </div>
            <div style={{marginRight: '5px'}}>
              Budgeted
            </div>
            <div style={{marginRight: '5px'}}>
              Percent Used
            </div>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: '6px'}}>
            {
                budgetHistory.map((item, index) => {
                  return (
                    <div className={styles["budget-record"]} key={item.id}>
                      <div>
                        {dayjs(item.month + "-01").format('M/YYYY')}
                      </div>
                      <div>
                        ${item.totalSpent.toFixed(2)}
                      </div>
                      <div>
                        ${item.goal.toFixed(2)}
                      </div>
                      <div style={{color: (item.totalSpent / item.goal * 100) < 100 ? '#b3f5a6' : '#f7c6c6'}}>
                        {(item.totalSpent / item.goal * 100).toFixed(1)}%
                      </div>
                      <div>
                        <button onClick={() => {setDetailsOpen(true); setDetailsTarget(index); setDetails()}}><IoOpenOutline /></button>
                      </div>
                    </div>
                  )
                })
              }
          </div>
        </div>

        {
          detailsOpen &&
          <div className={styles["budget-detail-container"]}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <button onClick={() => {setDetailsOpen(false);}}><IoClose /></button>
            </div>
            <div className='text-xl text-center font-semibold m-[-10px] text-slate-900'>
             Budget for {dayjs(month + "-01").format('M/YYYY')}
            </div>

            <div className='text-lg text-center font-semibold text-blue-800'>
              Categories
            </div>
            <div className={styles["categories-container"]}>
              <div className={styles["category-block"]}>
                <div className={styles["category-title"]}>Entertainment</div>
                <div className={styles["category-field"]}>Spent: ${(categories.entertainment.spent).toFixed(2)}</div>
                <div className={styles["category-field"]}>Budget: ${(categories.entertainment.goal).toFixed(2)}</div>
              </div>
              <div className={styles["category-block"]}>
                <div className={styles["category-title"]}>Essentials</div>
                <div className={styles["category-field"]}>Spent: ${(categories.essentials.spent).toFixed(2)}</div>
                <div className={styles["category-field"]}>Budget: ${(categories.essentials.goal).toFixed(2)}</div>
              </div>
              <div className={styles["category-block"]}>
                <div className={styles["category-title"]}>Dining</div>
                <div className={styles["category-field"]}>Spent: ${(categories.dining.spent).toFixed(2)}</div>
                <div className={styles["category-field"]}>Budget: ${(categories.dining.goal).toFixed(2)}</div>
              </div>
              <div className={styles["category-block"]}>
                <div className={styles["category-title"]}>Gas</div>
                <div className={styles["category-field"]}>Spent: ${(categories.gas.spent).toFixed(2)}</div>
                <div className={styles["category-field"]}>Budget: ${(categories.gas.goal).toFixed(2)}</div>
              </div>
              <div className={styles["category-block"]}>
                <div className={styles["category-title"]}>Other</div>
                <div className={styles["category-field"]}>Spent: ${(categories.other.spent).toFixed(2)}</div>
                <div className={styles["category-field"]}>Budget: ${(categories.other.goal).toFixed(2)}</div>
              </div>
              <div className={styles["category-block"]}>
                <div className={styles["category-title"]}>Savings</div>
                <div className={styles["category-field"]}>Saved: ${(categories.savings.spent).toFixed(2)}</div>
                <div className={styles["category-field"]}>Budget: ${(categories.savings.goal).toFixed(2)}</div>
              </div>
            </div>
            <div className={styles["category-overall"]}>
              <div><span className={styles["category-overall-label"]}>Total Spent</span>: ${(spent).toFixed(2)}</div>
              <div><span className={styles["category-overall-label"]}>Total Budgeted</span>: ${(goal).toFixed(2)}</div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}


export default BudgetHistory;
