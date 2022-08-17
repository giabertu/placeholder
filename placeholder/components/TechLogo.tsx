import React, { useState } from "react"
import styles from "../styles/TechLogo.module.css"
import { Tooltip } from '@chakra-ui/react'

function TechLogo({imgSrc, value, onClick}: {imgSrc: string, value: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {

  const [selected, setSelected] = useState(false);

  return (
    <div className={styles.container}>
      <Tooltip label={value} placement='top' closeOnClick={false}>
        <button className={selected ? styles.selected : styles.button} value={value} onClick={(event) => {
          onClick(event);
          setSelected(!selected);
        }}>
          <img className={styles.logo} src={imgSrc} alt={value + " logo"}></img>
        </button>
      </ Tooltip>
    </div>
  )
}

export default TechLogo