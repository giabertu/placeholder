import { useColorMode } from '@chakra-ui/react';
import React, {useState} from 'react';

import ColorModeToggle from '../../components/ColorModeToggle';
import Navbar from "../../components/Navbar"
import ProgressBar from "../../components/ProgressBar";
import QuizNavigationButtons from "../../components/QuizNavigationButtons";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeUserLevel } from '../../redux/slices/userInfoSlice';
import styles from "../../styles/experience_level.module.css"

const descriptions = [
  'A beginner developer would have bla bla bla qualities.',
  'An intermediate developer would have bla bla bla qualities.',
  'An advanced developer would have bla bla bla qualities.'
];

function ExperienceLevel() {

  const [selection, setSelection] = useState<number | null>(null)
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const level = useAppSelector((state) => state.userInfo.level);
  const dispatch = useAppDispatch();

  function handleLevel(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(changeUserLevel(event.currentTarget.value));
  }

  return (
    <div className={styles.container}>
      <Navbar progressValue={70}/>
      <div className={styles.formContainer}>
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
          <button className={isDark ? styles.btnDarkMode : styles.btn} value='intermediate' onClick={handleLevel} onMouseEnter={() => setSelection(1)} onMouseLeave={() => setSelection(null)}> &#62; intermediate</button>
          <button className={isDark ? styles.btnDarkMode : styles.btn} value='advanced' onClick={handleLevel} onMouseEnter={() => setSelection(2)} onMouseLeave={() => setSelection(null)}> &#62; advanced</button>
        </div>

        <div className={styles.descriptionContainer}>
          {selection == null ||
            <h2 className={styles.description}>{descriptions[selection]}</h2>}
        </div>
      </div>

      <div className={styles.navigationBtns}>
          <QuizNavigationButtons back='/' next="quiz_init/beginner/mentor_talk" canProceed={Boolean(level)}/>
      </div>

    </div>
  )
}

export default ExperienceLevel