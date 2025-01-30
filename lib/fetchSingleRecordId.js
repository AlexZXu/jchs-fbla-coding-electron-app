import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

export default async function fetchSingleRecordId(table, id) {
  const docRef = doc(db, table, id);

  const docSnap = await getDoc(docRef)

  const record = docSnap.data()
  console.log(record)
  record.id = docSnap.id;

  return record;
}

