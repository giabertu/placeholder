import React, { useState } from "react"
import styles from "../styles/TechLogo.module.css"
import { Tooltip, useColorMode } from '@chakra-ui/react'

import { useAppSelector } from "../redux/hooks";

function TechLogo({imgSrc, value, onClick}: {imgSrc: string, value: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {

  // const [selected, setSelected] = useState(false);
  const technologies = useAppSelector((state) => state.beginnerForm.interestedTechnologies);
  const selected = technologies.includes(value);
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className={styles.container}>
      <Tooltip label={value} placement='top' closeOnClick={false}>
        <button className={selected ? styles.selected : styles.button} style={(isDark && selected) ? {outline: 'solid 1px white'} : {}} value={value} onClick={(event) => {
          onClick(event);
        }}>
          <img className={styles.logo} src={imgSrc} alt={value + " logo"}></img>
        </button>
      </ Tooltip>
    </div>
  )
}

export default TechLogo