import { useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import ColorModeToggle from '../../../components/ColorModeToggle';
import Navbar from '../../../components/Navbar'
import ProgressBar from '../../../components/ProgressBar';
import { levelDescriptions } from '../../../utils/constants';
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';

import styles from '../../../styles/experience_level.module.css'

export default function Page1() {
  const [level, setLevel] = useState('')
  const [urlPath, setUrlPath] = useState('')
  const [selection, setSelection] = useState<number | null>(null)
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';


  function handleLevel(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setLevel(event.currentTarget.innerText.replace('> ', ''));
    setUrlPath(event.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.questionContainer}>
        <ProgressBar value={10} />
        <div className={styles.title}>
          {level === '' &&
            <h1 className={styles.title}> &#62; I am a <span className={styles.underline}> ___</span> developer.</h1>
          }
          {level === 'beginner' &&
            <h1 className={styles.title}> &#62; I am a <span className={styles.level}> {level}</span> developer.</h1>
          }

          {level === `advanced` &&
            <h1 className={styles.title}> &#62; I am an <span className={styles.level}> {level}</span> developer. </h1>
          }

          {level === 'intermediate' &&
            <h1 className={styles.title}> &#62; I am an <span className={styles.level}> {level}</span> developer.</h1>
          }
        </div>

        <div className={styles.options}>
          <button className={isDark ? styles.btnDarkMode : styles.btn} value='beginner' onClick={handleLevel} onMouseEnter={() => setSelection(0)} onMouseLeave={() => setSelection(null)}> &#62; beginner</button>
          <button className={isDark ? styles.btnDarkMode : styles.btn} value='int_adv' onClick={handleLevel} onMouseEnter={() => setSelection(1)} onMouseLeave={() => setSelection(null)}> &#62; intermediate</button>
          <button className={isDark ? styles.btnDarkMode : styles.btn} value='int_adv' onClick={handleLevel} onMouseEnter={() => setSelection(2)} onMouseLeave={() => setSelection(null)}> &#62; advanced</button>
        </div>
        <div className={styles.descriptionContainer}>
          {selection == null ||
            <h2 className={styles.description}>{levelDescriptions[selection]}</h2>}
        </div>
      </div>
      <div className={styles.navigationBtns}>
        <QuizNavigationButtons back='/' next={`quiz_init/${urlPath}/${urlPath === 'int_adv' ? 'roles' : 'mentor_talk'}`} />
      </div>
    </div>

  )
}