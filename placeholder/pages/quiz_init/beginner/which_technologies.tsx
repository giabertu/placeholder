import React from 'react';

import Navbar from '../../../components/Navbar';
import styles from '../../../styles/which_technologies.module.css'
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import TechLogo from '../../../components/TechLogo';
import { logos } from "../../../utils/logos";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import QuestionnaireButton from '../../../components/QuestionnaireButton';
import { toggleDesiredTechnologies } from '../../../redux/slices/mentorPreferencesSlice';
import { Input, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/react';
import AutocompleteInput from '../../../components/AutocompleteInput';


function WhichTechnologies() {

  const dispatch = useAppDispatch();
  const technologies = useAppSelector((state) => state.mentorPreferences.desiredTechnologies);
  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories);
  const technologyNames = technologies.map((techObj) => {
    if (typeof techObj !== "string") return techObj.name;
  });

  const isDark = useAppSelector(state => state.darkMode)




  const handleButtonClick = function (event: React.MouseEvent<HTMLButtonElement>) {
    const technology = event.currentTarget.value;
    if (technology === "general") {
      dispatch(toggleDesiredTechnologies(technology));
      return;
    }
    const imgData = logos.find((techData) => techData[0] === technology)![1]
    const valueObj = {
      name: technology,
      imageSrc: imgData
    }
    dispatch(toggleDesiredTechnologies(valueObj));
  }

  const route = mentorChoices.includes("developer careers") ? "beginner/which_careers" : "create_profile";

  return (
    <div className={styles.container}>
      <Navbar progressValue={50} prevValue={30} />
      {/* <ProgressBar value={10} /> */}
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!technologies.length ? <h1 className={styles.title}> I&apos;d like to become a better <span className={styles.underline}>_______</span> developer</h1>
            : technologies[0] === "general" ? <h1 className={styles.title}> I&apos;d like to become a better developer</h1>
              : <h1 className={styles.title}> I&apos;d like to become a better {JSON.stringify(technologyNames).replaceAll(",", ", ")} developer</h1>
          }
        </div>

        <h2 className={styles.instruction}>Search for the technologies you wish to learn, or choose from the list of popular tech / programming fields below:</h2>

        <AutocompleteInput learnOrLearnt='to learn' />

        <div className={styles.logoContainer}>
          {logos.map(technology =>
            <TechLogo key={technology[0]} imgSrc={technology[1]} value={technology} onClick={handleButtonClick} toLearn={true} />)}
        </div>

        <h2 className={isDark ? styles.horizontalRuleDarkMode : styles.horizontalRule}><span className={isDark ? styles.horizontalRuleTextDarkMode : styles.horizontalRuleText}>OR</span></h2>

        <QuestionnaireButton text="I'm unsure at this stage" value="general" onClick={handleButtonClick} />

      </div>


      <QuizNavigationButtons next={`quiz_init/${route}`} canProceed={Boolean(technologies.length)} progressValue={50} />

    </div>
  )
}

export default WhichTechnologies