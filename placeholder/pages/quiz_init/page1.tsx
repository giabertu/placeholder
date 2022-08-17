import React, {useState} from 'react';
import ColorModeToggle from '../../components/ColorModeToggle';
import Navbar from '../../components/Navbar';
import ProgressBar from '../../components/ProgressBar';
import QuizCompanyName from '../../components/QuizCompanyName';
import QuizNavigationButtons from '../../components/QuizNavigationButtons';
import styles from '../../styles/Page1.module.css'



export default function Page1() {
  const [level, setLevel] = useState('')

  function handleLevel(event: React.MouseEvent<HTMLButtonElement>) {
    setLevel(event.currentTarget.value);
  }

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.questionContainer}>
        <ProgressBar value={10} />
        <div className={styles.title}>
          {level === '' &&
            <h1> {'>'} I am a ...... developer</h1>
          }
          {level === 'beginner' &&
            <h1> {'>'} I am a <span className={styles.level}> {level}</span> developer.</h1>
          }

          {level === `advanced` &&
            <h1> {'>'} I am an <span className={styles.level}> {level}</span> developer. </h1>
          }

          {level === 'intermediate' &&
            <h1> {'>'} I am an <span className={styles.level}> {level}</span> developer.</h1>
          }
        </div>

        <div className={styles.options}>
          <button className={styles.btn} value='beginner' onClick={handleLevel}> {`>`} beginner </button>
          <button className={styles.btn} value='intermediate' onClick={handleLevel}> {`>`} intermediate</button>
          <button className={styles.btn} value='advanced' onClick={handleLevel}> {`>`} advanced</button>
        </div>

        <div className={styles.descriptionContainer}>

          {level === 'beginner' &&
            <h2 className={styles.description}>A beginner developer would have bla bla bla qualities.</h2>
          }
          {level === 'intermediate' &&
            <h2 className={styles.description}>An intermediate developer would have bla bla bla qualities.</h2>
          }

          {level === 'advanced' &&
            <h2 className={styles.description}>An advanced developer would have bla bla bla qualities.</h2>
          }


        </div>
        <QuizNavigationButtons back='/' next="quiz_init/beginner_mentor_talk"/>

      </div>


    </div>

  )
}