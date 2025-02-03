import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export default async function fetchSingleRecord(table, month="2025-02") {
  const uid = sessionStorage.getItem("uid")
  let q;

  if (month === null) {
    q = query(
      collection(db, table),
      where('uid', '==', uid),
    );
  } else {
    q = query(
      collection(db, table),
      where('uid', '==', uid),
      where('month', '==', month),
    );
  }

  const querySnap = await getDocs(q)
  console.log(querySnap.docs)

  const record = querySnap.docs[0].data()
  record.id = querySnap.docs[0].id;

  return record;
}

