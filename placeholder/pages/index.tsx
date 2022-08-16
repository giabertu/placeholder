import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

import Typewriter from 'typewriter-effect';
import React, { useRef, useEffect, useState } from 'react';

const Home: NextPage = () => {

  const [extraTerminalLines, setExtraTerminalLines] = useState<string[]>([]);
  const [enteringUsername, setEnteringUsername] = useState(false);
  const [enteringPassword, setEnteringPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // automate focus on user input during page load (autoFocus unreliable in React)
  const inputElementRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputElementRef.current) {
      (inputElementRef.current).focus();
    }
  }, []);

  const CLIFeedEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (CLIFeedEndRef.current) {
      CLIFeedEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [extraTerminalLines]);

  const handleCLIInput = function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputElementRef.current) {
      // reject blank inputs
      if (inputElementRef.current.value.match(/\w/) === null) {
        setExtraTerminalLines([...extraTerminalLines, "invalid input"]);
      }
      if (inputElementRef.current.value === "quiz_init" && !enteringUsername && !enteringPassword) {
        // take user to questionnare
      }
      //
      else if (inputElementRef.current.value === "login") {
        // if (enteringUsername) {
        //   setExtraTerminalLines([...extraTerminalLines, "you've already said that"]);
        // }
        setEnteringUsername(true);
        setEnteringPassword(false);
        setExtraTerminalLines([...extraTerminalLines, "enter username"]);
      }
      else if (enteringUsername) {
        setEnteringUsername(false);
        setEnteringPassword(true);
        setExtraTerminalLines([...extraTerminalLines, "enter password"]);
      }
      else if (enteringPassword) {
        if (false) {
          // go back to username if credentials are incorrect
          setEnteringUsername(true);
          setEnteringPassword(false);
        }
        else {
          // go to dashboard
        }
        setExtraTerminalLines([...extraTerminalLines, "enter password"]);
      }
      inputElementRef.current.value = "";
    }
  }

  return (
    <div className={styles.container}>


      <div className={styles.CLIFeed}>
        <Typewriter
          options={{
            delay: 5,
            cursor: ""
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("01 welcome to <div style='font-weight: 600; font-size: 1.1rem; color: darkblue; display: inline'>placeholder.io</div> [Version 0.0.1]")
              .pauseFor(150)
              .typeString("<br /> 02")
              .pauseFor(150)
              .typeString("<br /> 03 find a programming (mentor || mentee) in minutes")
              .pauseFor(150)
              .typeString("<br /> 04 enter (login || quiz_init) to begin")
              .start();
          }}
        />

        {extraTerminalLines.map((extraTerminalLine, index) => {
          const lineNumber = index + 5;
          const printedLineNumber = (lineNumber).toString().length < 2 ? "0" + (lineNumber) : (lineNumber).toString();
          return (
            <Typewriter
              key={printedLineNumber}
              options={{
                delay: 20,
                cursor: ""
              }}
              onInit={(typewriter) => {
              typewriter
                .typeString("...")
                .pauseFor(500)
                .deleteAll(50)
                .typeString("...")
                .pauseFor(500)
                .deleteAll(50)
                .changeDelay(5)
                .typeString(printedLineNumber + " " + extraTerminalLine)
                .start();
              }}
            />
          )
        })}

        <div ref={CLIFeedEndRef} />

      </div>

      <form onSubmit={handleCLIInput}>
          <p className={styles.terminalArrow}>{">"}</p>
          <input className={styles.input} ref={inputElementRef} type={'text'} placeholder="command" autoFocus={true}></input>
        </form>

    </div>

  )
}

export default Home
