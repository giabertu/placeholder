import React from 'react';

import Navbar from '../../../components/Navbar';
import styles from '../../../styles/which_technologies.module.css'
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import TechLogo from '../../../components/TechLogo';
import { logos } from "../../../utils/logos";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { toggleExperiencedWithTechnologies } from '../../../redux/slices/userInfoSlice';
import QuestionnaireButton from '../../../components/QuestionnaireButton';
import { Input, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/react';
import AutocompleteInput from '../../../components/AutocompleteInput';

function ExperiencedTechnologies() {

  const dispatch = useAppDispatch();
  const technologies = useAppSelector((state) => state.userInfo.experiencedWithTechnologies);
  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories);
  const technologyNames = technologies.map((techObj) => {
    if (typeof techObj !== "string") return techObj.name;
  });

  const isDark = useAppSelector(state => state.darkMode)

  const handleButtonClick = function (event: React.MouseEvent<HTMLButtonElement>) {
    const technology = event.currentTarget.value;
    const imgData = logos.find((techData) => techData[0] === technology)![1]
    const valueObj = {
      name: technology,
      imageSrc: imgData
    }
    dispatch(toggleExperiencedWithTechnologies(valueObj));
  }

  return (
    <div className={styles.container}>
      <Navbar progressValue={30} prevValue={20} />
      {/* <ProgressBar value={10} /> */}
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!technologies.length ? <h1 className={styles.title}> I&apos;m experienced with <span className={styles.underline}>_______</span></h1>
            : <h1 className={styles.title}> I&apos;m experienced with {JSON.stringify(technologyNames).replaceAll(",", ", ")}</h1>
          }
        </div>

        <h2 className={styles.instruction}>Search for the technologies you&apos;re most familiar with, or choose from the list of popular tech / programming fields below:</h2>

        <AutocompleteInput learnOrLearnt='experienced' />

        <div className={styles.logoContainer}>
          {logos.map(technology =>
            <TechLogo key={technology[0]} imgSrc={technology[1]} value={technology} onClick={handleButtonClick} toLearn={false} />)}
        </div>

      </div>


      <QuizNavigationButtons next="quiz_init/int_adv/purpose" canProceed={Boolean(technologies.length)} progressValue={30} />

    </div>
  )
}

export default ExperiencedTechnologies