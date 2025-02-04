//Imports
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
import getProgressBarColor from '../../lib/color';


//Function for the home page
function App() {
  //Sets the constants
  const [balanceDetails, setBalanceDetails] = React.useState({currentBalance: 0, incomeMonth: 0, incomeYear: 0, expensesMonth: 0, expensesYear: 0});
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

  const [budgetGoal, setBudgetGoal] = React.useState(0)
  const [budgetSpent, setBudgetSpent] = React.useState(0)
  const [budgetRemaining, setBudgetRemaining] = React.useState(0)

  const [savingsGoal, setSavingsGoal] = React.useState(0)
  const [savings, setSavings] = React.useState(0)
  const [savingsId, setSavingsId] = React.useState(0)

  const [newSavingsGoal, setNewSavingsGoal] = React.useState(0)

  const [editingGoal, setEditingGoal] = React.useState(false)

  //Reacts
  React.useEffect(() => {
    //fetches the data
    const fetchData = async () => {
      //Check if it is open to set in the data
      if (transactionDetailOpen === true) {
        const transactionData = await fetchSingleRecordId("transactions", transactionId)
        setName(transactionData.name)
        setAmount(transactionData.amount)
        setDate(transactionData.date)
        setAdditionalNotes(transactionData.additionalNotes)
      }
    }
    //fecthes the data
    fetchData()
  }, [transactionDetailOpen])

  //Gets the balance
  async function getBalance() {
    const balanceData = await fetchSingleRecord("balances");
    //Sets the balance in
    setBalanceDetails(balanceData)
  }

  //Gets the budget values
  async function getBudget() {
    const budgetData = await fetchSingleRecord("generalBudgets")

    //SEts the values in
    console.log(budgetData)
    setBudgetGoal(budgetData.goal)
    setBudgetSpent(budgetData.totalSpent)
    setBudgetRemaining(budgetData.goal - budgetData.totalSpent)
  }

  //Gets the saving goal
  async function getSavings() {
    const savingsData = await fetchSingleRecord("savings", null)
    //Ssts the values
    setSavingsGoal(savingsData.goal)
    setSavingsId(savingsData.id)
    setNewSavingsGoal(savingsData.goal)
    setSavings(savingsData.totalSaved)
  }


  React.useEffect(() => {
    //Gets the values
    getBalance()
    getBudget()
    getSavings()
  }, [])
  //Cancels the editing
  function cancel() {
    setTransactionDetailOpen(false)
    setDate("")
    setName("")
    setAmount("")
    setAdditionalNotes("")
  }
  //Saves the changes made
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
    //Sets it and prevents edits
    getBalance()
    setBalanceEditMode(false);
  }

  //Updates the values
  async function update() {
    const docRef = doc(db, "transactions", transactionId);
    const uid = sessionStorage.getItem("uid")
    //goes through the entire values
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


  async function updateSaving() {
    const docRef = doc(db, "savings", savingsId)

    const payload = {
      goal: Number(newSavingsGoal)
    }

    await setDoc(docRef, payload, {merge: true})

    getSavings()
    setEditingGoal(false)
  }

  //Allows the balance to be edited
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
          <div className={styles["overview-subtitle"]}>Current Balance</div>
          {
            balanceEditMode ?
            <input className={styles["balance-input"]} onChange={(e) => {setCurrBalance(e.target.value)}} type="number"  value={currBalance}></input>
            :
            <h3 className={styles["overview-balance"]}>${(Math.round(balanceDetails.currentBalance * 100) / 100).toFixed(2)}</h3>
          }
          <div className={styles["overview-subtitle"]}>Income this month</div>
          {
            balanceEditMode ?
            <input className={styles["balance-input"]} onChange={(e) => {setIncomeMonth(e.target.value)}} type="number" value={incomeMonth}></input>
            :
            <div className={styles["income"]}>${(Math.round(balanceDetails.incomeMonth * 100) / 100).toFixed(2)}</div>
          }
          <div className={styles["overview-subtitle"]}>Expenses this month</div>
          {
            balanceEditMode ?
            <input className={styles["balance-input"]} onChange={(e) => {setExpenseMonth(e.target.value)}} type="number"  value={expenseMonth}></input>
            :
            <div className={styles["expenses"]}>${(Math.round(balanceDetails.expensesMonth * 100) / 100).toFixed(2)}</div>
          }
          {
            balanceEditMode &&
            <div className={styles["button-group"]}>
              <button className={styles["cancel-button"]} onClick={() => setBalanceEditMode(false)} style={{width: '100%'}}>Cancel</button>
              <button className={styles["save-button"]} onClick={save} style={{width: '100%'}}>Save</button>
            </div>
          }

        </div>
        <div className={styles["recent-transactions-box"]}>
          <h2 className={styles["overview-title"]}>Recent Transactions</h2>
          <div className={styles["list-container"]}>
            <TransactionList height={balanceEditMode ? "210px" : "160px"} setTransactionDetailOpen={setTransactionDetailOpen} trigger={trigger} setTransactionId={setTransactionId}/>
          </div>
          <Link to="/transactions" className={styles["add-button"]} style={{width: "100%"}}>View Transactions</Link>
        </div>
        <div className={styles["budget-box"]}>
          <h2 className={styles["overview-title"]}>Budget This Month</h2>
          <p className={styles["overview-subtitle"]} style={{marginTop: '1px'}}>Total Budget Spent</p>
          <p style={{fontSize: '20px', fontWeight: '600', marginTop: '-8px'}}>${budgetSpent.toFixed(2)} / ${budgetGoal.toFixed(2)}</p>
          <div className={styles["progress-bar"]}>
              <div className={styles["progress"]} style={{ width: `${budgetSpent / budgetGoal * 100}%` , background: getProgressBarColor(budgetSpent / budgetGoal * 100) }}></div>
            </div>
          <p className={styles["overview-subtitle"]}>Budget Remaining</p>
          <p style={{fontSize: '20px', fontWeight: '600', marginTop: '-8px'}}>${budgetRemaining.toFixed(2)}</p>
        </div>
        <div className={styles["saving-goal-box"]}>
          <h2 className={styles["overview-title"]}>Saving Goal</h2>
          <p className={styles["overview-subtitle"]}>Amount Saved</p>
          <div style={{fontSize: '20px', fontWeight: '600', marginTop: '5px', marginBottom: '5px'}}>
            <span>${savings.toFixed(2)} / </span>
            {
              editingGoal ?
              <input className={styles["savings-input"]} value={newSavingsGoal} onChange={(e) => {setNewSavingsGoal(e.target.value)}}></input> :
              <span>${savingsGoal.toFixed(2)}</span>
            }
          </div>
          <div className={styles["progress-bar"]}>
            <div className={styles["progress"]} style={{ width: `${savings / savingsGoal * 100}%` }}></div>
          </div>
          {
            editingGoal ?
            <div className={styles["button-group"]}>
              <button className={styles["cancel-button"]} onClick={() => {setEditingGoal(false)}} style={{paddingLeft: '15px', paddingRight: '15px'}}>Cancel</button>
              <button className={styles["edit-button"]} onClick={() => {updateSaving();}} style={{paddingLeft: '15px', paddingRight: '15px'}}>Update</button>
            </div>
            :
            <button className={styles["edit-button"]} onClick={() => {setEditingGoal(true)}}>Edit Goal</button>
          }
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
