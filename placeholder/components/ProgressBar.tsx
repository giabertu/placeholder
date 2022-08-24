import { Progress } from "@chakra-ui/progress";
import { useColorMode } from '@chakra-ui/react';
import styles from "../styles/Components/ProgressBar.module.css";
import {useEffect, useState} from 'react'

function ProgressBar({ value, prevValue }: { value: number, prevValue: number }) {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';
  const [current, setCurrent] = useState(prevValue)

 //change the current val to a fraction of the difference between the prev value and value
  useEffect(() => {
    const delta = value - prevValue 
    if (current < value) {
      setTimeout(() => {
        setCurrent((prev) => {
          console.log('prev', prev)
          return prev = prev + delta/50
        })
      }, 20)
    }
   

  }, [current])


  return (
    <Progress className={styles.bar} colorScheme={isDark ? "gray" : "blackAlpha"} value={current} height='0.6rem'  />
  )
}

export default ProgressBar;