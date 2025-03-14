import React from 'react';
import styles from './styles/HelpInteractive.module.css'
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

function HelpDetail({isShown, title, children}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
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
    </div>

  )
}

export default HelpDetail;
