//Imports
import fetchRecords from '../../lib/fetchRecords';
import React from 'react'
import styles from './styles/Transactions.module.css'
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import dayjs from 'dayjs'
import { IoOpenOutline } from "react-icons/io5";
import fetchRecordsFilter from '../../lib/fetchRecordsFilter';

//Function of all the transactions
function TransactionList({trigger, height, setTransactionDetailOpen, setTransactionId, category, filterName, filterCategory}) {
  //Sets the constants
  const [transactionArray, setTransactionArray] = React.useState([]);
  const [filteredTransactionArray, setFilteredTransactionArray] = React.useState([])

  //Fetches the data from the database
  const fetchData = async () => {
    let transactionData;
    //Check if ti is a category
    if (!category) {
      transactionData = await fetchRecords("transactions", "date", "desc");
    }
    else {
      console.log("CATEGORY: " + category)
      transactionData = await fetchRecordsFilter("transactions", "2025-02", category)
    }
    //Logs it on console and sets the array of transactions
    console.log(transactionData)

    setTransactionArray(transactionData)
    setFilteredTransactionArray(transactionData)
  }

  React.useEffect(() => {
    let filterArray = transactionArray
    if (filterName != undefined && filterName != "") {
      filterArray = filterArray.filter((e) => e.name.toLowerCase().includes(filterName))
    }
    if (filterCategory != undefined && filterCategory != "") {
      filterArray = filterArray.filter((e) => e.category.toLowerCase() == filterCategory)
    }

    setFilteredTransactionArray(filterArray)
  }, [filterName, filterCategory])

  //React
  React.useEffect(() => {
    //Fetches the data
    fetchData()
  }, [trigger])

  return (
    <div className={styles["transactions-container"]}>
      <div className={styles["transaction-header"]}>
        <div style={{marginLeft: '5px'}}>
          Date
        </div>
        <div style={{marginLeft: '5px'}}>
          Name
        </div>
        <div style={{marginRight: '5px'}}>
          Category
        </div>
        <div style={{marginRight: '5px'}}>
          Amount
        </div>
      </div>
      <OverlayScrollbarsComponent style={{height: height}}>
        <div style={{display: "flex", flexDirection: "column", gap: '6px'}}>
          {
              filteredTransactionArray.map(item => {
                return (
                  <div className={styles["transaction"]} key={item.id}>
                    <div>
                      {dayjs(item.date).format('M/D/YYYY')}
                    </div>
                    <div>
                      {item.name}
                    </div>
                    <div>
                      {item.category}
                    </div>
                    <div className={styles["transaction-amount"]}>
                      {item.amount < 0 ? "" : "+"}{(Math.round(item.amount * 100) / 100).toFixed(2)}
                    </div>
                    <div>
                      <button onClick={() => {setTransactionDetailOpen(true); setTransactionId(item.id);}}><IoOpenOutline /></button>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </OverlayScrollbarsComponent>
    </div>
  )
}

export default TransactionList
