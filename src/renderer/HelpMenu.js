import styles from './styles/HelpInteractive.module.css'
import HelpDetail from './HelpDetail';
import React from 'react';

function HelpMenu({setHelp}) {
  const [currInput, setCurrInput] = React.useState("");
  return (
    <div className={styles["help-menu-container"]}>
      <input className={styles["help-input"]} placeholder='What do you want to know?' value={currInput} onChange={(e) => {setCurrInput(e.target.value)}}></input>
      <HelpDetail title={"Getting started"} isShown={(("Getting started").toLowerCase()).includes(currInput.toLowerCase())}>
        <p>View an overview of your balance, recent transactions, savings goal, and current monthly budget in the home page. Go to balances, budget details, or transactions to get a more in depth understanding of your spending habits. Use quick budgets to quickly change your budget based on last month’s budget. See specific categories within the budget details page. Change account settings in settings. ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu</p>
      </HelpDetail>
    </div>
  );
}

export default HelpMenu;
