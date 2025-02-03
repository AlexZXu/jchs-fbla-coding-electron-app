import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import {doc, setDoc} from 'firebase/firestore'
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer, Tooltip, Legend, BarChart, Bar } from 'recharts';
import styles from './styles/Balance.module.css';
import fetchSingleRecord from '../../lib/fetchSingleRecord';
import { db } from '../../lib/firebase';
import fetchRecords from '../../lib/fetchRecords';

function Balance() {
  const [balanceDetails, setBalanceDetails] = React.useState({
    currentBalance: 0,
    incomeMonth: 0,
    incomeYear: 0,
    expensesMonth: 0,
    expensesYear: 0,
  });
  const [balanceEditMode, setBalanceEditMode] = React.useState(false);
  const [balanceHistory, setBalanceHistory] = React.useState([]);
  const [savingsHistory, setSavingsHistory] = React.useState([]);

  const [currBalance, setCurrBalance] = React.useState(0);
  const [incomeMonth, setIncomeMonth] = React.useState(0);
  const [expenseMonth, setExpenseMonth] = React.useState(0);
  const [incomeYear, setIncomeYear] = React.useState(0);
  const [expenseYear, setExpenseYear] = React.useState(0);

  function editBalanceStart() {
    setBalanceEditMode(true);
    setCurrBalance(balanceDetails.currentBalance);
    setIncomeMonth(balanceDetails.incomeMonth);
    setIncomeYear(balanceDetails.incomeYear);
    setExpenseMonth(balanceDetails.expensesMonth);
    setExpenseYear(balanceDetails.expensesYear);
  }

  async function getBalance() {
    const balanceData = await fetchSingleRecord('balances');

    setBalanceDetails(balanceData);
  }

  async function getBalanceHistory() {
    const balanceHistoryData = await fetchRecords('balances', 'month', 'asc');
    console.log(balanceHistoryData);
    setBalanceHistory(balanceHistoryData);
  }

  async function getSavingsHistory() {
    const savingsHistoryData = await fetchRecords('generalBudgets', 'month', 'asc');
    console.log(savingsHistoryData);
    setSavingsHistory(savingsHistoryData);
  }

  async function save() {
    const balance_id = balanceDetails.id;
    const docRef = doc(db, 'balances', balance_id);
    const uid = sessionStorage.getItem('uid');

    const payload = {
      currentBalance: parseFloat(currBalance),
      expensesMonth: parseFloat(expenseMonth),
      incomeMonth: parseFloat(incomeMonth),
      incomeYear: parseFloat(incomeYear),
      expensesYear: parseFloat(expenseYear),
      uid,
    };

    await setDoc(docRef, payload, { merge: true });

    getBalance();
    setBalanceEditMode(false);
  }

  React.useEffect(() => {
    getBalance();
    getBalanceHistory();
    getSavingsHistory()
  }, []);

  return (
    <div className={styles['dashboard-container']}>
      <nav className={styles.navbar}>
        <Link className={styles['nav-button']} to="/home">
          Home
        </Link>
        <Link
          className={`${styles['nav-button']} ${styles.active}`}
          to="/balance"
        >
          Balance Details
        </Link>
        <Link className={styles['nav-button']} to="/budget">
          Budgeting
        </Link>
        <Link className={styles['nav-button']} to="/transactions">
          Transactions
        </Link>
        <Link className={styles['nav-button']} to="/settings">
          Settings
        </Link>
      </nav>
      <div className={styles['balance-details-content']}>
        <div className={styles['balance-box']}>
          <h2 className={styles['section-title']}>Balance Details</h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{ fontSize: '24px', marginRight: '8px' }}
              className={styles['edit-button']}
              onClick={editBalanceStart}
            >
              <MdEdit />
            </button>
          </div>
          <div className={styles['balance-details']}>
            <div>
              <h3 className={styles['overview-subtitle']}>Current Balance</h3>
              {balanceEditMode ? (
                <input
                  className={styles['balance-input']}
                  onChange={(e) => {
                    setCurrBalance(e.target.value);
                  }}
                  value={currBalance}
                 />
              ) : (
                <h1 className={styles['overview-balance']}>
                  $
                  {(
                    Math.round(balanceDetails.currentBalance * 100) / 100
                  ).toFixed(2)}
                </h1>
              )}
            </div>
            <div className={styles['income-expense-details']}>
              <div>
                <p className={styles['overview-subtitle']}>Income this month</p>
                {balanceEditMode ? (
                  <input
                    className={styles['balance-input']}
                    onChange={(e) => {
                      setIncomeMonth(e.target.value);
                    }}
                    value={incomeMonth}
                   />
                ) : (
                  <p className={styles.income}>
                    $
                    {(
                      Math.round(balanceDetails.incomeMonth * 100) / 100
                    ).toFixed(2)}
                  </p>
                )}
              </div>
              <div>
                <p className={styles['overview-subtitle']}>Income this year</p>
                {balanceEditMode ? (
                  <input
                    className={styles['balance-input']}
                    onChange={(e) => {
                      setIncomeYear(e.target.value);
                    }}
                    value={incomeYear}
                   />
                ) : (
                  <p className={styles.income}>
                    $
                    {(
                      Math.round(balanceDetails.incomeYear * 100) / 100
                    ).toFixed(2)}
                  </p>
                )}
              </div>
              <div>
                <p className={styles['overview-subtitle']}>
                  Expenses this month
                </p>
                {balanceEditMode ? (
                  <input
                    className={styles['balance-input']}
                    onChange={(e) => {
                      setExpenseMonth(e.target.value);
                    }}
                    value={expenseMonth}
                   />
                ) : (
                  <p className={styles.expenses}>
                    $
                    {(
                      Math.round(balanceDetails.expensesMonth * 100) / 100
                    ).toFixed(2)}
                  </p>
                )}
              </div>
              <div className={styles['overview-subtitle']}>
                <p>Expenses this year</p>
                {balanceEditMode ? (
                  <input
                    className={styles['balance-input']}
                    onChange={(e) => {
                      setExpenseYear(e.target.value);
                    }}
                    value={expenseYear}
                   />
                ) : (
                  <p className={styles.expenses}>
                    $
                    {(
                      Math.round(balanceDetails.expensesYear * 100) / 100
                    ).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
          {balanceEditMode && (
            <button className={styles['save-button']} onClick={save}>
              Save
            </button>
          )}
        </div>

        <div className={styles['summary-boxes']}>
          <div
            className={styles['summary-box']}
            style={{ borderRight: '1px solid rgb(100 116 139)' }}
          >
            <div className={styles['summary-title']}>
              Income & Expenses History
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                marginLeft: '-20px',
                marginTop: '5px',
              }}
            >
              {balanceHistory.length > 0 && (
                <ResponsiveContainer width="90%" height="100%">
                  <LineChart width={400} height={400} data={balanceHistory}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line
                      type="monotone"
                      name="Income"
                      dataKey="incomeMonth"
                      stroke="#008000"
                    />
                    <Line
                      type="monotone"
                      name="Expenses"
                      dataKey="expensesMonth"
                      stroke="#DC143C"
                    />
                    <Tooltip />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className={styles['summary-box']}>
            <div className={styles['summary-title']}>Saving Goal</div>
            <div
              style={{
                width: '100%',
                height: '100%',
                marginLeft: '-20px',
                marginTop: '5px',
              }}
            >
              {balanceHistory.length > 0 && (
                <ResponsiveContainer width="90%" height="100%">
                  <BarChart width={400} height={400} data={savingsHistory}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar dataKey="goal" fill="#008000" name="Savings Goal"/>
                    <Bar dataKey="categories.savings.spent" fill="#DC143C" name="Actual Savings"/>
                    <Tooltip />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
