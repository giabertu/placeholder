import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Typewriter from 'typewriter-effect';
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar } from '@chakra-ui/avatar';

const Home: NextPage = () => {

  const { data: session } = useSession()


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

  const router = useRouter();

  const handleCLIInput = function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputElementRef.current) {
      // reject blank inputs
      if (inputElementRef.current.value.match(/\w/) === null) {
        setExtraTerminalLines([...extraTerminalLines, "invalid input"]);
      }
      if (inputElementRef.current.value === "quiz_init" && !enteringUsername && !enteringPassword) {
        router.push('quiz_init/page1');
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
              .typeString("<br /> 04")
              .pauseFor(150)
              .typeString("<br /> 05 if (you've been here before) enter 'login'")
              .pauseFor(150)
              .typeString("<br /> 06 else enter 'quiz_init'")

              .start();
          }}
        />

        {extraTerminalLines.map((extraTerminalLine, index) => {
          const lineNumber = index + 7;
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
        <span className={styles.terminalArrow}>&gt;</span>
        <input className={styles.input} ref={inputElementRef} type={'text'} placeholder="command" autoFocus={true}></input>
      </form>

      <div>
        {!session ? <button onClick={() => signIn()}>Sign In with Github</button> :
          <div>
            <button onClick={() => signOut()}>Sign Out</button>
            <Avatar size='xl' name={`${session.user?.name}`} src={`${session.user?.image}`} />
          </div>
        }
      </div>
    </div>

  )
}

export default Home
