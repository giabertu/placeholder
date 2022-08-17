import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import ProgressBar from '../../components/ProgressBar';
import styles from '../../styles/Page3.module.css'
import { useRouter } from 'next/router'
import QuizNavigationButtons from '../../components/QuizNavigationButtons';
import TechLogo from '../../components/TechLogo';
import * as logoImages from "../../utils/logos";


function beginner_which_technologies() {

  const [technologies, setTechnologies] = useState<string[]>([]);

  const handleTechnology = function (event: React.MouseEvent<HTMLButtonElement>) {
    const technology = technologies.length ? event.currentTarget.value : event.currentTarget.value
    const newTechnologies = [...technologies];

    if (technologies.includes(technology)) {
      newTechnologies.splice(newTechnologies.indexOf(technology), 1);
      return setTechnologies(newTechnologies);
    }

    setTechnologies([...technologies, technology])

  }

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.questionContainer}>
        <ProgressBar value={10} />
        <div className={styles.title}>
          {!technologies.length ? <h1> {'>'} I want to become a better _______ developer</h1>
            : technologies[0] === "general" ?  <h1> {'>'} I want to become a better general developer</h1>
            : <h1> {'>'} I want to become a better {JSON.stringify(technologies).replaceAll(",", ", ")} developer</h1>
          }
        </div>

        <div className={styles.options}>

          <TechLogo imgSrc={logoImages.react.src} value="react" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.JS.src} value="javascript" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.TS.src} value="typescript" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.python.src} value="python" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.java.src} value="java" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.git.src} value="git" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.HTML.src} value="rust" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.CSS.src} value="python" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.CPlusPlus.src} value="rust" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.CSharp.src} value="python" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.rust.src} value="rust" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.JS.src} value="javascript" onClick={handleTechnology}/>

          {/* <img src="./img/google.png" alt="rust logo" value="rust" onClick={handleTechnology} />
          <input type="image" src={rustLogo.src} value="rust" onClick={handleTechnology}></input> */}

          <button className={styles.btn} value='general' onClick={handleTechnology}> {`>`} general</button>
        </div>

        <div className={styles.descriptionContainer}>


        </div>
        <QuizNavigationButtons back='quiz_init/beginner_mentor_talk' next=""/>

      </div>


    </div>
  )
}

export default beginner_which_technologies
