import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from './firebase'

export default async function fetchRecords(table) {
  const tableData = []
  const uid = sessionStorage.getItem("uid")

  const q = await query(collection(db, table), where("uid", "==", uid), orderBy("date", "desc"))

  const querySnap = await getDocs(q)

  querySnap.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id

    tableData.push(data)
  })

  return tableData;
}

