import { Divider, Wrap, WrapItem, Tag, AvatarGroup, AvatarBadge, Button } from "@chakra-ui/react"
import { useState } from "react"
import { Avatar } from '@chakra-ui/react'
import { SendSharp } from "react-ionicons"

import { ChatEngineUser, UserType } from "../lib/models/User"
import { useAppSelector } from "../redux/hooks"
import { Router, useRouter } from "next/router"



const styleObject = { verticalAlign: 'middle', marginBottom: '3px' }

function ProfileNotEditable({ user, chatEngineUser }: { user: UserType, chatEngineUser: ChatEngineUser }) {

  const [imgSrc, name] = [user.custom_json.avatar, user.first_name + " " + user.last_name]
  const { bio, location } = user.custom_json

  const isDark = useAppSelector(state => state.darkMode)
  const router = useRouter();

  const { mentorPreferences, menteePreferences, developerField, experiencedWithTechnologies } = user.custom_json
  console.log('ChatEngine User', chatEngineUser)


  return (
    <div className="profile-title-button-container align-center">
      <div className="profile-container flex-column align-center justify-center box-shadow">
        <div className="profile-section flex-row gap-2r align-center">
          <Avatar size='xl' src={imgSrc}><AvatarBadge boxSize='0.4em' border='none' right='0.25em' bottom='0.2em' outline={'solid 1px white'} bg={chatEngineUser.is_online ? 'green.500' : 'gray.500'} /></Avatar>
          <button className={isDark ? "button-style-dark" : 'button-style'}> <SendSharp style={styleObject} color={isDark ? 'white' : 'black'} /> Message</button>
        </div>
        <Divider />
        <div className="profile-section flex-row gap-2r align-center">
          <label className="profile-input-label" >Name </label>
          <p className="profile-p">{name}</p>
        </div>
        <Divider />
        <div className="profile-section flex-row gap-2r align-center">
          <label className="profile-input-label">Bio </label>
          <p className="profile-p profile-bio">{bio}</p>
        </div>
        <Divider />
        <div className="profile-section flex-row gap-2r align-center">
          <label className="profile-input-label">Location </label>
          <p className="profile-p">{location}</p>
        </div>
        {developerField &&
          <>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Developer Expertise</label>
              <Wrap spacing={2} justify={'flex-end'}>
                <Tag key={developerField} size='md' colorScheme='gray' borderRadius='full'>
                  {developerField[0].toUpperCase() + developerField.substring(1)}
                </Tag>
              </Wrap>
            </div>
          </>
        }
        {experiencedWithTechnologies.length > 0 &&
          <>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Experienced in</label>
              <AvatarGroup size='md' max={4} marginRight='2rem' >
                {experiencedWithTechnologies.map(technology => {
                  if (typeof technology == 'string') {
                    return <Tag key={technology}>{technology}</Tag>
                  }
                  return <Avatar key={technology.name} src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
                })}
              </AvatarGroup>
            </div>
          </>
        }
        {mentorPreferences.desiredCategories.length > 0 &&
          <>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Mentor Topics</label>
              <Wrap spacing={2} justify={'flex-end'}>
                {mentorPreferences.desiredCategories.map((category) =>
                  <WrapItem key={category}>
                    <Tag size='lg' colorScheme='gray' borderRadius='full'>
                      {category[0].toUpperCase() + category.substring(1)}
                    </Tag>
                  </WrapItem>
                )}
              </Wrap>
            </div>
          </>
        }
        {menteePreferences.desiredCategories.length > 0 &&
          <>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Mentee Topics</label>
              <Wrap spacing={2} justify={'flex-end'}>
                {menteePreferences.desiredCategories.map((category) =>
                  <WrapItem key={category}>
                    <Tag size='lg' colorScheme='gray' borderRadius='full'>
                      {category[0].toUpperCase() + category.substring(1)}
                    </Tag>
                  </WrapItem>
                )}
              </Wrap>
            </div>
          </>
        }
        {mentorPreferences.desiredTechnologies.length > 0 &&
          <>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Eager to learn </label>
              <div>
                <AvatarGroup size='md' max={4} marginRight='2rem' >
                  {mentorPreferences.desiredTechnologies.map(technology => {
                    console.log(technology)
                    if (typeof technology == 'string') {
                      return <Tag key={technology}>{technology}</Tag>
                    } else if (technology.imageSrc === '') {
                      return <Tag key={technology.name}>{technology.name}</Tag>
                    }
                    return <Avatar key={technology.name} src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
                  })}
                </AvatarGroup>
              </div>
            </div>
          </>
        }
        {menteePreferences.desiredTechnologies.length > 0 &&
          <>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Eager to teach </label>
              <div>
                <AvatarGroup size='md' max={4} marginRight='2rem' >
                  {menteePreferences.desiredTechnologies.map(technology => {
                    if (typeof technology == 'string') {
                      return <Tag key={technology}>{technology}</Tag>
                    }
                    return <Avatar key={technology.name} src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
                  })}
                </AvatarGroup>
              </div>
            </div>
          </>
        }
        {mentorPreferences.desiredCareers.length > 0 &&
          <>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Career interests </label>
              <Wrap spacing={2} justify={'flex-end'}>
                {mentorPreferences.desiredCareers.map((career) =>
                  <WrapItem key={career}>
                    <Tag size='md' colorScheme='gray' borderRadius='full'>
                      {career[0].toUpperCase() + career.substring(1)}
                    </Tag>
                  </WrapItem>
                )}
              </Wrap>
            </div>
          </>
        }
      </div>
      <Button onClick={() => router.back()}>Back</Button>
    </div>
  )


}



export default ProfileNotEditable;