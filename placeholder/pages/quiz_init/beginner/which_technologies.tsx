import React, { useState } from 'react';
import { useRouter } from 'next/router'

import Navbar from '../../../components/Navbar';
import styles from '../../../styles/which_technologies.module.css'
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import TechLogo from '../../../components/TechLogo';
import * as logoImages from "../../../utils/logos";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import QuestionnaireButton from '../../../components/QuestionnaireButton';
import { changeDesiredTechnologies } from '../../../redux/slices/mentorPreferencesSlice';
import { Input, InputGroup, InputLeftAddon, InputLeftElement, useColorMode } from '@chakra-ui/react';


function WhichTechnologies() {

  const dispatch = useAppDispatch();
  const technologies = useAppSelector((state) => state.mentorPreferences.desiredTechnologies);
  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories)
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const handleButtonClick = function (event: React.MouseEvent<HTMLButtonElement>) {
    const technology = event.currentTarget.value;
    dispatch(changeDesiredTechnologies(technology));
  }

  const route = mentorChoices.includes("switching careers") || mentorChoices.includes("finding my dream developer role") ? "beginner/which_careers" : "create_profile"

  return (
    <div className={styles.container}>
      <Navbar progressValue={40}/>
      {/* <ProgressBar value={10} /> */}
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!technologies.length ? <h1 className={styles.title}> I'd like to become a better <span className={styles.underline}>_______</span> developer</h1>
            : technologies[0] === "general" ? <h1 className={styles.title}> I'd like to become a better developer</h1>
            : <h1 className={styles.title}> I'd like to become a better {JSON.stringify(technologies).replaceAll(",", ", ")} developer</h1>
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
          <TechLogo imgSrc={logoImages.react.src} value="react" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.JS.src} value="javascript" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.TS.src} value="typescript" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.angular.src} value="angular" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.python.src} value="python" onClick={handleButtonClick} toLearn={true} />

          <TechLogo imgSrc={logoImages.java.src} value="java" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.git.src} value="git" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.HTML.src} value="HTML" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.CSS.src} value="CSS" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.node.src} value="Node.js" onClick={handleButtonClick} toLearn={true} />

          <TechLogo imgSrc={logoImages.ruby.src} value="ruby" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.rust.src} value="rust" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.CPlusPlus.src} value="C++" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.CSharp.src} value="C#" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.php.src} value="PHP" onClick={handleButtonClick} toLearn={true} />

          <TechLogo imgSrc={logoImages.docker.src} value="docker" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.graphQL.src} value="graphQL" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.SQL.src} value="SQL" onClick={handleButtonClick} toLearn={true} />
          <TechLogo imgSrc={logoImages.noSQL.src} value="NoSQL" onClick={handleButtonClick} toLearn={true} />


        </div>

        <h2 className={isDark ? styles.horizontalRuleDarkMode : styles.horizontalRule}><span className={isDark ? styles.horizontalRuleTextDarkMode : styles.horizontalRuleText}>OR</span></h2>

        <QuestionnaireButton text="I'm unsure at this stage" value="general" onClick={handleButtonClick} />

      </div>

      <QuizNavigationButtons back='quiz_init/beginner/mentor_talk' next={`quiz_init/${route}`} canProceed={Boolean(technologies.length)} />

    </div>
  )
}

export default WhichTechnologies