import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from './firebase'

export default async function fetchRecords(table, sortDesc, order) {
  const tableData = []
  const uid = sessionStorage.getItem("uid")

  const q = query(
    collection(db, table),
    where('uid', '==', uid),
    orderBy(sortDesc, order),
  );

  const querySnap = await getDocs(q)

  querySnap.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id

    tableData.push(data)
  })

  return tableData;
}

