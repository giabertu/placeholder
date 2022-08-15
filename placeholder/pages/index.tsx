import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Typewriter from 'typewriter-effect';
import { useRef, useEffect } from 'react';

const Home: NextPage = () => {

  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement.current) {
      (inputElement.current).focus();
    }
  }, []);


  return (
    <div className={styles.container}>

      <Typewriter
        options={{
          delay: 5,
          cursor: ""
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("01 placeholder.io [Version 0.0.1]")
            .pauseFor(150)
            .typeString("<br /> 02")
            .pauseFor(150)
            .typeString("<br /> 03 Find a programming (mentor || mentee) in minutes")
            .start();
        }}
      />

      <form>
        <p className={styles.terminalArrow}>{">"}</p>
        <input className={styles.input} ref={inputElement} type={'text'} placeholder="login || quiz_init" autoFocus={true}></input>
      </form>

    </div>

  )
}

export default Home
