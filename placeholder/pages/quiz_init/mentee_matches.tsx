import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Navbar from '../../components/Navbar';
import UserApi from '../../services/UserApi';
import { UserType } from "../../lib/models/User";

import { GetServerSideProps } from "next";
import ChatEngineApi from '../../services/ChatEngineApi';
import { ChatEngineUser } from '../../lib/models/User';
import MatchedMenteeCard from '../../components/MatchedMenteeCard';
import MatchesNavigationButton from '../../components/MatchesNavigationButton';
import Typewriter from 'typewriter-effect';
import { useAppSelector } from '../../redux/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MatchService from '../../services/MatchService';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { Types } from 'mongoose';

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

  // const matches = await MatchService.getFirstNMentees(user, 5)
  const matchedUsersInfo = await Promise.all(user.custom_json.mentees.map(async (match) => {
    return {
      user: match,
      //@ts-ignore
      chatEngineUser: await ChatEngineApi.getChatEngineUser({ username: match.username, secret: match.secret })
    }
  }));
  return {
    props: {
      matchedUsersInfo,
      currentUser: user
    }
  };
}

function Matches({ matchedUsersInfo, currentUser }: { matchedUsersInfo: { user: UserType, chatEngineUser: ChatEngineUser }[], currentUser: UserType }) {


  matchedUsersInfo = matchedUsersInfo.filter((user) => user.user.custom_json.purpose === "be mentored" || user.user.custom_json.purpose === "" || user.user.custom_json.purpose === "both mentor and be mentored");
  const userPurpose = useAppSelector((state) => state.userInfo.purpose);

  const [user, setUser] = useState<UserType>(currentUser)
  const [menteeIds, setMenteeIds] = useState<Types.ObjectId[]>([])

  console.log(currentUser)


  async function handleAddMentee(matchedUser: { user: UserType, chatEngineUser: ChatEngineUser }) {
    if (user.username && user.secret) {
      console.log('These are the parameters that we are going to pass to getOrCreateChat: ', user.username, user.secret, matchedUser.chatEngineUser.username)
      const result = await ChatEngineApi.getOrCreateChat(user.username, user.secret, matchedUser.chatEngineUser.username)
      console.log('Here is the result from getOrCreateChat: ', result)
      console.log('Here is the matchedUser id: ', matchedUser.user._id)
      if (matchedUser.user._id) {
        setMenteeIds(menteeIds.concat([matchedUser.user._id]))
        console.log('menteeIds updated!')
      } else console.log('menteeIds not updated :(')
      return true;
    }
    console.log('username and/or secret undefined')
    return false;
  }


  async function handleUpdateUserMentees() {
    console.log('Here is the current menteeIds: ', menteeIds)
    user.custom_json.mentees = menteeIds
    const res = await UserApi.updateUserProfile(user)
    console.log('Check that user mentees (in db) is equal to menteeIds state in redux: ', res)
  }

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
      <Splide hasTrack={false} style={{ marginTop: "6rem", backgroundColor: "transparent", padding: "2rem 0.5rem" }} aria-label="..." options={{
        width: "75vw",
        // fixedWidth: "70vw",
      }}>
        <div className="custom-wrapper">
          <SplideTrack>
            {matchedUsersInfo.map((matchedUserInfo) => (
              <SplideSlide key={matchedUserInfo.user.email} style={{ display: "flex", justifyContent: "center", backgroundColor: "transparent", padding: "0.5rem 0.5rem" }}>
                <MatchedMenteeCard handleAddMentee={handleAddMentee} matchedUser={matchedUserInfo} ownUser={{ username: user?.username, secret: user?.secret }} />
                {/* <MatchedMentorCard matchedUser={matchedUserInfo}/> */}
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

      {userPurpose === "both mentor and be mentored" ?
        <MatchesNavigationButton onClick={handleUpdateUserMentees} href="mentor_matches" text="Go to your mentor matches" />
        :
        <MatchesNavigationButton onClick={handleUpdateUserMentees} href="../dashboard" text="Go to your dashboard" />
      }
    </div>
  )
}

export default Matches;