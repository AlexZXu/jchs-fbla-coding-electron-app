//import section
import styles from './styles/HelpInteractive.module.css'
import { FaQuestion } from "react-icons/fa6";

//function for the help button
function HelpButton({setHelp}) {
  return (
    <div className={styles["help-button"]} onClick={() => {console.log("hello"); setHelp(prevHelp => !prevHelp)}}>
      <FaQuestion />
    </div>
  );
}
export default HelpButton;
