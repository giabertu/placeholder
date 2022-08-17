import React, {useState} from 'react'
import Navbar from '../../../components/Navbar';
import ProgressBar from '../../../components/ProgressBar';
import styles from '../../../styles/Purpose.module.css'

export default function Purpose() {
  const [purpose, setPurpose] = useState('')

  function handlePurpose(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget.value)
    setPurpose(e.currentTarget.value);

  }

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.questionContainer}>
        <ProgressBar value={60} />
        <div className={styles.title}>
          {purpose === '' &&
            <h1> {'>'} I am here to <span className={styles.underline}> ___</span>.</h1>
          }
          {purpose === 'mentor' && 
            <h1> {'>'} I am here to {purpose}.</h1>
          }
          {purpose === 'be mentored' && 
            <h1> {'>'} I am here to {purpose}.</h1>
          }
          {purpose === 'both' && 
            <h1> {'>'} I am here for {purpose}.</h1>}
          
         

        </div>

        <div className={styles.options}>
        <button className={styles.btn} value='be mentored' onClick={handlePurpose}> {'>'} <span className={styles.move}>mentor</span></button>
          <button className={styles.btn} value='be mentored' onClick={handlePurpose}> {'>'} <span className={styles.move}>be mentored</span></button>
          <button className={styles.btn} value='both' onClick={handlePurpose}> {'>'} <span className={styles.move}>both</span></button>
        </div>
      </div>
      
    </div>
  )
}