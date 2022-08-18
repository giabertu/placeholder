import { useColorMode } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../../components/Navbar";
import uniqid from "uniqid";
import ProgressBar from "../../../components/ProgressBar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { roles } from '../../../utils/constants'
import styles from '../../../styles/which_careers.module.css'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {beginnerChangeInterestedCareers} from '../../../redux/slices/beginnerFormSlice'
import QuestionnaireButton from "../../../components/QuestionnaireButton";

function WhichCareers() {
  
  const dispatch = useAppDispatch();
  const careers = useAppSelector((state) => state.beginnerForm.interestedCareers);
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  const handleCareers = function (event: React.MouseEvent<HTMLButtonElement>) {
    const eventButton = event.target as HTMLButtonElement;
    const career = eventButton.innerText.replace('> ', '');
    console.log(career);
    dispatch(beginnerChangeInterestedCareers(career));
  }

  function getStringifiedArray() {
    return JSON.stringify(careers).replace(/,/g, ', ')
  }

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.formContainer}>
        <ProgressBar value={20}/>
        <div className={styles.title}>
          {!careers.length ? <h1 className={styles.title}>&#62; Roles I'd be interested in: <span className={styles.underline}>___</span></h1>
          : 
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