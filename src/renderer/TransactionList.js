/* eslint-disable */

import fetchRecords from '../../lib/fetchRecords';
import React from 'react'
import styles from './styles/Transactions.module.css'
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import dayjs from 'dayjs'
import { IoOpenOutline } from "react-icons/io5";

function TransactionList({trigger, height, setTransactionDetailOpen, setTransactionId}) {
  const [transactionArray, setTransactionArray] = React.useState([]);

  const fetchData = async () => {
    const transactionData = await fetchRecords("transactions");
    console.log(transactionData)

    setTransactionArray(transactionData)
  }

  React.useEffect(() => {
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
          Amount
        </div>
      </div>
      <OverlayScrollbarsComponent style={{height: height}}>
        <div style={{display: "flex", flexDirection: "column", gap: '6px'}}>
          {
              transactionArray.map(item => {
                return (
                  <div className={styles["transaction"]} key={item.id}>
                    <div>
                      {dayjs(item.date).format('M/D/YYYY')}
                    </div>
                    <div>
                      {item.name}
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
