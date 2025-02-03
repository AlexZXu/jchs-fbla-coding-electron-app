/* eslint-disable */

import React from 'react';
import styles from './styles/Transactions.module.css'
import { Link, useNavigate } from 'react-router-dom';
import TransactionList from './TransactionList';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp, updateDoc, setDoc, doc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { useHistory } from 'react-router'
import fetchSingleRecordId from '../../lib/fetchSingleRecordId';
import { IoClose } from "react-icons/io5";
import { MdCategory } from 'react-icons/md';
import fetchSingleRecord from '../../lib/fetchSingleRecord';
import {useLocation} from 'react-router-dom';


function BudgetTransactions() {
  const location = useLocation()
  const category = location.state.category
  console.log(category)

  const [addOpen, setAddOpen] = React.useState(false);
  const [transactionDetailOpen, setTransactionDetailOpen] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState(0);
  const [trigger, setTrigger] = React.useState(false);

  const navigate = useNavigate()

  React.useEffect(() => {
    const day = dayjs(new Date()).format("YYYY-MM-DD")
    setDate(day);
  }, []);

  const [date, setDate] = React.useState("")
  const [name, setName] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [additionalNotes, setAdditionalNotes] = React.useState("")

  const [balanceDetails, setBalanceDetails] = React.useState();
  const [budgetData, setBudgetData] = React.useState()

  async function getBalance() {
    const balanceData = await fetchSingleRecord("balances");

    console.log(balanceData)
    setBalanceDetails(balanceData)
  }

  async function getBudget() {
    const budgetData = await fetchSingleRecord("generalBudgets")

    console.log(budgetData)
    setBudgetData(budgetData)
  }


  async function updateBalanceandBudget(category, newValue, oldValue) {
    const keys = ["Entertainment", "Essentials", "Dining", "Gas", "Other", "Savings"]

    const change = newValue - oldValue

    let payload = {
      currentBalance: balanceDetails.currentBalance + change
    }

    if (change < 0) {
      payload.expensesMonth = balanceDetails.expensesMonth - change
      payload.expensesYear = balanceDetails.expensesYear - change
    }
    if (change > 0) {
      payload.incomeMonth = balanceDetails.incomeMonth + change
      payload.incomeYear = balanceDetails.incomeYear + change
    }

    const docRef = doc(db, "balances", balanceDetails.id);
    const uid = sessionStorage.getItem("uid")
    await setDoc(docRef, payload, {merge: true})

    if (keys.includes(category)) {

    }
  }

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
    getBalance()
    getBudget()
  }, [transactionDetailOpen])

  function cancel() {
    setAddOpen(false)
    setTransactionDetailOpen(false)
    setDate("")
    setName("")
    setAmount("")
    setAdditionalNotes("")
  }

  async function submit() {
    const collectionRef = collection(db, "transactions");
    const uid = sessionStorage.getItem("uid")

    const payload = {
      name: name,
      amount: parseFloat(amount),
      date: date,
      category: category,
      timestamp: Timestamp.now(),
      additionalNotes: additionalNotes,
      uid: uid,
    }

    await addDoc(collectionRef, payload)
    updateBalanceandBudget("", parseFloat(amount), 0)

    cancel()
    setTrigger(!trigger)
  }

  async function update() {
    const docRef = doc(db, "transactions", transactionId);
    const uid = sessionStorage.getItem("uid")

    const payload = {
      name: name,
      amount: parseFloat(amount),
      date: date,
      category: category,
      timestamp: Timestamp.now(),
      additionalNotes: additionalNotes,
      uid: uid,
    }

    await setDoc(docRef, payload)
    setTrigger(!trigger)
    cancel()
  }

  return (
    <div className={styles["dashboard-container"]}>
      <nav className={styles["navbar"]}>
        <Link className={styles["nav-button"]} to="/home">Home</Link>
        <Link className={styles["nav-button"]} to="/balance">Balance Details</Link>
        <Link className={styles["nav-button"]} to="/budget">Budgeting</Link>
        <Link className={`${styles["nav-button"]} ${styles["active"]}`} to="/transactions">Transactions</Link>
        <Link className={styles["nav-button"]} to="/settings">Settings</Link>
      </nav>
      <div className={styles["transactions-content"]}>
        <div className={styles["transactions-box"]}>
          <h2 className={styles["section-title"]}>All Transactions</h2>
          <TransactionList trigger={trigger} height="370px" setTransactionDetailOpen={setTransactionDetailOpen} setTransactionId={setTransactionId} category={category}/>
          <button className={styles["add-button"]} onClick={() => {setAddOpen(true)}}>Add Transactions</button>
        </div>
      </div>

      {
        addOpen &&
        <div className={styles["add-transaction-container"]}>
          <h2 className={styles["transactions-title"]} style={{textAlign: 'center'}}>New Transaction</h2>
          <div className={styles["transaction-field"]}>
            <div>Date</div>
            <input className={styles["transaction-input"]} type="date" onChange={(e) => {setDate(e.target.value)}} value={date}/>
          </div>
          <div className={styles["transaction-field"]}>
            <div>Name</div>
            <input className={styles["transaction-input"]} onChange={(e) => {setName(e.target.value)}} value={name}/>
          </div>
          <div className={styles["transaction-field"]}>
            <div>Category</div>
            <input className={styles["transaction-input"]} value={category} readonly list="categories"/>
            <datalist id="categories">
              <option value="Entertainment" />
              <option value="Dining" />
              <option value="Essentials" />
              <option value="Gas" />
              <option value="Other" />
              <option value="Savings" />
            </datalist>
          </div>
          <div className={styles["transaction-field"]}>
            <div>Amount</div>
            <input className={styles["transaction-input"]} onChange={(e) => {setAmount(e.target.value)}} value={amount} type="number" />
          </div>
          <div className={styles["transaction-field"]}>
            <div>Additional Notes</div>
            <input className={styles["transaction-input"]} onChange={(e) => {setAdditionalNotes(e.target.value)}} value={additionalNotes} />
          </div>
          <div className={styles["button-container"]}>
            <button onClick={cancel} className={styles["cancel-button"]}>Cancel</button>
            <button onClick={submit} className={styles["submit-button"]}>Submit</button>
          </div>
        </div>
      }

      {
        transactionDetailOpen &&
        <div className={styles["transaction-detail-container"]}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button onClick={() => {cancel(); setTransactionDetailOpen(false);}}><IoClose /></button>
          </div>
          <div className='text-lg text-center font-semibold m-[-10px] text-slate-900'>
            Transaction Details
          </div>
          <div>Date</div>
          <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} type="date" onChange={(e) => {setDate(e.target.value)}} value={date} />
          <div>Name</div>
          <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setName(e.target.value)}} value={name} />
          <div>Category</div>
          <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} value={category} />
          <div>Amount</div>
          <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setAmount(e.target.value)}} value={amount} type="number" />
          <div>Additional Notes</div>
          <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setAdditionalNotes(e.target.value)}} value={additionalNotes} />
          <div className={styles["button-container"]}>
            <button onClick={update} className={styles["submit-button"]}>Update</button>
          </div>
        </div>
      }
    </div>
  );
}

export default BudgetTransactions;
