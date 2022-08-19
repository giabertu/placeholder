import React, {useState} from "react"
import styles from "../styles/Components/QuestionnaireButton.module.css";

function QuestionnaireButton({ text, value, onClick, onMouseEnter, onMouseLeave}: {text: string, value: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void, onMouseEnter?: () => void, onMouseLeave?: () => void }) {

  const [selected, setSelected] = useState(false);

  return (
      <button
        className={selected ? styles.buttonSelected : styles.button}
        value={value}
        onClick={(event) => {
            onClick(event);
            setSelected(!selected);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
          &#62; {text}
      </button>
  )
}

export default QuestionnaireButton;