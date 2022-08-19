import React from 'react';

import Navbar from '../../../components/Navbar';
import styles from '../../../styles/which_technologies.module.css'
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import TechLogo from '../../../components/TechLogo';
import * as logoImages from "../../../utils/logos";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { changeExperiencedWithTechnologies } from '../../../redux/slices/userInfoSlice';
import QuestionnaireButton from '../../../components/QuestionnaireButton';
import { Input, InputGroup, InputLeftAddon, InputLeftElement, useColorMode } from '@chakra-ui/react';

function WhichTechnologies() {

  const dispatch = useAppDispatch();
  const technologies = useAppSelector((state) => state.userInfo.experiencedWithTechnologies);
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const handleTechnology = function (event: React.MouseEvent<HTMLButtonElement>) {
    const technology = event.currentTarget.value;
    dispatch(changeExperiencedWithTechnologies(technology));
  }

  return (
    <div className={styles.container}>
      <Navbar progressValue={40}/>
      {/* <ProgressBar value={10} /> */}
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!technologies.length ? <h1 className={styles.title}> I'm familiar with <span className={styles.underline}>_______</span></h1>
            : <h1 className={styles.title}> I'm familiar with {JSON.stringify(technologies).replaceAll(",", ", ")}</h1>
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

      </div>

      <QuizNavigationButtons back='quiz_init/beginner/mentor_talk' next="quiz_init/int_adv/purpose" canProceed={Boolean(technologies.length)} />

    </div>
  )
}

export default WhichTechnologies