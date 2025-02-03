import React from 'react';
import styles from './styles/Budget.module.css';
import { Link } from 'react-router-dom';
import fetchSingleRecord from '../../lib/fetchSingleRecord';

function Budget() {
  const [budgetAmount, setBudgetAmount] = React.useState(250000);
  const [focus, setFocus] = React.useState(0)
  const [focusAmount, setFocusAmount] = React.useState(0)

  const [budgetDetails, setBudgetDetails] = React.useState({
    goal: 0.001,
    spent: 0,
    dining: 0,
    entertainment: 0,
    essentials: 0
  })

  async function getBudget() {
    const balanceData = await fetchSingleRecord("generalBudgets");

    console.log(balanceData)
    setBudgetDetails(balanceData)
  }

  React.useEffect(() => {
    getBudget()
  }, [])

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
          <h2 className={styles["section-title"]}>Budgeting</h2>
          <div className={styles["budget-progress-list"]}>
            <div className={styles["budget-progress"]}>
              <h3 className={styles["overview-subtitle"]}>Budget This Month</h3>
              <h1 style={{fontWeight: '600', fontSize: '17px'}}>${(Math.round(budgetDetails.spent * 100) / 100).toFixed(2)} / ${(Math.round(budgetDetails.goal * 100) / 100).toFixed(2)} </h1>
              <div className={styles["progress-bar"]}>
                <div className={styles["progress"]} style={{ width: '45.7%' }}></div>
              </div>
            </div>

            <div className={styles["budget-progress"]}>
              <h3 className={styles["overview-subtitle"]} >Budget This Month</h3>
              <h1 style={{fontWeight: '600', fontSize: '17px'}}>$114,159.17 / $250,000</h1>
              <div className={styles["progress-bar"]}>
                <div className={styles["progress"]} style={{ width: '45.7%' }}></div>
              </div>
            </div>

            <div className={styles["budget-progress"]}>
              <h3 className={styles["overview-subtitle"]}>Budget This Month</h3>
              <h1 style={{fontWeight: '600', fontSize: '17px'}}>$114,159.17 / $250,000</h1>
              <div className={styles["progress-bar"]}>
                <div className={styles["progress"]} style={{ width: '45.7%' }}></div>
              </div>
            </div>

          </div>
          <Link to="/budget/details" className={styles["view-button"]} style={{width: "100%"}}>View Detailed Budget</Link>

        </div>
        <div className={styles["recommendations-and-history"]}>
          <div className={styles["recommendations-box"]}>
            <h3 className={styles["overview-title"]} style={{marginBottom: '10px'}}>Recommended Budgets</h3>
            <div className={styles["recommendations"]}>
              <div className={styles["recommendation"]} style={{ backgroundColor: '#00FF1A', border: focus == 1 && 'solid 1px yellow'}} onClick={() => {setFocus(1); setFocusAmount(204000)}}>
                <p style={{fontSize: '24px'}}>60%</p>
                <p>$204,000</p>
              </div>
              <div className={styles["recommendation"]} style={{ backgroundColor: '#E1FF00', border: focus == 2 && 'solid 1px yellow' }} onClick={() => {setFocus(2); setFocusAmount(204000)}}>
                <p style={{fontSize: '24px'}}>75%</p>
                <p>$255,000</p>
              </div>
              <div className={styles["recommendation"]} style={{ backgroundColor: '#FFBF00', border: focus == 3 && 'solid 1px yellow' }} onClick={() => {setFocus(3); setFocusAmount(204000)}}>
                <p style={{fontSize: '24px'}}>80%</p>
                <p>$272,000</p>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button className={styles["set-budget-button"]}>Set As Budget</button>
            </div>
          </div>
          <div className={styles["history-box"]}>
            <h3 className={styles["overview-title"]}>Budget History</h3>
            <p className={styles["overview-subtitle"]}>Previous Month Budget</p>
            <p style={{fontWeight: '600', fontSize: '24px'}}>$300,000</p>
            <p className={styles["overview-subtitle"]}>Details</p>
            <p style={{fontWeight: '600', fontSize: '24px' }}>$102.39 over budget</p>
            <p style={{fontWeight: '600', fontSize: '24px'}}>92% of income that month</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button className={styles["check-history-button"]}>Check History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
