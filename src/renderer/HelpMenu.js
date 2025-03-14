import styles from './styles/HelpInteractive.module.css'

function HelpMenu({setHelp}) {
  return (
    <div className={styles["help-container"]}>
      <input className={styles["help-input"]} placeholder='What do you want to know?'></input>
    </div>
  );
}

export default HelpMenu;
