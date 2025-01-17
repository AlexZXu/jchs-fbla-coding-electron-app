/* eslint-disable */
import styles from './styles/Home.module.css'
import { Link } from 'react-router-dom';
import React from 'react';
import TransactionList from './TransactionList';

function App() {
  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={`${styles["nav-button"]} ${styles["active"]}`} to="/home">Home</Link>
        <Link className={styles["nav-button"]} to="/balance">Balance Details</Link>
        <Link className={styles["nav-button"]} to="/budget">Budgeting</Link>
        <Link className={styles["nav-button"]} to="/transactions">Transactions</Link>
        <Link className={styles["nav-button"]} to="/settings">Settings</Link>
      </nav>
      <div className={styles["dashboard-content"]}>
        <div className={styles["overview-box"]}>
          <h2 className={styles["overview-title"]}>Overview</h2>
          <p className={styles["overview-subtitle"]}>Current Balance</p>
          <h3 className={styles["overview-balance"]}>$19,076,721.74</h3>
          <p className={styles["overview-subtitle"]}>Income this month</p>
          <p className={styles["income"]}>$340,045.23</p>
          <p className={styles["overview-subtitle"]}>Expenses this month</p>
          <p className={styles["expenses"]}>$201,304.89</p>
        </div>
        <div className={styles["recent-transactions-box"]}>
          <h2 className={styles["overview-title"]}>Recent Transactions</h2>
          <TransactionList />
          <Link to="/transactions" className={styles["add-button"]} style={{width: "100%"}}>View Transactions</Link>
        </div>
        <div className={styles["budget-box"]}>
          <h2 className={styles["overview-title"]}>Budget This Month</h2>
          <p className={styles["overview-subtitle"]}>Total Budget Spent</p>
          <p style={{fontSize: '20px', fontWeight: '600', marginTop: '-8px'}}>$112,840.83 / $250,000</p>
          <p className={styles["overview-subtitle"]}>Budget Remaining</p>
          <p style={{fontSize: '20px', fontWeight: '600', marginTop: '-8px'}}>$137,159.17</p>
        </div>
        <div className={styles["saving-goal-box"]}>
          <h2 className={styles["overview-title"]}>Saving Goal</h2>
          <p className={styles["overview-subtitle"]}>Amount Saved</p>
          <p  style={{fontSize: '20px', fontWeight: '600', marginTop: '-8px'}}>$20,000 / $50,000</p>
          <div className={styles["progress-bar"]}>
            <div className={styles["progress"]} style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
