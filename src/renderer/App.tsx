/* eslint-disable */
import { MemoryRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import Settings from './Settings';
import AccountSettings from './AccountSettings';
import GeneralSettings from './GeneralSettings';
import HelpSettings from './HelpSettings';
import Budget from './Budget';
import BudgetDetails from './BudgetDetails';
import Balance from './Balance';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/budget/details" element={<BudgetDetails />} />
        <Route path="/transactions" element={<TransactionScreen />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/account" element={<AccountSettings />} />
        <Route path="/settings/general" element={<GeneralSettings />} />
        <Route path="/settings/help" element={<HelpSettings />} />
      </Routes>
    </Router>
  );
}
