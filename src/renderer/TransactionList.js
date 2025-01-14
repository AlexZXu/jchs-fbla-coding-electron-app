/* eslint-disable */

import React from 'react'
import styles from './styles/Transactions.module.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'

function TransactionList() {
  const [transactionArray, setTransactionArray] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const transactionData = []

      const q = await query(collection(db, "transactions"), where("uid", "==", "tFzlKj78hucNhqvoYKImxS1qXBq1"))

      const querySnap = await getDocs(q)

      querySnap.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id

        transactionData.push(data)
      })

      setTransactionArray(transactionData)
    }

    fetchData()
  }, [])

  return (
    <div className={styles["transaction-container"]}>
      {
        transactionArray.map(item => {
          return (
            <div key={item.id}>
              f
            </div>
          )
        })
      }
    </div>
  )
}

export default TransactionList
