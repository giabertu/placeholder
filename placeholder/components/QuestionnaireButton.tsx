import { useColorMode } from "@chakra-ui/react";
import React, {useState} from "react"
import styles from "../styles/Components/QuestionnaireButton.module.css";

function QuestionnaireButton({ text, value, onClick, onMouseEnter, onMouseLeave}: {text: string, value: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void, onMouseEnter?: () => void, onMouseLeave?: () => void }) {

  const [selected, setSelected] = useState(false);
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  

  return (
      <button

        className={`${selected ? styles.buttonSelected : styles.button} 
        ${isDark ? styles.buttonStyleDarkMode : styles.buttonStyle}`}
       
        style={(isDark && selected) ? {border: 'solid 2px white'} : isDark ? {borderStyle:'solid 2px white'} : {}} 
        value={value}

        
        onClick={(event) => {
            onClick(event);
            setSelected(!selected);
            console.log('click once')
        }}
        onMouseEnter={() => {
          onMouseEnter && onMouseEnter()
        
        }} 

        onMouseLeave={() => {
          onMouseLeave && onMouseLeave()  
        }}
      >
          &#62; {text}
      </button>

  )
}

export default QuestionnaireButton;