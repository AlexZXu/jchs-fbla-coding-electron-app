/* eslint-disable */
import styles from './styles/Home.module.css'
import { Link } from 'react-router-dom';
import React from 'react';
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
          <h2>Overview</h2>
          <p>Current Balance</p>
          <h3>$19,076,721.74</h3>
          <p>Income this month</p>
          <p className={styles["income"]}>$340,045.23</p>
          <p>Expenses this month</p>
          <p className={styles["expenses"]}>$201,304.89</p>
        </div>
        <div className={styles["recent-transactions-box"]}>
          <h2>Recent Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1/8/2025</td>
                <td>Papa John's</td>
                <td>+10,000</td>
              </tr>
              <tr>
                <td>1/8/2025</td>
                <td>Papa John's</td>
                <td>-5,730</td>
              </tr>
              <tr>
                <td>1/8/2025</td>
                <td>Papa John's</td>
                <td>+6,750</td>
              </tr>
              <tr>
                <td>1/8/2025</td>
                <td>Papa John's</td>
                <td>+750</td>
              </tr>
            </tbody>
          </table>
          <button>Add Transactions</button>
        </div>
        <div className={styles["budget-box"]}>
          <h2>Budget This Month</h2>
          <p>Total Budget Spent</p>
          <p>$112,840.83 / $250,000</p>
          <p>Budget Remaining</p>
          <p>$137,159.17</p>
        </div>
        <div className={styles["saving-goal-box"]}>
          <h2>Saving Goal</h2>
          <p>Amount Saved</p>
          <p>$20,000 / $50,000</p>
          <div className={styles["progress-bar"]}>
            <div className={styles["progress"]} style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
