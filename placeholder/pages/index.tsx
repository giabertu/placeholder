import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Typewriter from 'typewriter-effect';
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar } from '@chakra-ui/avatar';
import { Canvas } from '@react-three/fiber';
import Workbench from '../components/models/Workbench'
import ComputerTerminal from '../components/models/ComputerTerminal'
import { OrbitControls, PresentationControls, TransformControls } from '@react-three/drei';
import { RetroWindows } from '../components/models/RetroWindows'


// import techData from "../utils/autocompleteTermsGenerator"
// console.log(techData);

const Home: NextPage = () => {

  const { data: session } = useSession()


  const [extraTerminalLines, setExtraTerminalLines] = useState<string[]>([]);
  const [enteringEmail, setEnteringEmail] = useState(false);
  const [enteringPassword, setEnteringPassword] = useState(false);

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
      if (inputElementRef.current.value === "quiz init") {
        router.push('quiz_init/experience_level');
      }
      //
      else if (inputElementRef.current.value === "email init") {
        setEnteringEmail(true);
        setEnteringPassword(false);
        setExtraTerminalLines([...extraTerminalLines, "enter email"]);
      }
      else if (inputElementRef.current.value === 'git init') {
        signIn('github', { callbackUrl: '/' })
      } else if (inputElementRef.current.value === 'google init') {
        signIn('google', { callbackUrl: '/' })
      }
      else if (enteringEmail) {
        signIn('email', { redirect: false, email: inputElementRef.current.value, callbackUrl: '/' })
        setEnteringEmail(false);
        setEnteringPassword(true);
        setExtraTerminalLines([...extraTerminalLines, "check your inbox"]);
      }
      else if (enteringPassword) {
        setExtraTerminalLines([...extraTerminalLines, "command not found"]);
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
              .typeString("<br /> 05 if (you've been here before)")
              .pauseFor(150)
              .typeString("<br /> 06 &nbsp;&nbsp; enter 'git init' || 'google init' || 'email init'")
              .pauseFor(150)
              .typeString("<br /> 07 else")
              .pauseFor(150)
              .typeString("<br /> 08 &nbsp;&nbsp; enter 'quiz init'")

              .start();
          }}
        />

        {extraTerminalLines.map((extraTerminalLine, index) => {
          const lineNumber = index + 9;
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
        <button onClick={() => signIn()}>Sign In</button>
        {session &&
          <div>
            <button onClick={() => signOut()}>Sign Out</button>
            <Avatar size='xl' name={`${session.user?.name}`} src={`${session.user?.image}`} />
          </div>
        }
      </div>
      <div className={styles.canvasContainer + ' outline'}>
        <Canvas >
          <OrbitControls target={[-1, 0, 4]} enableZoom={false} autoRotate={true} autoRotateSpeed={1.5} enableDamping={true} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
          <ambientLight intensity={0.5} />
          <directionalLight
            color={"white"}
            intensity={0.5}
            position={[-20, 100, 50]}
          />
          <Suspense>
            {/* <Workbench scale={[7, 7, 7]} position={[0, -5, -15]} />*/}
            <RetroWindows scale={[7, 7, 7]} position={[0, 0, 2]} />
            {/* <RetroWindows scale={[25, 25, 25]} position={[-5, 5, -20]} /> */}
          </Suspense>
        </Canvas>
      </div>
    </div >

  )
}

export default Home
