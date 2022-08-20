import { useColorMode } from "@chakra-ui/react";
import React, {useState} from "react"
import styles from "../styles/Components/QuestionnaireButton.module.css";

function QuestionnaireButton({ text, value, onClick, onMouseEnter, onMouseLeave}: {text: string, value: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void, onMouseEnter?: () => void, onMouseLeave?: () => void }) {

  const [selected, setSelected] = useState(false);
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [animation, setAnimation] = useState(false);

  return (
      <button
        className={`${selected ? styles.buttonSelected : styles.button} 
        ${isDark ? styles.buttonStyleDarkMode : styles.buttonStyle} 
        ${animation ? styles.slideBack : styles.slideRight}` }
       
        style={(isDark && selected) ? {border: 'solid 2px white'} : isDark ? {borderStyle:'solid 2px white'} : null} value={value}
        onClick={(event) => {
            onClick?.(event);
            setSelected(!selected);
            console.log('click once')
        }}
        onMouseEnter={() => {
          onMouseEnter && onMouseEnter()
        setAnimation(false)
        }} 

        onMouseLeave={() => {
          onMouseLeave && onMouseLeave()
          setAnimation(true)
          
        }}
      >
          &#62; {text}
      </button>

  )
}

export default QuestionnaireButton;