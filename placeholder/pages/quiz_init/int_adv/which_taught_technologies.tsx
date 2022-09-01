import React from "react";
import styles from "../../../styles/which_technologies.module.css";
import Navbar from "../../../components/Navbar";
import { useAppSelector } from "../../../redux/hooks";
import TechTag from "../../../components/TechTag";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";

export default function WhichTaughtTechnologies() {

  const experiencedWithTechnologies = useAppSelector((state) => state.userInfo.experiencedWithTechnologies);
  const selectedTechnologies = useAppSelector((state) => state.menteePreferences.desiredTechnologies);
  const userPurpose = useAppSelector((state) => state.userInfo.purpose);
  const technologyNames = selectedTechnologies.map((techObj) => techObj.name);

  const route = userPurpose === "both mentor and be mentored" ? "int_adv/mentor_talk" : "create_profile";

  return (
    <div className={styles.container}>
      <Navbar progressValue={60} prevValue={50} />
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!selectedTechnologies.length ? <h1 className={styles.title}> I&apos;d like to be a <span className={styles.underline}>_______</span> mentor</h1>
            : <h1 className={styles.title}> I&apos;d like to be a {JSON.stringify(technologyNames).replaceAll(",", ", ")} mentor </h1>
          }
        </div>
        <h2 className={styles.instruction}>From the technologies you have experience with, select those which you wish to help your mentees with:</h2>
        <p className={styles.subInstruction}>Tap on the technologies you wish to teach</p>

        <div className={styles.tagContainer}>
          {experiencedWithTechnologies.map((technology) => (
            <TechTag key={technology.name} technology={technology} />
          ))}
        </div>

      </div>
      <QuizNavigationButtons next={`quiz_init/${route}`} canProceed={Boolean(selectedTechnologies.length)} progressValue={60} />

    </div>
  )
}
