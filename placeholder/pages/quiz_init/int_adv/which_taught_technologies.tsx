import React from "react";
import styles from "../../../styles/which_technologies.module.css";
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton, HStack } from "@chakra-ui/react"
import Navbar from "../../../components/Navbar";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AddIcon } from "@chakra-ui/icons";

export default function teach_which_technologies() {

  const dispatch = useAppDispatch();
  // const experiencedWithTechnologies = useAppSelector((state) => state.userInfo.experiencedWithTechnologies);
  const experiencedWithTechnologies = [{name: "C++"}, {name: "Javascript"}, {name: "Python"}, {name: "C#"}, {name: "Python"}, {name: "Rust"}, {name: "PHP"}];
  const selectedTechnologies = useAppSelector((state) => state.menteePreferences.desiredTechnologies);

  return (
    <div className={styles.container}>
      <Navbar progressValue={40} />
      <div className={styles.formContainer}>
        <div className={styles.title}>
          {!selectedTechnologies.length ? <h1 className={styles.title}> I'd like to be a <span className={styles.underline}>_______</span> mentor</h1>
            : <h1 className={styles.title}> I'd like to become a better {JSON.stringify(selectedTechnologies).replaceAll(",", ", ")} developer</h1>
          }
        </div>
        <h2 className={styles.instruction}>From the technologies you have experience with, select those which you wish to help your mentees with:</h2>
        <p className={styles.subInstruction}>Tap on the technologies you wish to teach</p>

        {/* <HStack spacing={4} style={{maxWidth: "40vw"}} shouldWrapChildren={true} wrap={true}> */}
        <div className={styles.tagContainer}>
          {experiencedWithTechnologies.map((technology) => (
            <Tag size={"lg"} key={technology.name} variant='subtle' colorScheme='cyan'>

              <TagLeftIcon boxSize='12px' as={AddIcon} />
              <TagLabel>{technology.name}</TagLabel>
            </Tag>
          ))}
        </div>
        {/* </HStack> */}

      </div>
    </div>
  )
}
