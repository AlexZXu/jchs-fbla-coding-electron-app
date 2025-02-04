import React from 'react';
import styles from './styles/Budget.module.css';
import { Link } from 'react-router-dom';
import fetchSingleRecord from '../../lib/fetchSingleRecord';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

function Budget() {
  const [focus, setFocus] = React.useState(0)
  const [focusAmount, setFocusAmount] = React.useState(0)
  const [budgetId, setBudgetId] = React.useState("");

  const [budgetDetails, setBudgetDetails] = React.useState({
    goal: 0,
    totalSpent: 0,
    categories: {
      savings: {
        goal: 0,
        spent: 0
      },
      dining: {
        goal: 0,
        spent: 0
      }
    }
  })

  const [pastBudgetDetails, setPastBudgetDetails] = React.useState({
    goal: 0,
    totalSpent: 0
  })

  const [incomeMonth, setIncomeMonth] = React.useState(0)
  const [pastIncomeMonth, setPastIncomeMonth] = React.useState(0)

  async function getBudget() {
    const balanceData = await fetchSingleRecord("generalBudgets");
    const pastBalanceData = await fetchSingleRecord("generalBudgets", "2025-01")
    setBudgetDetails(balanceData)
    setPastBudgetDetails(pastBalanceData)
    setBudgetId(balanceData.id)
  }

  async function getBalance() {
    const balanceData = await fetchSingleRecord("balances");
    const pastBalanceData = await fetchSingleRecord("balances", "2025-01")
    setIncomeMonth(balanceData.incomeMonth)
    setPastIncomeMonth(pastBalanceData.incomeMonth)
  }

  async function setAmountAsBudget() {
    const newBudgetAmount = incomeMonth * focusAmount;
    const docRef = doc(db, "generalBudgets", budgetId);
    const payload = {
      goal: newBudgetAmount
    }

    await setDoc(docRef, payload, { merge: true })
    getBudget()
  }


  React.useEffect(() => {
    getBudget()
    getBalance()
  }, [])

  return (
    <div className={styles['dashboard-container']}>
      <nav className={styles['navbar']}>
        <Link className={styles['nav-button']} to="/home">
          Home
        </Link>
        <Link className={styles['nav-button']} to="/balance">
          Balance Details
        </Link>
        <Link
          className={`${styles['nav-button']} ${styles['active']}`}
          to="/budget"
        >
          Budgeting
        </Link>
        <Link className={styles['nav-button']} to="/transactions">
          Transactions
        </Link>
        <Link className={styles['nav-button']} to="/settings">
          Settings
        </Link>
      </nav>

      <div className={styles['budgeting-content']}>
        <div className={styles['budget-box']}>
          <h2 className={styles['section-title']}>Budgeting</h2>
          <div className={styles['budget-progress-list']}>
            <div className={styles['budget-progress']}>
              <h3 className={styles['overview-subtitle']}>Budget This Month</h3>
              <h1 style={{ fontWeight: '600', fontSize: '17px' }}>
                ${(Math.round(budgetDetails.totalSpent * 100) / 100).toFixed(2)}{' '}
                / ${(Math.round(budgetDetails.goal * 100) / 100).toFixed(2)}{' '}
              </h1>
              <div className={styles['progress-bar']}>
                <div
                  className={styles['progress']}
                  style={{
                    width: `${(budgetDetails.totalSpent / budgetDetails.goal) * 100}%`, background: '#00d22a',
                  }}
                ></div>
              </div>
            </div>

            <div className={styles['budget-progress']}>
              <h3 className={styles['overview-subtitle']}>Monthly Savings</h3>
              <h1 style={{ fontWeight: '600', fontSize: '17px' }}>
                ${budgetDetails.categories.savings.spent} / ${budgetDetails.categories.savings.goal}
              </h1>
              <div className={styles['progress-bar']}>
                <div
                  className={styles['progress']}
                  style={{ width: `${(budgetDetails.categories.savings.spent / budgetDetails.categories.savings.goal) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className={styles['budget-progress']}>
              <h3 className={styles['overview-subtitle']}>Monthly Dining Budget</h3>
              <h1 style={{ fontWeight: '600', fontSize: '17px' }}>
                ${budgetDetails.categories.dining.spent} / ${budgetDetails.categories.dining.goal}
              </h1>
              <div className={styles['progress-bar']}>
                <div
                  className={styles['progress']}
                  style={{ width: `${(budgetDetails.categories.dining.spent / budgetDetails.categories.dining.goal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <Link
            to="/budget/details"
            className={styles['view-button']}
            style={{ width: '100%' }}
          >
            View Detailed Budget
          </Link>
        </div>
        <div className={styles['recommendations-and-history']}>
          <div className={styles['recommendations-box']}>
            <h3
              className={styles['overview-title']}
              style={{ marginBottom: '10px' }}
            >
              Quick Budgets
            </h3>
            <div className={styles['recommendations']}>
              <div
                className={`${styles['recommendation']} ${focus === 1 ? styles['selected'] : ''}`}
                style={{ backgroundColor: '#4CAF50' }}
                onClick={() => {
                  focus === 1 ? setFocus(0) : setFocus(1);
                  setFocusAmount(0.6);
                }}
              >
                <p style={{ fontSize: '24px' }}>60%</p>
                <p>${(incomeMonth * 0.6).toFixed(2)}</p>
              </div>
              <div
                className={`${styles['recommendation']} ${focus === 2 ? styles['selected'] : ''}`}
                style={{ backgroundColor: '#FBC02D' }}
                onClick={() => {
                  focus === 2 ? setFocus(0) : setFocus(2);
                  setFocusAmount(0.75);
                }}
              >
                <p style={{ fontSize: '24px' }}>75%</p>
                <p>${(incomeMonth * 0.75).toFixed(2)}</p>
              </div>
              <div
                className={`${styles['recommendation']} ${focus === 3 ? styles['selected'] : ''}`}
                style={{ backgroundColor: '#E65100' }}
                onClick={() => {
                  focus === 3 ? setFocus(0) : setFocus(3);
                  setFocusAmount(0.9);
                }}
              >
                <p style={{ fontSize: '24px' }}>90%</p>
                <p>${(incomeMonth * 0.9).toFixed(2)}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className={`${styles['set-budget-button']} ${focus === 0 ? styles['disabled'] : styles['enabled']}`} disabled={focus === 0} onClick={setAmountAsBudget}>
                Set As Budget
              </button>
            </div>
          </div>
          <div className={styles['history-box']}>
            <h3 className={styles['overview-title']}>Budget History</h3>
            <p className={styles['overview-subtitle']}>Previous Month's Budget</p>
            <p style={{ fontWeight: '600', fontSize: '24px' }}>${pastIncomeMonth.toFixed(2)}</p>
            <p className={styles['overview-subtitle']}>Details</p>
            <p style={{ fontWeight: '600', fontSize: '24px' }}>
              {pastBudgetDetails.totalSpent > pastBudgetDetails.goal ? `$${(pastBudgetDetails.totalSpent - pastBudgetDetails.goal).toFixed(2)} spent over budget` : `$${(pastBudgetDetails.goal - pastBudgetDetails.totalSpent).toFixed(2)} under budget`}
            </p>
            <p style={{ fontWeight: '600', fontSize: '24px' }}>
              {(pastBudgetDetails.totalSpent / pastIncomeMonth * 100).toFixed(2)}% of income that month
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className={styles['check-history-button']}>
                Check History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
