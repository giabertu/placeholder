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

export const getServerSideProps: GetServerSideProps = async () => {
  const matches = await UserApi.getAllUsers();
  const matchedUsersInfo = await Promise.all(matches.map(async (match) => {
    return {
      user: match,
      chatEnginerUser: await ChatEngineApi.getChatEngineUser({ username: match.username, secret: match.secret })
    }
  }));
  return {
    props: {
      matchedUsersInfo
    }
  };
}

function Matches({matchedUsersInfo}: {matchedUsersInfo: {user: UserType, chatEnginerUser: ChatEngineUser}[]}) {
  // console.log("yooooooooooooo:", matches);

  // const [matches, setMatches] = useState<UserType[]>(users);

  // useEffect(() => {
  //   (async () => {
  //     console.log("yo");
  //     console.log("hello: ", users);
  //     setMatches(foundMatches);
  //   })();
  // }, []);


  return (
    <div className='carousel-container'>
      <Navbar />
      {/* <h1 className='carousel-title'>{matches.length}</h1> */}
      <Splide hasTrack={ false } aria-label="..." options={{
        // width: "80vw",
        // fixedWidth: "70vw",
      }}>
        <div className="custom-wrapper">
          <SplideTrack>
          {matchedUsersInfo.map((matchedUserInfo) => (
            <SplideSlide key={matchedUserInfo.user._id} style={{display: "flex", justifyContent: "center"}}>
              <ProfileNotEditable user={matchedUserInfo.user} chatEngineUser={matchedUserInfo.chatEnginerUser}/>
              {/* <h1>hello</h1> */}
            </SplideSlide>
          ))};
          </SplideTrack>

          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev"><ArrowForwardIcon /></button>
            <button className="splide__arrow splide__arrow--next"><ArrowForwardIcon /></button>
          </div>

          <div className="splide__arrows" />

        </div>

      </Splide>

    </div>
  )
}

export default Matches;