/* eslint-disable */
import styles from './styles/Home.module.css'
import styles2 from './styles/Transactions.module.css'
import { Link } from 'react-router-dom';
import React from 'react';
import TransactionList from './TransactionList';
import 'overlayscrollbars/overlayscrollbars.css';
import fetchSingleRecord from '../../lib/fetchSingleRecord';
import fetchSingleRecordId from '../../lib/fetchSingleRecordId';
import { IoClose } from "react-icons/io5";
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp, updateDoc, setDoc, doc } from 'firebase/firestore';
import { MdEdit } from "react-icons/md";

import {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin
} from 'overlayscrollbars';

function App() {
  const [balanceDetails, setBalanceDetails] = React.useState({});
  const [transactionDetailOpen, setTransactionDetailOpen] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState(0);
  const [trigger, setTrigger] = React.useState(false);

  const [currBalance, setCurrBalance] = React.useState(0)
  const [incomeMonth, setIncomeMonth] = React.useState(0)
  const [expenseMonth, setExpenseMonth] = React.useState(0)

  const [balanceEditMode, setBalanceEditMode] = React.useState(false)

  const [date, setDate] = React.useState("")
  const [name, setName] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [additionalNotes, setAdditionalNotes] = React.useState("")

  React.useEffect(() => {
    const fetchData = async () => {
      if (transactionDetailOpen == true) {
        const transactionData = await fetchSingleRecordId("transactions", transactionId)
        setName(transactionData.name)
        setAmount(transactionData.amount)
        setDate(transactionData.date)
        setAdditionalNotes(transactionData.additionalNotes)
      }
    }

    fetchData()
  }, [transactionDetailOpen])

  async function getBalance() {
    const balanceData = await fetchSingleRecord("balances");
    console.log(balanceData)

    setBalanceDetails(balanceData)
  }

  React.useEffect(() => {
    getBalance()
  }, [])

  function cancel() {
    setTransactionDetailOpen(false)
    setDate("")
    setName("")
    setAmount("")
    setAdditionalNotes("")
  }

  async function save() {
    const balance_id = balanceDetails.id
    const docRef = doc(db, "balances", balance_id);
    const uid = sessionStorage.getItem("uid")

    const payload = {
      currentBalance: parseFloat(currBalance),
      expensesMonth: parseFloat(expenseMonth),
      incomeMonth: parseFloat(incomeMonth),
      uid: uid
    }

    await setDoc(docRef, payload, { merge: true })

    getBalance()
    setBalanceEditMode(false);
  }

  async function update() {
    const docRef = doc(db, "transactions", transactionId);
    const uid = sessionStorage.getItem("uid")

    const payload = {
      name: name,
      amount: parseInt(amount),
      date: date,
      timestamp: Timestamp.now(),
      additionalNotes: additionalNotes,
      uid: uid,
    }

    await setDoc(docRef, payload)

    setTrigger(!trigger)

    cancel()
  }

  function editBalanceStart() {
    setBalanceEditMode(true)
    setCurrBalance(balanceDetails.currentBalance)
    setIncomeMonth(balanceDetails.incomeMonth)
    setExpenseMonth(balanceDetails.expensesMonth)
  }


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
          <div style={{display: 'flex', height: '40px', alignItems: 'center', justifyContent: 'space-between'}}>
            <div className={styles["overview-title"]}>Overview</div>
            <button style={{fontSize: "24px"}} onClick={() => {editBalanceStart()}}><MdEdit/></button>
          </div>
          <p className={styles["overview-subtitle"]}>Current Balance</p>
          {
            balanceEditMode ?
            <input className={styles["balance-input"]} onChange={(e) => {setCurrBalance(e.target.value)}} value={currBalance}></input>
            :
            <h3 className={styles["overview-balance"]}>${(Math.round(balanceDetails.currentBalance * 100) / 100).toFixed(2)}</h3>
          }
          <p className={styles["overview-subtitle"]}>Income this month</p>
          {
            balanceEditMode ?
            <input className={styles["balance-input"]} onChange={(e) => {setIncomeMonth(e.target.value)}} value={incomeMonth}></input>
            :
            <p className={styles["income"]}>${(Math.round(balanceDetails.incomeMonth * 100) / 100).toFixed(2)}</p>
          }
          <p className={styles["overview-subtitle"]}>Expenses this month</p>
          {
            balanceEditMode ?
            <input className={styles["balance-input"]} onChange={(e) => {setExpenseMonth(e.target.value)}} value={expenseMonth}></input>
            :
            <p className={styles["expenses"]}>${(Math.round(balanceDetails.expensesMonth * 100) / 100).toFixed(2)}</p>
          }
          {
            balanceEditMode &&
            <button className={styles["save-button"]} onClick={save}>Save</button>
          }

        </div>
        <div className={styles["recent-transactions-box"]}>
          <h2 className={styles["overview-title"]}>Recent Transactions</h2>
          <div className={styles["list-container"]}>
            <TransactionList height={balanceEditMode ? "220px" : "160px"} setTransactionDetailOpen={setTransactionDetailOpen} trigger={trigger} setTransactionId={setTransactionId}/>
          </div>
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
      {
        transactionDetailOpen &&
        <div className={styles2["transaction-detail-container"]}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button onClick={() => {cancel(); setTransactionDetailOpen(false);}}><IoClose /></button>
          </div>
          <div className='text-lg text-center font-semibold m-[-10px] text-slate-900'>
            Transaction Details
          </div>
          <div>Date</div>
          <input className={styles2["transaction-input"]} style={{borderColor: '#e6e6e6'}} type="date" onChange={(e) => {setDate(e.target.value)}} value={date} />
          <div>Name</div>
          <input className={styles2["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setName(e.target.value)}} value={name} />
          <div>Amount</div>
          <input className={styles2["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setAmount(e.target.value)}} value={amount} type="number" />
          <div>Additional Notes</div>
          <input className={styles2["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setAdditionalNotes(e.target.value)}} value={additionalNotes} />
          <div className={styles2["button-container"]}>
            <button onClick={update} className={styles2["submit-button"]}>Update</button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
