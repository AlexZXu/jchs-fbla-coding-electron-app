import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from './firebase'

export default async function fetchRecordsFilter(table, month="2025-02", category=null) {
  const uid = sessionStorage.getItem("uid")
  const tableData = []
  let q;

  if (month === null) {
    q = query(
      collection(db, table),
      where('uid', '==', uid),
    );
  } else {
    if (category) {
      q = query(
        collection(db, table),
        where('uid', '==', uid),
        where('category', '==', category),
      );
    } else {
      q = query(
        collection(db, table),
        where('uid', '==', uid),
      );
    }
  }

  const querySnap = await getDocs(q)

  querySnap.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id
    console.log("HELLO")
    console.log(data)
    console.log('uid')

    tableData.push(data)
  })

  return tableData;
}
