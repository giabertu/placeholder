import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import ProgressBar from '../../../components/ProgressBar';
import styles from '../../../styles/Page3.module.css'
import { useRouter } from 'next/router'
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import TechLogo from '../../../components/TechLogo';
import * as logoImages from "../../../utils/logos";

import QuestionnaireButton from '../../../components/QuestionnaireButton';


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
      <div className={styles.formContainer}>
        <ProgressBar value={10} />
        <div className={styles.title}>
          {!technologies.length ? <h1 className={styles.title}> &#62; I'd like to become a better <span className={styles.underline}>_______</span> developer</h1>
            : technologies[0] === "general" ?  <h1 className={styles.title}> &#62; I'd like to become a better general developer</h1>
            : <h1 className={styles.title}> &#62; I'd like to become a better {JSON.stringify(technologies).replaceAll(",", ", ")} developer</h1>
          }
        </div>

        <h2 className={styles.instruction}>Search for the technologies you wish to learn, or choose from the list of popular tech below</h2>

        <form>
          <span className={styles.terminalArrow}>&gt;</span>
          <input className={styles.technologiesSearchInput} type="text" placeholder='Type technology here...'></input>
        </form>

        <div className={styles.logoContainer}>
          <TechLogo imgSrc={logoImages.react.src} value="react" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.JS.src} value="javascript" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.TS.src} value="typescript" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.angular.src} value="angular" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.python.src} value="python" onClick={handleTechnology}/>

          <TechLogo imgSrc={logoImages.java.src} value="java" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.git.src} value="git" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.HTML.src} value="HTML" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.CSS.src} value="CSS" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.node.src} value="Node.js" onClick={handleTechnology}/>

          <TechLogo imgSrc={logoImages.ruby.src} value="ruby" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.rust.src} value="rust" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.CPlusPlus.src} value="C++" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.CSharp.src} value="C#" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.php.src} value="PHP" onClick={handleTechnology}/>

          <TechLogo imgSrc={logoImages.docker.src} value="docker" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.graphQL.src} value="graphQL" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.SQL.src} value="SQL" onClick={handleTechnology}/>
          <TechLogo imgSrc={logoImages.noSQL.src} value="NoSQL" onClick={handleTechnology}/>


        </div>

        <h2 className={styles.horizontalRule}><span className={styles.horizontalRuleText}>OR</span></h2>


        <QuestionnaireButton text="I'm unsure at this stage" value="general" onClick={handleTechnology}/>
        <QuizNavigationButtons back='quiz_init/beginner/mentor_talk' next=""/>

      </div>


    </div>
  )
}

export default beginner_which_technologies
