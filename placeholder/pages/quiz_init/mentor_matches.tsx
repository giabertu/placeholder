import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Navbar from '../../components/Navbar';
import UserApi from '../../services/UserApi';
import { UserType } from "../../lib/models/User";
import { useRouter } from 'next/router';

import { GetServerSideProps } from "next";
import ChatEngineApi from '../../services/ChatEngineApi';
import { ChatEngineUser } from '../../lib/models/User';
import MatchedMentorCard from '../../components/MatchedMentorCard';
import Typewriter from 'typewriter-effect';
import MatchesNavigationButton from '../../components/MatchesNavigationButton';
import { Types } from 'mongoose';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useAppSelector } from '../../redux/hooks';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  //@ts-ignore  
  const user = await UserApi.getOneUser(session.user.email)
  console.log('Here is the user inside the server: ', user)
  console.log('Here are the mentors: ', user.custom_json.mentors)
  const matchedUsersInfo = await Promise.all(user.custom_json.mentors.map(async (match) => {
    return {
      user: match,
      //@ts-ignore
      chatEngineUser: await ChatEngineApi.getChatEngineUser({ username: match.username, secret: match.secret })
    }
  }));
  return {
    props: {
      matchedUsersInfo
    }
  };
}

function Matches({ matchedUsersInfo }: { matchedUsersInfo: { user: UserType, chatEngineUser: ChatEngineUser }[] }) {

  console.log(matchedUsersInfo)

  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null)
  const mentorIds = useAppSelector(state => state.mentorIds)

  useEffect(() => {
    if (router.query.user && typeof router.query.user === 'string') {
      const ownUser = JSON.parse(router.query.user)
      setUser(ownUser)
    }
  }, [router.query])


  async function handleUpdateUserMentors() {
    if (user) {
      user.custom_json.mentors = mentorIds
      const res = await UserApi.updateUserProfile(user)
      console.log('Check that user mentees (in db) is equal to menteeIds state in redux: ', res)
    }
  }

  matchedUsersInfo = matchedUsersInfo.filter((user) => user.user.custom_json.purpose === "both mentor and be mentored" || user.user.custom_json.purpose === "mentor")
  // matchedUsersInfo = matchedUsersInfo.filter((user) => user.user.custom_json.purpose === "be mentored" || user.user.custom_json.purpose === "" || user.user.custom_json.purpose === "both mentor and be mentored")

  return (
    <div className='carousel-container'>
      <Navbar />
      <h1 className='carousel-title'>Your mentee matches</h1>
      {/* <Typewriter
          options={{
            delay: 30,
            cursorClassName: "typewriter-cursor"
            // cursor: "|"
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString('<h1 style="display: inline;">Finding you the best matches for your preferences...</h1>')
              .start();
          }}
        /> */}
      <Splide hasTrack={false} aria-label="..." options={{
        width: "80vw",
        // fixedWidth: "70vw",
      }}>
        <div className="custom-wrapper">
          <SplideTrack>
            {matchedUsersInfo.map((matchedUserInfo) => (
              <SplideSlide key={matchedUserInfo.user.email} style={{ display: "flex", justifyContent: "center" }}>
                {/* <MatchedMenteeCard matchedUser={matchedUserInfo}/> */}
                <MatchedMentorCard matchedUser={matchedUserInfo} ownUser={{ username: user?.username, secret: user?.secret }} />
                {/* <ProfileNotEditable user={matchedUserInfo.user} chatEngineUser={matchedUserInfo.chatEngineUser}/> */}
                {/* <h1>hello</h1> */}
              </SplideSlide>
            ))}
          </SplideTrack>

          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev"><ArrowForwardIcon /></button>
            <button className="splide__arrow splide__arrow--next"><ArrowForwardIcon /></button>
          </div>
          <div className="splide__arrows" />
          {/* <div className="splide__pagination" style={{marginTop: "-4rem"}} /> */}

        </div>
      </Splide>

      {user?.custom_json.level === 'beginner' &&
        <MatchesNavigationButton onClick={handleUpdateUserMentors} href="../dashboard" text="Go to your dashboard" />
      }
      {user?.custom_json.purpose === 'both mentor and be mentored' &&
        <MatchesNavigationButton onClick={handleUpdateUserMentors} href='/mentee_matches' text='Show matched mentees' />

      }

    </div>
  )
}

export default Matches;