import React from 'react';

import Navbar from '../../../components/Navbar';
import styles from '../../../styles/which_technologies.module.css'
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import TechLogo from '../../../components/TechLogo';
import { logos } from "../../../utils/logos";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import QuestionnaireButton from '../../../components/QuestionnaireButton';
import { toggleDesiredTechnologies } from '../../../redux/slices/mentorPreferencesSlice';
import { Input, InputGroup, InputLeftAddon, InputLeftElement, useColorMode } from '@chakra-ui/react';


function WhichTechnologies() {

  const dispatch = useAppDispatch();
  const technologies = useAppSelector((state) => state.mentorPreferences.desiredTechnologies);
  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories);
  const technologyNames = technologies.map((techObj) => {
    if (typeof techObj !== "string") return techObj.name;
  });

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const handleButtonClick = function (event: React.MouseEvent<HTMLButtonElement>) {
    const technology = event.currentTarget.value;
    if (technology === "general") {
      dispatch(toggleDesiredTechnologies(technology));
      return;
    }
    const imgData = logos.find((techData) => techData[0] === technology)![1]
    const valueObj = {
      name: technology,
      imageSrc: imgData.src
    }
    dispatch(toggleDesiredTechnologies(valueObj));
  }

  const route = mentorChoices.includes("advancing in my career") ? "int_adv/which_careers" : "create_profile";

  return (
    <div className={styles.container}>
      <Navbar progressValue={40} />
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!technologies.length ? <h1 className={styles.title}> I'd like to become a better <span className={styles.underline}>_______</span> developer</h1>
            : technologies[0] === "general" ? <h1 className={styles.title}> I'd like to become a better developer</h1>
              : <h1 className={styles.title}> I'd like to become a better {JSON.stringify(technologyNames).replaceAll(",", ", ")} developer</h1>
          }
        </div>

        <h2 className={styles.instruction}>Search for the technologies you wish to improve in, or choose from the list of popular tech / programming fields below</h2>

        <form>
          {/* <span className={styles.terminalArrow}>&gt;</span> */}
          <InputGroup width='22em' >
            <InputLeftElement children='>' color={isDark ? 'gray.300' : 'gray.500'} />
            <Input variant='outline' placeholder='Type technology here...' color={isDark ? 'gray.300' : 'gray.500'} _placeholder={{ color: 'inherit' }} focusBorderColor='gray.500' />
          </InputGroup>
          {/* <input className={styles.technologiesSearchInput} type="text" placeholder='Type technology here...'></input> */}

        </form>

        <div className={styles.logoContainer}>
          {logos.map(technology =>
            <TechLogo key={technology[0]} imgSrc={technology[1].src} value={technology} onClick={handleButtonClick} toLearn={true} />)}
        </div>

      </div>

      <QuizNavigationButtons back='quiz_init/int_adv/mentor_talk' next={`quiz_init/${route}`} canProceed={Boolean(technologies.length)} />

    </div>
  )
}

export default WhichTechnologies