import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import uniqid from "uniqid";
import ProgressBar from "../../../components/ProgressBar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { rolesChoices } from '../../../utils/constants'
import styles from '../../../styles/roles.module.css'
import RolesForm from "../../../components/Roles";
import { useAppSelector } from "../../../redux/hooks";


function Roles() {

  const selectedRole = useAppSelector((state) => state.userInfo.developerField)

  const [choice, setChoice] = useState<string>('_')
  const [currentSelection, setCurrentSelection] = useState<null | number>(null)
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const endOfTitle = eventButton.innerText.replace('> ', '');
    setChoice(endOfTitle)
  }

  return (
    <div className="container flex-column">
    <Navbar progressValue={25}/>
    <RolesForm choices={rolesChoices} />
    <QuizNavigationButtons back='quiz_init/int_adv/Purpose' next="quiz_init/page10" canProceed={Boolean(selectedRole)}/>
  </div >
  )
}

export default Roles;

