import React from 'react';
import styles from './styles/Balance.module.css';
import { Link } from 'react-router-dom';
import fetchSingleRecord from '../../lib/fetchSingleRecord';

function Balance() {
  const [balanceDetails, setBalanceDetails] = React.useState({currentBalance: 0, incomeMonth: 0, incomeYear: 0, expensesMonth: 0, expensesYear: 0});

  React.useEffect(() => {
    const fetchData = async () => {
      const balanceData = await fetchSingleRecord("balances");
      console.log(balanceData)

      setBalanceDetails(balanceData)
    }

    fetchData()
  }, [])
  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <Link className={`${styles["nav-button"]} ${styles["active"]}`} to="/balance">Balance Details</Link>
        <Link className={styles["nav-button"]} to="/budget">Budgeting</Link>
        <Link className={styles["nav-button"]} to="/transactions">Transactions</Link>
        <Link className={styles["nav-button"]} to="/settings">Settings</Link>
      </nav>
      <div className={styles["balance-details-content"]}>
        <div className={styles["balance-box"]}>
          <h2 className={styles["section-title"]}>Balance Details</h2>
          <div>
            <div>
              <div>
                <h3 className={styles["overview-subtitle"]}>Current Balance</h3>
                <h1 className={styles["overview-balance"]}>${(Math.round(balanceDetails.currentBalance * 100) / 100).toFixed(2)}</h1>
              </div>
            </div>
            <div className={styles["income-expense-details"]}>
              <div>
                <p className={styles["overview-subtitle"]}>Income this month</p>
                <p className={styles["income"]}>${(Math.round(balanceDetails.incomeMonth * 100) / 100).toFixed(2)}</p>
              </div>
              <div>
                <p className={styles["overview-subtitle"]}>Income this year</p>
                <p className={styles["income"]}>${(Math.round(balanceDetails.incomeYear * 100) / 100).toFixed(2)}</p>
              </div>
              <div>
                <p className={styles["overview-subtitle"]}>Expenses this month</p>
                <p className={styles["expenses"]}>${balanceDetails.expensesMonth}</p>
              </div>
              <div className={styles["overview-subtitle"]}>
                <p>Expenses this year</p>
                <p className={styles["expenses"]}>${balanceDetails.expensesYear}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["summary-boxes"]}>
          <div className={styles["summary-box"]}>
            <h3>Income and Expenses</h3>
            <p className={styles["overview-title"]}>This Month</p>
          </div>
          <div className={styles["summary-box"]}>
            <h3>Income and Expenses</h3>
            <p className={styles["overview-title"]}>This Year</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
