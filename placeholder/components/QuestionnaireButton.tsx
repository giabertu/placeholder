import { useColorMode } from "@chakra-ui/react";
import React, {useState} from "react"
import styles from "../styles/Components/QuestionnaireButton.module.css";

function QuestionnaireButton({ text, value, onClick}: {text: string, value: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {

  const [selected, setSelected] = useState(false);
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
      <button className={selected ? styles.buttonSelected : styles.button} style={(isDark && selected) ? {border: 'solid 2px white'} : isDark ? {borderStyle:'solid 2px white'} : {}} value={value} onClick={(event) => {
          onClick(event);
          setSelected(!selected);
        }}>
          &#62; {text}
      </button>
      
  )
}

export default QuestionnaireButton;