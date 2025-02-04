import styles from './styles/BudgetHistory.module.css'
import { Link } from 'react-router-dom';
import React from 'react';
import fetchRecords from '../../lib/fetchRecords';
import dayjs from 'dayjs';
import { IoClose, IoOpenOutline } from 'react-icons/io5';

function BudgetHistory() {
  const [budgetHistory, setBudgetHistory] = React.useState([])
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [detailsTarget, setDetailsTarget] = React.useState(0)

  async function fetchData() {
    const budgetData = await fetchRecords("generalBudgets", "month", "desc");

    console.log(budgetData)
    setBudgetHistory(budgetData)
  }

  async function fetchDetails() {

  }

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
                budgetHistory.map(item => {
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
                      <div style={{color: (item.totalSpent / item.goal * 100) < 100 ? '#d6f5d0' : '#f7c6c6'}}>
                        {(item.totalSpent / item.goal * 100).toFixed(1)}%
                      </div>
                      <div>
                        <button onClick={() => {setDetailsOpen(true); setDetailsTarget(item.id);}}><IoOpenOutline /></button>
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
            {detailsTarget}
          </div>
        }

      </div>
    </div>
  )
}


export default BudgetHistory;
