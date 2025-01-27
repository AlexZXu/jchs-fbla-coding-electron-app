/* eslint-disable */

import React from 'react';
import styles from './styles/Transactions.module.css'
import { Link, useNavigate } from 'react-router-dom';
import TransactionList from './TransactionList';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';
import { useHistory } from 'react-router'

function TransactionScreen() {
  const [addOpen, setAddOpen] = React.useState(false)

  const [date, setDate] = React.useState("")
  const [name, setName] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [additionalNotes, setAdditionalNotes] = React.useState("")

  const navigate = useNavigate()

  React.useEffect(() => {
    const day = dayjs(new Date()).format("YYYY-MM-DD")
    setDate(day);
  }, []);

  function cancel() {
    setAddOpen(false)
    setDate("")
    setName("")
    setAmount("")
    setAdditionalNotes("")
  }

  async function submit() {
    const collectionRef = collection(db, "transactions");
    const payload = {
      name: name,
      amount: parseInt(amount),
      date: date,
      timestamp: Timestamp.now(),
      additionalNotes: additionalNotes,
      uid: "tFzlKj78hucNhqvoYKImxS1qXBq1",
    }

    await addDoc(collectionRef, payload)

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
          <h2 className={styles["transactions-title"]}>All Transactions</h2>
          <TransactionList addOpen={addOpen} />
          <button className={styles["add-button"]} onClick={() => {setAddOpen(true)}}>Add Transactions</button>
        </div>
      </div>

      {
        addOpen &&
        <div className={styles["add-transaction-container"]}>
          <h2 className={styles["transactions-title"]} style={{textAlign: 'center'}}>New Transaction</h2>
          <div>Date</div>
          <input className={styles["transaction-input"]} type="date" onChange={(e) => {setDate(e.target.value)}} value={date}/>
          <div>Name</div>
          <input className={styles["transaction-input"]} onChange={(e) => {setName(e.target.value)}} value={name}/>
          <div>Amount</div>
          <input className={styles["transaction-input"]} onChange={(e) => {setAmount(e.target.value)}} value={amount} />
          <div>Additional Notes</div>
          <input className={styles["transaction-input"]} onChange={(e) => {setAdditionalNotes(e.target.value)}} value={additionalNotes} />
          <div className={styles["button-container"]}>
            <button onClick={cancel} className={styles["cancel-button"]}>Cancel</button>
            <button onClick={submit} className={styles["submit-button"]}>Submit</button>
          </div>
        </div>
      }
    </div>
  );
}

export default TransactionScreen;
