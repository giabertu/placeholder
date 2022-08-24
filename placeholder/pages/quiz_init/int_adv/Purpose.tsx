
import React, { useState } from 'react'
import Navbar from '../../../components/Navbar';
import QuizNavigationButtons from '../../../components/QuizNavigationButtons';
import PurposeForm from "../../../components/Purpose";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { changePurpose } from '../../../redux/slices/userInfoSlice';
import { purposeChoices } from '../../../utils/constants';

export default function Purpose() {

  const dispatch = useAppDispatch();
  const selectedPurpose = useAppSelector((state) => state.userInfo.purpose)



  function handlePurpose(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(changePurpose(event.currentTarget.value));
  }

  const subroute = selectedPurpose === "be mentored" ? "mentor_talk" : "mentee_talk";

  return (

  <div className="container flex-column">
    <Navbar progressValue={40} prevValue={30}/>
    <PurposeForm choices={purposeChoices} />
    <QuizNavigationButtons next={`quiz_init/int_adv/${subroute}`} canProceed={Boolean(selectedPurpose)} progressValue={40}/>
  </ div>

  )
}