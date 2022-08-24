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

export const getServerSideProps: GetServerSideProps = async () => {
  const matches = await UserApi.getAllUsers();
  const matchedUsersInfo = await Promise.all(matches.map(async (match) => {
    return {
      user: match,
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
  // matchedUsersInfo = matchedUsersInfo.filter((user) => user.user.custom_json.purpose === "both mentor and be mentored" || user.user.custom_json.purpose === "mentor")
  matchedUsersInfo = matchedUsersInfo.filter((user) => user.user.custom_json.purpose === "be mentored" || user.user.custom_json.purpose === "" || user.user.custom_json.purpose === "both mentor and be mentored");
  const userPurpose = useAppSelector((state) => state.userInfo.purpose);

  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    if (router.query.user && typeof router.query.user === 'string') {
      const ownUser = JSON.parse(router.query.user)
      setUser(ownUser)
    }
  }, [router.query])

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
                <MatchedMenteeCard matchedUser={matchedUserInfo} ownUser={{ username: user?.username, secret: user?.secret }} />
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

      {userPurpose === "mentor and be mentored" ?
        <MatchesNavigationButton href="quiz_init/mentor_matches" text="Go to your mentor matches" />
        :
        <MatchesNavigationButton href="../dashboard" text="Go to your dashboard" />
      }
    </div>
  )
}

export default Matches;