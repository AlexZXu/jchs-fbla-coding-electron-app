import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export default async function fetchSingleRecord(table) {
  const uid = sessionStorage.getItem("uid")

  const q = await query(collection(db, table), where("uid", "==", uid))

  const querySnap = await getDocs(q)

  const record = querySnap.docs[0].data()
  record.id = querySnap.docs[0].id;

  return record;
}

