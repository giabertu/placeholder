import { useColorMode } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../../components/Navbar";
import uniqid from "uniqid";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import styles from '../../../styles/which_careers.module.css'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import QuestionnaireButton from "../../../components/QuestionnaireButton";
import { changeDesiredCareers } from "../../../redux/slices/mentorPreferencesSlice";

function WhichCareers() {

  const dispatch = useAppDispatch();
  const careers = useAppSelector((state) => state.mentorPreferences.desiredCareers);
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  const handleCareers = function (event: React.MouseEvent<HTMLButtonElement>) {
    const eventButton = event.target as HTMLButtonElement;
    const career = eventButton.innerText.replace('> ', '');
    console.log(career);
    dispatch(beginnerChangedesiredCareers(career));
  }

  function getStringifiedArray() {
    return JSON.stringify(careers).replace(/,/g, ', ')
  }

  return (
    <div className={styles.container}>
      <Navbar progressValue={20}/>
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!careers.length ? <h1 className={styles.title}>&#62; Roles I'd be interested in: <span className={styles.underline}>___</span></h1>
          : careers[0] === "I'm unsure at this stage" ? <h1 className={styles.title}>&#62; Roles I'd be interested in: ["I'm unsure at this stage"]</h1> :
          <h1 className={styles.title}>&#62; Roles I'd be interested in: <span className='h1-span'>{getStringifiedArray()}</span></h1>}
        </div>

        <div className={styles.options}>
          {roles.map((role: string) =>

            <button className={isDark ? styles.btnDarkMode : styles.btn} key={uniqid()} value={role} onClick={handleCareers}>
              &gt; {role}


            </button>)}
            <button className={isDark ? styles.btnDarkMode : styles.btn} value="general" onClick={handleCareers}> &gt; I'm unsure at this stage</button>
        </div>
        {/* <QuestionnaireButton text="I'm unsure at this stage" value="general" onClick={handleCareers}/> */}


      </div>

      <div className={styles.navigationBtns}>
          <QuizNavigationButtons back='/quiz_init/beginner/which_technologies' next="quiz_init/page10"/>

        </div>
    </div>
  )


}

export default WhichCareers;