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

    React.useEffect(() => {
      const fetchData = async () => {
        const balanceData = await fetchSingleRecord("balances");
        console.log(balanceData)

        setBalanceDetails(balanceData)
      }

      fetchData()
    }, [])

  function cancel() {
    setDate("")
    setName("")
    setAmount("")
    setAdditionalNotes("")
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
  }

  function cancel() {
    setDate("")
    setName("")
    setAmount("")
    setAdditionalNotes("")
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
          <h2 className={styles["overview-title"]}>Overview</h2>
          <p className={styles["overview-subtitle"]}>Current Balance</p>
          <h3 className={styles["overview-balance"]}>${balanceDetails.currentBalance}</h3>
          <p className={styles["overview-subtitle"]}>Income this month</p>
          <p className={styles["income"]}>${balanceDetails.incomeMonth}</p>
          <p className={styles["overview-subtitle"]}>Expenses this month</p>
          <p className={styles["expenses"]}>${balanceDetails.expensesMonth}</p>
        </div>
        <div className={styles["recent-transactions-box"]}>
          <h2 className={styles["overview-title"]}>Recent Transactions</h2>
          <div className={styles["list-container"]}>
            <TransactionList height="160px" setTransactionDetailOpen={setTransactionDetailOpen} setTransactionId={setTransactionId}/>
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
