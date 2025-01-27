/* eslint-disable */

import React from 'react'
import styles from './styles/Transactions.module.css'
import { collection, getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import dayjs from 'dayjs'

function TransactionList({addOpen}) {
  const [transactionArray, setTransactionArray] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const transactionData = []

      const q = await query(collection(db, "transactions"), where("uid", "==", "tFzlKj78hucNhqvoYKImxS1qXBq1"), orderBy("date", "desc"))

      const querySnap = await getDocs(q)

      querySnap.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id

        transactionData.push(data)
      })

      setTransactionArray(transactionData)
      console.log(transactionData)
    }

    fetchData()
  }, [addOpen])

  return (
    <div className={styles["transactions-container"]}>
      <div className={styles["transaction-header"]}>
        <div style={{marginLeft: '5px'}}>
          Date
        </div>
        <div style={{marginLeft: '5px'}}>
          Name
        </div>
        <div style={{textAlign: 'right', marginRight: '5px'}}>
          Amount
        </div>
      </div>
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
                {item.amount}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default TransactionList
