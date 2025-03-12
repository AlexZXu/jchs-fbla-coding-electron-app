//Imports
import React from 'react';
import styles from './styles/Transactions.module.css'
import { Link, useNavigate } from 'react-router-dom';
import TransactionList from './TransactionList';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp, updateDoc, setDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { useHistory } from 'react-router'
import fetchSingleRecordId from '../../lib/fetchSingleRecordId';
import { IoClose } from "react-icons/io5";
import { MdCategory } from 'react-icons/md';
import fetchSingleRecord from '../../lib/fetchSingleRecord';
import { IoOpenOutline } from "react-icons/io5";

//Functions for the transactions
function TransactionScreen() {
  //Constants
  const [addOpen, setAddOpen] = React.useState(false);
  const [transactionDetailOpen, setTransactionDetailOpen] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState(0);
  const [trigger, setTrigger] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [transactionConfirmOpen, setTransactionConfirmOpen] = React.useState(false);

  const [confirmRemoveOpen, setConfirmRemoveOpen] = React.useState(false);

  const navigate = useNavigate()

  //React
  React.useEffect(() => {
    //Sets the format of days
    const day = dayjs(new Date()).format("YYYY-MM-DD")
    setDate(day);
  }, []);

  //Initializes the constants
  const [date, setDate] = React.useState("")
  const [name, setName] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [oldAmount, setOldAmount] = React.useState();
  const [additionalNotes, setAdditionalNotes] = React.useState("")

  const [balanceDetails, setBalanceDetails] = React.useState();
  const [budgetData, setBudgetData] = React.useState()

  //Gets teh balance data
  async function getBalance() {
    const balanceData = await fetchSingleRecord("balances");

    console.log(balanceData)
    setBalanceDetails(balanceData)
  }
  //Gets the budget data
  async function getBudget() {
    const budgetData = await fetchSingleRecord("generalBudgets")

    console.log(budgetData)
    setBudgetData(budgetData)
  }

  //Updates the balance of the budgets
  async function updateBalanceandBudget(category, newValue, oldValue, isDelete) {
    //Gets the categories
    const keys = ["Entertainment", "Essentials", "Dining", "Gas", "Other", "Savings"];
    const change = newValue - oldValue;
    console.log(change)
    //add the change into the balance
    let balancePayload = {
      currentBalance: balanceDetails.currentBalance + change
    };
    //Checks if they are deleting gets rid of the expense/income
    if (isDelete) {
      if (change < 0) {
        balancePayload.incomeMonth = balanceDetails.incomeMonth + change;
        balancePayload.incomeYear = balanceDetails.incomeYear + change;
      }
      if (change > 0) {
        balancePayload.expensesMonth = balanceDetails.expensesMonth - change;
        balancePayload.expensesMonth = balanceDetails.expensesMonth - change;
      }
    }
    //checks if they are adding in
    else {
      if (change < 0) {
        balancePayload.expensesMonth = balanceDetails.expensesMonth - change;
        balancePayload.expensesYear = balanceDetails.expensesYear - change;
      }
      if (change > 0) {
        balancePayload.incomeMonth = balanceDetails.incomeMonth + change;
        balancePayload.incomeYear = balanceDetails.incomeYear + change;
      }
    }

    //constants
    const balanceDocRef = doc(db, "balances", balanceDetails.id);
    await setDoc(balanceDocRef, balancePayload, { merge: true });

    //Checks if it is in the category
    //adds to the budget page
    if (keys.includes(category)) {
      let budgetPayload = {
        categories: {},
        totalSpent: budgetData.totalSpent - change
      };
      budgetPayload.categories[category.toLowerCase()] = {
        spent: budgetData.categories[category.toLowerCase()].spent - change
      };
      console.log(budgetPayload)

      const budgetDocRef = doc(db, "generalBudgets", budgetData.id);
      await setDoc(budgetDocRef, budgetPayload, { merge: true });
    }
  }

  //React
  React.useEffect(() => {
    //fetches the data
    const fetchData = async () => {
      if (transactionDetailOpen == true) {
        const transactionData = await fetchSingleRecordId("transactions", transactionId)
        setName(transactionData.name)
        setCategory(transactionData.category)
        setAmount(transactionData.amount)
        setOldAmount(transactionData.amount)
        setDate(transactionData.date)
        setAdditionalNotes(transactionData.additionalNotes)
      }
    }
    //Gets all the values
    fetchData()
    getBalance()
    getBudget()
  }, [transactionDetailOpen])
  //Cancels any changes unwanted
  function cancel() {
    setAddOpen(false)
    setTransactionDetailOpen(false)
    setDate("")
    setName("")
    setCategory("")
    setAmount("")
    setAdditionalNotes("")
  }
  //Submits any changes
  async function submit() {
    //collets constants
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
    //updates the changes after gotten all the data
    await addDoc(collectionRef, payload)
    updateBalanceandBudget(category, parseFloat(amount), 0, false)

    cancel()
    setTrigger(!trigger)
  }

  //Makes sure the delet is necessary
  function completeDelete() {
    const docRef = doc(db, "transactions", transactionId)

    deleteDoc(docRef)
    updateBalanceandBudget(category, 0, parseFloat(amount), false)
    cancel()
    setTrigger(!trigger)
  }
  //Updates all the values
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
    updateBalanceandBudget(category, parseFloat(amount), oldAmount, false)
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
          <TransactionList trigger={trigger} height="370px" setTransactionDetailOpen={setTransactionDetailOpen} setTransactionId={setTransactionId}/>
          <button className={styles["add-button"]} onClick={() => {setAddOpen(true)}}>Add Transactions</button>
        </div>
      </div>
      <datalist id="categories">
        <option value="Entertainment" />
        <option value="Dining" />
        <option value="Essentials" />
        <option value="Gas" />
        <option value="Other" />
        <option value="Savings" />
      </datalist>
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
            <input className={styles["transaction-input"]} onChange={(e) => {setCategory(e.target.value)}} value={category} list="categories"/>
          </div>
          <div className={styles["transaction-field"]}>
            <div>Amount</div>
            <div className={styles["transaction-amount-field"]}>
              <button className={styles["amount-toggle"]} style={{background: toggle ? "#90EE90" : "#ffcccb", color: toggle ? "#4F7942" :"#EE2400" }} onClick={() => {setToggle(prevToggle => !prevToggle)}}>{toggle ? "+" : "-"}</button>
              <input className={styles["transaction-input"]} onChange={(e) => {setAmount(e.target.value)}} value={amount} type="number" />
            </div>
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
          <div className={styles["transaction-field"]}>
            <div>Date</div>
            <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} type="date" onChange={(e) => {setDate(e.target.value)}} value={date} />
          </div>
          <div className={styles["transaction-field"]}>
            <div>Name</div>
            <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setName(e.target.value)}} value={name} />
          </div>
          <div className={styles["transaction-field"]}>
            <div>Category</div>
            <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setCategory(e.target.value)}} value={category} list="categories" />
          </div>
          <div className={styles["transaction-field"]}>
            <div>Amount</div>
            <div className={styles["transaction-amount-field"]}>
              <button className={styles["amount-toggle"]} style={{background: toggle ? "#90EE90" : "#ffcccb", color: toggle ? "#4F7942" :"#EE2400" }} onClick={() => {setToggle(prevToggle => !prevToggle)}}>{toggle ? "+" : "-"}</button>
              <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setAmount(e.target.value)}} value={amount} type="number" />
            </div>
          </div>
          <div className={styles["transaction-field"]}>
            <div>Additional Notes</div>
            <input className={styles["transaction-input"]} style={{borderColor: '#e6e6e6'}} onChange={(e) => {setAdditionalNotes(e.target.value)}} value={additionalNotes} />
          </div>
          <div className={styles["button-container"]}>
            <button onClick={update} className={`${styles["submit-button"]} ${confirmRemoveOpen ? styles["disabled"] : styles["enabled"]}`} disabled={confirmRemoveOpen}>Update</button>
            <button onClick={() => {setConfirmRemoveOpen(true);}} className={`${styles["delete-button"]} ${confirmRemoveOpen ? styles["disabled"] : styles["enabled"]}`} disabled={confirmRemoveOpen}>Delete</button>
          </div>
        </div>
      }

      {
        confirmRemoveOpen &&
        <div className={styles["remove-box"]}>
          <h1 className={styles["warning"]}>Warning!</h1>
          <p className={styles["confirmation-message"]}> Are you sure you want to delete {name} from {date}?</p>
          <div className={styles["button-container"]}>
            <button className={styles["cancel-button"]} onClick={()=>{setConfirmRemoveOpen(false)}}>Cancel</button>
            <button className={styles["delete-button"]} onClick={()=> {completeDelete(); setConfirmRemoveOpen(false);}}>Delete</button>
          </div>
        </div>
      }
    </div>
  );
}

export default TransactionScreen;
