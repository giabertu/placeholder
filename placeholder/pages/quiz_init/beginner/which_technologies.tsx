import React, { useState } from 'react';
import { useRouter } from 'next/router'

import Navbar from '../../../components/Navbar';
import ProgressBar from '../../../components/ProgressBar';
import styles from '../../../styles/which_technologies.module.css'
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import TechLogo from '../../../components/TechLogo';
import * as logoImages from "../../../utils/logos";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import QuestionnaireButton from '../../../components/QuestionnaireButton';
import { beginnerChangeInterestedTechnologies } from '../../../redux/slices/beginnerFormSlice';
import { Input, InputGroup, InputLeftAddon, InputLeftElement, useColorMode } from '@chakra-ui/react';


function WhichTechnologies() {

  const dispatch = useAppDispatch();
  const technologies = useAppSelector((state) => state.beginnerForm.interestedTechnologies);
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const handleTechnology = function (event: React.MouseEvent<HTMLButtonElement>) {
    const technology = event.currentTarget.value;
    dispatch(beginnerChangeInterestedTechnologies(technology));
  }

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.formContainer}>
        <ProgressBar value={10} />
        <div className={styles.title}>
          {!technologies.length ? <h1 className={styles.title}> &#62; I'd like to become a better <span className={styles.underline}>_______</span> developer</h1>
            : technologies[0] === "general" ?  <h1 className={styles.title}> &#62; I'd like to become a better developer</h1>
            : <h1 className={styles.title}> &#62; I'd like to become a better {JSON.stringify(technologies).replaceAll(",", ", ")} developer</h1>
          }
        </div>

        <h2 className={styles.instruction}>Search for the technologies you wish to learn, or choose from the list of popular tech below</h2>

        <form>
          {/* <span className={styles.terminalArrow}>&gt;</span> */}
          <InputGroup width='22em' >
            <InputLeftElement children='>' color={isDark ? 'gray.300' : 'gray.500'}/>
            <Input variant='outline' placeholder='Type technology here...' color={isDark ? 'gray.300' : 'gray.500'} _placeholder={{color: 'inherit'}} focusBorderColor='gray.500'/>
          </InputGroup>
          {/* <input className={styles.technologiesSearchInput} type="text" placeholder='Type technology here...'></input> */}
          
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

        <h2 className={isDark ? styles.horizontalRuleDarkMode : styles.horizontalRule}><span className={isDark ? styles.horizontalRuleTextDarkMode : styles.horizontalRuleText}>OR</span></h2>

        <QuestionnaireButton text="I'm unsure at this stage" value="general" onClick={handleTechnology}/>
        <QuizNavigationButtons back='quiz_init/beginner/mentor_talk' next='quiz_init/beginner/which_careers'/>

      </div>
    </div>
  )
}

export default WhichTechnologies