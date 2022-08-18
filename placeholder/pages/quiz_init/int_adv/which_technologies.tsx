import React from 'react';

import Navbar from '../../../components/Navbar';
import ProgressBar from '../../../components/ProgressBar';
import styles from '../../../styles/which_technologies.module.css'
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import TechLogo from '../../../components/TechLogo';
import * as logoImages from "../../../utils/logos";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { nonBeginnerChangeInterestedTechnologies } from '../../../redux/slices/nonBeginnerFormSlice';


function WhichTechnologies() {

  const dispatch = useAppDispatch();
  const technologies = useAppSelector((state) => state.nonBeginnerForm.interestedTechnologies)

  const handleTechnology = function (event: React.MouseEvent<HTMLButtonElement>) {
    const technology = event.currentTarget.value;
    dispatch(nonBeginnerChangeInterestedTechnologies(technology));
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.formContainer}>
        <ProgressBar value={10} />
        <div className={styles.title}>
          {!technologies.length ? <h1 className={styles.title}> &#62; I am familiar with <span className={styles.underline}>_______</span> technologies</h1>
            : <h1 className={styles.title}> &#62; I am familiar with {JSON.stringify(technologies).replaceAll(",", ", ")} technologies</h1>
          }
        </div>

        <h2 className={styles.instruction}>Choose from the list of popular tech below</h2>


        <div className={styles.logoContainer}>
          <TechLogo imgSrc={logoImages.react.src} value="react" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.JS.src} value="javascript" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.TS.src} value="typescript" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.angular.src} value="angular" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.python.src} value="python" onClick={handleTechnology} />

          <TechLogo imgSrc={logoImages.java.src} value="java" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.git.src} value="git" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.HTML.src} value="HTML" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.CSS.src} value="CSS" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.node.src} value="Node.js" onClick={handleTechnology} />

          <TechLogo imgSrc={logoImages.ruby.src} value="ruby" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.rust.src} value="rust" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.CPlusPlus.src} value="C++" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.CSharp.src} value="C#" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.php.src} value="PHP" onClick={handleTechnology} />

          <TechLogo imgSrc={logoImages.docker.src} value="docker" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.graphQL.src} value="graphQL" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.SQL.src} value="SQL" onClick={handleTechnology} />
          <TechLogo imgSrc={logoImages.noSQL.src} value="NoSQL" onClick={handleTechnology} />


        </div>

        <h2 className={styles.horizontalRule}><span className={styles.horizontalRuleText}>OR</span></h2>

        <form>
          <span className={styles.terminalArrow}>&gt;</span>
          <input className={styles.technologiesSearchInput} type="text" placeholder='Type technology here...'></input>
        </form>

        <QuizNavigationButtons back='quiz_init/beginner/mentor_talk' next="" />
      </div>
    </div>
  )
}

export default WhichTechnologies