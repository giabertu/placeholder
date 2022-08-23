import React, { useEffect, useState } from 'react';
import styles from "../../styles/which_technologies.module.css";
import Typewriter from 'typewriter-effect';
import Navbar from '../../components/Navbar';
import { Progress } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import IconMessage from '../../components/IconMessage';


function FindingMatches () {

  const [progressValue, setProgressValue] = useState(0);
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showProgressbar, setShowProgressbar] = useState(false);

  console.log(progressValue)
  useEffect(() => {

    setTimeout(() => {
      function increment() {
        setProgressValue((prev) => prev + 0.1923076923
        );
    };

      const increaseProgress = setInterval(increment, 12.5);

      setTimeout(() => {
        clearInterval(increaseProgress);
        setProgressValue(100);
      }, 6500);
    }, 3000);

    setTimeout(() => {
      setShowProgressbar(true);
    }, 1800)

    setTimeout(() => {
      setShowFirstMessage(true);
    }, 3000)

    setTimeout(() => {
      setShowSecondMessage(true);
    }, 4800)

  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.formContainer}>
        <Typewriter
          options={{
            delay: 30,
            cursorClassName: "typewriter-cursor"
            // cursor: "|"
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString('<h1 style="display: inline;">Finding you the best matches for your preferences...</h1>')
              .start();
          }}
        />
        <div className='message-container'>
          {showFirstMessage && <IconMessage icon="message" message1="Message" message2="your matches to begin a conversation"></IconMessage>}
          {showSecondMessage && <IconMessage icon="edit" message1="Edit" message2="your matching preferences at any time"></IconMessage>}
        </div>


        {showProgressbar && <Progress className='finding-match-progress-bar' value={progressValue} size='md' colorScheme='linkedin' width={"50vw"} />}
      </div>
    </div>
  );
};

export default FindingMatches