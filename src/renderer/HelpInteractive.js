//imports section
import styles from './styles/HelpInteractive.module.css'
import { IoClose } from "react-icons/io5";
import HelpMenu from './HelpMenu';
//function for the interactive
function HelpInteractive({setHelp}) {
  return (
    <div className={styles["help-menu-container"]}>
      <div className={styles["help-close"]} onClick={() => {setHelp(false)}}><IoClose /></div>
      <HelpMenu />
    </div>
  );
}
export default HelpInteractive;
