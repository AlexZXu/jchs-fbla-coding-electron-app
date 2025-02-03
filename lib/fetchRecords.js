import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from './firebase'

export default async function fetchRecords(table, sortDesc) {
  const tableData = []
  const uid = sessionStorage.getItem("uid")

  const q = await query(collection(db, table), where("uid", "==", uid), orderBy(sortDesc, "desc"))

  const querySnap = await getDocs(q)

  querySnap.forEach((doc) => {
    console.log(doc)
    const data = doc.data()
    data.id = doc.id

    tableData.push(data)
  })

  return tableData;
}

