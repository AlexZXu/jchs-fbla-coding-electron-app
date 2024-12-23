import { MemoryRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../lib/firebase';

function Hello() {
  return (
    <div>
      <Link to="hello">Click here to go to hello</Link>
    </div>
  );
}

function Hello2() {
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");

  async function getData() {
    const docRef = doc(db, "transactions", "1");
    const docSnap = await getDoc(docRef);

    const data = await docSnap.data()

    setFromUser(data?.FromUser)
    setToUser(data?.ToUser)
  }

return (
  <div>
    <button type="button" onClick={getData}>
      Fetch Data
    </button>
    <div>
      <div>
        {fromUser}
      </div>
      <div>
        {toUser}
      </div>
    </div>
  </div>


)
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/hello" element={<Hello2 />} />
      </Routes>
    </Router>
  );
}
