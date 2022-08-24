import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Navbar from '../../components/Navbar';
import UserApi from '../../services/UserApi';
import { UserType } from "../../lib/models/User";

import { GetServerSideProps } from "next";
import ProfileNotEditable from "../../components/ProfileNotEditable"
import ChatEngineApi from '../../services/ChatEngineApi';
import { ChatEngineUser } from '../../lib/models/User';
import MatchedMenteeCard from '../../components/MatchedMenteeCard';
import MatchedMentorCard from '../../components/MatchedMentorCard';
import Typewriter from 'typewriter-effect';

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

function Matches({matchedUsersInfo}: {matchedUsersInfo: {user: UserType, chatEngineUser: ChatEngineUser}[]}) {
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
      <Splide hasTrack={ false } aria-label="..." options={{
        width: "80vw",
        // fixedWidth: "70vw",
      }}>
        <div className="custom-wrapper">
          <SplideTrack >
          {matchedUsersInfo.map((matchedUserInfo) => (
            <SplideSlide key={matchedUserInfo.user.email} style={{display: "flex", justifyContent: "center"}}>
              {/* <MatchedMenteeCard matchedUser={matchedUserInfo}/> */}
              <MatchedMentorCard matchedUser={matchedUserInfo}/>
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
    </div>
  )
}

export default Matches;