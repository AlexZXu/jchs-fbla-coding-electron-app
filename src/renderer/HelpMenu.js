//imports section
import styles from './styles/HelpInteractive.module.css'
import HelpDetail from './HelpDetail';
import React from 'react';

//function for the help menu
function HelpMenu({setHelp}) {
  const [currInput, setCurrInput] = React.useState("");
  return (
    <div className={styles["help-menu-container"]}>
      <input className={styles["help-input"]} placeholder='What do you want to know?' value={currInput} onChange={(e) => {setCurrInput(e.target.value)}}></input>
      <HelpDetail title={"Getting started"} isShown={(("Getting started").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>View an overview of your balance, recent transactions, savings goal, and current monthly budget in the home page. Go to balances, budget details, or transactions to get a more in depth understanding of your spending habits. Use quick budgets to quickly change your budget based on last month’s budget. See specific categories within the budget details page. Change account settings in settings.</p>
      </HelpDetail>
      <HelpDetail title={"Navigation"} isShown={(("Navigation").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>Click on any of the buttons in the top bar to quickly navigate between categories.</p>
      </HelpDetail>
      <HelpDetail title={"Home Screen"} isShown={(("Navigation").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>In the home screen, you can quickly view your balance, recent transactions, savings goal, and your current monthly budget. You can quickly edit these values as well.</p>
      </HelpDetail>
      <HelpDetail title={"Balances"} isShown={(("Balances").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>View your current balance, monthly and yearly income and expenses, and diagrams of your spending habits. Hover over the diagrams for more information.</p>
      </HelpDetail>
      <HelpDetail title={"Budgets"} isShown={(("Budgets").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>In the budget page, you can view your budget, your savings goal, and your top two spending categories at the top of the page. You can quickly set your budget to a preset percentage based on last month’s budget, and you can view your past budgets. Finally, go into budget details to see a more detailed view of your budgeting.</p>
      </HelpDetail>
      <HelpDetail title={"Detailed Budgets"} isShown={(("Budgets").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>Set budgets for specific categories in the budget details page. Changing budget categories will automatically update the total budget, so change to your heart’s content!</p>
      </HelpDetail>
      <HelpDetail title={"Transactions"} isShown={(("Transactions").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>View a list of your past transactions in the transactions page. Click into a specific transaction to modify its details, delete the transaction, or view any additional notes on the transaction.</p>
      </HelpDetail>
      <HelpDetail title={"Settings"} isShown={(("Settings").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>Change your account information, language, currency, or sign out. This page also shows information about the application version.</p>
      </HelpDetail>
    </div>
  );
}

export default HelpMenu;
