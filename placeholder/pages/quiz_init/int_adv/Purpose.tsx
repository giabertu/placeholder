import { useColorMode } from '@chakra-ui/react';
import React, {useState} from 'react'
import Navbar from '../../../components/Navbar';
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import styles from '../../../styles/purpose.module.css'
import PurposeForm from "../../../components/Purpose";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { changePurpose } from '../../../redux/slices/userInfoSlice';
import { purposeChoices } from '../../../utils/constants';

export default function Purpose() {

  const dispatch = useAppDispatch();
  const selectedPurpose = useAppSelector((state) => state.userInfo.purpose)

  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handlePurpose(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(changePurpose(event.currentTarget.value));
  }

  const subroute = selectedPurpose === "be mentored" ? "mentor_talk" : "mentee_talk";

  return (
  <div className="container flex-column">
    <Navbar progressValue={25}/>
    <PurposeForm choices={purposeChoices} />
    <QuizNavigationButtons back='quiz_init/int_adv/experienced_technologies' next={`quiz_init/int_adv/${subroute}`} canProceed={Boolean(selectedPurpose)}/>
  </ div>
  )
}