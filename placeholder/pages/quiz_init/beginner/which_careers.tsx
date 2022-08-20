import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { rolesChoices } from '../../../utils/constants'
import MentorTalkForm from "../../../components/MentorTalk";
import SelectDesiredFieldsForm from "../../../components/SelectDesiredFields";
import { useAppSelector } from "../../../redux/hooks";
import { changeDesiredCareers } from "../../../redux/slices/mentorPreferencesSlice";
import { useColorMode } from "@chakra-ui/react";

function WhichCareers() {

  const selectedCareers = useAppSelector((state)=> state.mentorPreferences.desiredCareers);

  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className="container">
      <Navbar progressValue={25} />
      <SelectDesiredFieldsForm choices={rolesChoices} />
      <QuizNavigationButtons back='quiz_init/beginner/mentor_talk' next="quiz_init/create_profile" canProceed={Boolean(selectedCareers.length)}/>
    </div>
  )

}

export default WhichCareers;