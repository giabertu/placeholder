import { Box } from "@chakra-ui/layout";
import { ChatEngineUser, UserType } from "../lib/models/User";
import DashboardMenteeProfile from "./DashboardProfileMentee";
import DashboardMentorProfile from "./DashboardProfileMentor";
import Typewriter from 'typewriter-effect'

import { useColorModeValue } from '@chakra-ui/react'
import { useAppSelector } from "../redux/hooks";


function DashboardMatches({ user, mentorsProfiles, menteesProfiles }: { user: UserType, mentorsProfiles: { user: UserType, chatEngineUser: ChatEngineUser }[], menteesProfiles: { user: UserType, chatEngineUser: ChatEngineUser }[] }) {

  const isDark = useAppSelector(state => state.darkMode)

  return (
    <Box className="flex-column" padding={'3rem'} >
      {mentorsProfiles.length > 0 &&
        <Box padding='2rem'>
          <Typewriter
            options={{ delay: 5, cursor: "" }}
            onInit={(typewriter) => {
              typewriter
                .typeString("<h1 class='dashboard-title'>Mentors</h1>").start()
            }} />
          <div className="flex-row gap-2r justify-center">
            {mentorsProfiles.length > 0 &&
              mentorsProfiles.map(mentor => {
                console.log('Mentor: ', mentor)
                return <div className={isDark ? "white-shadow" : ''}>
                  <DashboardMentorProfile profile={mentor} />
                </div>
              })
            }
          </div>
        </Box>
      }
      {menteesProfiles.length > 0 &&
        <Box bg={useColorModeValue('white', 'gray.900')} padding='2rem'>
          <Typewriter
            options={{ delay: 5, cursor: "" }}
            onInit={(typewriter) => {
              typewriter
                .typeString("<h1 class='dashboard-title'>Mentors</h1>").start()
            }} />
          <div className="flex-row gap-2r justify-center">
            {menteesProfiles.length > 0 &&
              menteesProfiles.map(mentee => {
                return <div className={isDark ? "white-shadow" : ''}>
                  <DashboardMenteeProfile profile={mentee} />
                </div>
              })
            }
          </div>
        </Box>
      }
    </Box>
  )
}

export default DashboardMatches;