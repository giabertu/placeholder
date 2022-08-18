import { useColorMode } from '@chakra-ui/react';
import React, {useState} from 'react'
import Navbar from '../../../components/Navbar';
import ProgressBar from '../../../components/ProgressBar';
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import styles from '../../../styles/purpose.module.css'

export default function Purpose() {
  const [purpose, setPurpose] = useState('')
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';


  function handlePurpose(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(event.currentTarget.value)
    event.preventDefault();
    setPurpose(event.currentTarget.value);
  }

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.formContainer}>
        <ProgressBar value={60} />
        <div className={styles.title}>
          {purpose === '' &&
            <h1> &gt; I am here to <span className={styles.underline}> ___</span>.</h1>
          }
          {purpose === 'mentor' &&
            <h1> &gt; I am here to {purpose}.</h1>
          }
          {purpose === 'be mentored' &&
            <h1> &gt; I am here to {purpose}.</h1>
          }
          {purpose === 'both' &&
            <h1> &gt; I am here for {purpose}.</h1>}
        </div>

        <div className={styles.options}>
        <button className={isDark ? styles.btnDarkMode : styles.btn} value='mentor' onClick={handlePurpose}> &#62; mentor</button>
          <button className={isDark ? styles.btnDarkMode : styles.btn} value='be mentored' onClick={handlePurpose}> &#62; be mentored</button>
          <button className={isDark ? styles.btnDarkMode : styles.btn} value='both' onClick={handlePurpose}> &#62; both</button>
        </div>
      </div>
      <div className={styles.navigationBtns}>
          <QuizNavigationButtons back='/quiz_init/int_adv/roles' next="quiz_init/int_adv/mentor_talk"/>

        </div>

    </div>
  )
}