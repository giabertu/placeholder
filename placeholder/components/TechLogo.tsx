import React, { useState } from "react"
import styles from "../styles/TechLogo.module.css"
import { Tooltip, useColorMode } from '@chakra-ui/react'

import { useAppSelector } from "../redux/hooks";
import { StaticImageData } from "next/image";

type PropType = {
  imgSrc: string,
  value: [string, string],
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  toLearn: boolean
}

function TechLogo({ imgSrc, value, onClick, toLearn }: PropType) {

  const selectedTechnologies = toLearn ? useAppSelector((state) => state.mentorPreferences.desiredTechnologies) : useAppSelector((state) => state.userInfo.experiencedWithTechnologies);
  const selected = selectedTechnologies.some((techObj) => typeof techObj !== "string" && techObj.name === value[0]);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className={styles.container}>
      <Tooltip label={value[0]} placement='top' closeOnClick={false}>
        <button className={selected ? styles.selected : styles.button} style={(isDark && selected) ? { outline: 'solid 1px white' } : {}} value={value[0]} onClick={(event) => {
          onClick(event);
        }}>
          <img className={styles.logo} src={imgSrc} alt={value + " logo"}></img>
        </button>
      </ Tooltip>
    </div>
  )
}

export default TechLogo