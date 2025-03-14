//imports section
import styles from './styles/HelpInteractive.module.css'
import { IoClose } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import HelpMenu from './HelpMenu';

//function for the interactive
function HelpInteractive({setHelp}) {
  return (
    <div className={styles["help-container"]}>
      <div className={styles["help-close"]} onClick={() => {setHelp(false)}}><IoClose /></div>
      <div className={styles["content-container"]}>
        <div className={styles["help-title"]}>
          <FiHelpCircle /> Welcome to the Help Center!
        </div>
        <HelpMenu />
      </div>
    </div>
  );
}
export default HelpInteractive;
