//imports section
import styles from './styles/HelpInteractive.module.css'
import { IoClose } from "react-icons/io5";
import HelpMenu from './HelpMenu';
//function for the interactive
function HelpInteractive({setHelp}) {
  return (
    <div className={styles["help-container"]}>
      <div className={styles["help-close"]} onClick={() => {setHelp(false)}}><IoClose /></div>
      <div className="content-container">
        <div className={styles["help-title"]}>
          Welcome to the Help Center!
        </div>
        <HelpMenu />
      </div>
    </div>
  );
}
export default HelpInteractive;
