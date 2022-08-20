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
  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories);
  const route = mentorChoices.includes("learning how to program") ? "quiz_init/beginner/which_technologies" : "quiz_init/beginner/mentor_talk";

  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className="container">
      <Navbar progressValue={25} />
      <SelectDesiredFieldsForm choices={rolesChoices} />
      <QuizNavigationButtons back={route} next="quiz_init/create_profile" canProceed={Boolean(selectedCareers.length)}/>
    </div>
  )

}

export default WhichCareers;