import React from 'react';
import styles from './styles/Budget.module.css';
import { Link } from 'react-router-dom';

function Budget() {
  const [budgetAmount, setBudgetAmount] = React.useState(250000);
  const [focus, setFocus] = React.useState(0)
  const [focusAmount, setFocusAmount] = React.useState(0)

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
          <h2 className={styles["overview-title"]}>Budgeting</h2>
          <h3 className={styles["overview-subtitle"]}>Budget This Month</h3>
          <h1 style={{fontWeight: '600', fontSize: '18px'}}>$114,159.17 / $250,000</h1>
          <div className={styles["progress-bar"]}>
            <div className={styles["progress"]} style={{ width: '45.7%' }}></div>
          </div>
          <p className={styles["overview-subtitle"]} style={{marginBottom: '-4px'}}>Amount Spent</p>
          <div className={styles["amount-spent-box"]}>
            <h3>$135,840.83</h3>
          </div>
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
            <button className={styles["set-budget-button"]}>Set As Budget</button>
          </div>
          <div className={styles["history-box"]}>
            <h3 className={styles["overview-title"]}>Budget History</h3>
            <p className={styles["overview-subtitle"]}>Previous Month Budget</p>
            <p style={{fontWeight: '600', fontSize: '24px', marginTop: '-10px'}}>$300,000</p>
            <p className={styles["overview-subtitle"]}>Details</p>
            <p style={{fontWeight: '600', fontSize: '24px', marginTop: '-10px' }}>$102.39 over budget</p>
            <p style={{fontWeight: '600', fontSize: '24px', marginTop: '-10px'}}>92% of income that month</p>
            <button className={styles["check-history-button"]}>Check History</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
