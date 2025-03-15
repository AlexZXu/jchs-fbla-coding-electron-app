//Imports Section
import React from 'react';
import styles from './styles/HelpInteractive.module.css'
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

//Function for help
function HelpDetail({isShown, title, children}) {
  //Constant for isOpen
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {
        isShown &&
        <div>
          <div className={styles["category-header"]} onClick={() => {setIsOpen(prevOpen => !prevOpen)}}>
            <div className={styles["category-title"]}>{title}</div>
            <div className={styles["category-arrow"]}>{ isOpen ? <FaChevronDown /> : <FaChevronUp /> }</div>
          </div>
          {
            isOpen &&
            <div className={styles["category-desc"]}>
              {children}
            </div>
          }
        </div>
      }
    </>

  )
}

export default HelpDetail;
