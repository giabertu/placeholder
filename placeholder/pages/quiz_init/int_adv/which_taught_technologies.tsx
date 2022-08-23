import React from "react";
import styles from "../../../styles/which_technologies.module.css";
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton, HStack } from "@chakra-ui/react"
import Navbar from "../../../components/Navbar";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AddIcon } from "@chakra-ui/icons";
import TechTag from "../../../components/TechTag";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";

export default function teach_which_technologies() {

  const dispatch = useAppDispatch();
  const experiencedWithTechnologies = useAppSelector((state) => state.userInfo.experiencedWithTechnologies);
  const selectedTechnologies = useAppSelector((state) => state.menteePreferences.desiredTechnologies);
  const technologyNames = selectedTechnologies.map((techObj) => techObj.name);

  return (
    <div className={styles.container}>
      <Navbar progressValue={40} />
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!selectedTechnologies.length ? <h1 className={styles.title}> I'd like to be a <span className={styles.underline}>_______</span> mentor</h1>
            : <h1 className={styles.title}> I'd like to be a {JSON.stringify(technologyNames).replaceAll(",", ", ")} mentor </h1>
          }
        </div>
        <h2 className={styles.instruction}>From the technologies you have experience with, select those which you wish to help your mentees with:</h2>
        <p className={styles.subInstruction}>Tap on the technologies you wish to teach</p>

        <div className={styles.tagContainer}>
          {experiencedWithTechnologies.map((technology) => (
            <TechTag technology={technology}/>
          ))}
        </div>

      </div>
      <QuizNavigationButtons back='quiz_init/int_adv/mentor_talk' next={`quiz_init/create_profile`} canProceed={Boolean(selectedTechnologies.length)} />
    </div>
  )
}
