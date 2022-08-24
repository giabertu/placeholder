import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { CloudUploadOutlined } from '@ant-design/icons'
import { Avatar } from "@chakra-ui/avatar";
import { AvatarGroup, Box, Divider, SkeletonCircle, SkeletonText, Tag, Wrap, WrapItem } from "@chakra-ui/react";
import Typewriter from 'typewriter-effect'
import uniqid from 'uniqid'

import Navbar from "../../components/Navbar";
import UserApi from "../../services/UserApi";
import { UserType } from "../../lib/models/User";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDesiredTechnologies, setDesiredCareers, setDesiredCategories } from "../../redux/slices/mentorPreferencesSlice";
import { setMenteeDesiredCategories, setMenteeDesiredTechnologies } from "../../redux/slices/menteePreferencesSlice";
import { changeDeveloperField, changeLevel, changePurpose, setExpriencedWithTechnologies } from "../../redux/slices/userInfoSlice";
import Axios from "axios";
import ChatEngineApi from "../../services/ChatEngineApi";
import Link from "next/link";
import MatchService from "../../services/MatchService";

const styleObject = { verticalAlign: 'middle', marginBottom: '3px' }

function CompleteProfile() {
  const { data: session, status } = useSession()

  const [imgSrc, setImgSrc] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [showRequired, setShowRequired] = useState(false)

  const { mentorPreferences, userInfo, menteePreferences } = useAppSelector(state => state)
  const { desiredTechnologies, desiredCareers, desiredCategories } = mentorPreferences
  const { level, developerField, purpose, experiencedWithTechnologies } = userInfo
  const isDark = useAppSelector(state => state.darkMode)


  const dispatch = useAppDispatch();
  const ref = useRef(null)

  useEffect(() => {
    if (session) {
      session.user?.image == 'undefined' || session.user?.image == null ? setImgSrc('') : setImgSrc(session.user?.image)
      session.user?.name == 'undefined' || session.user?.name == null ? setName('') : setName(session.user?.name)
    }
  }, [session])


  /*************** REPOPULATE REDUX STATE ****************/
  if (typeof window !== 'undefined') {
    const mentorPreferencesStringified = localStorage.getItem('mentorPreferences');
    const userInfoStringified = localStorage.getItem('userInfo')
    const menteePreferencesStringified = localStorage.getItem('menteePreferences')

    if (mentorPreferencesStringified && menteePreferencesStringified && userInfoStringified) {
      const mentorPreferences = JSON.parse(mentorPreferencesStringified)
      dispatch(setDesiredTechnologies(mentorPreferences.desiredTechnologies))
      dispatch(setDesiredCareers(mentorPreferences.desiredCareers))
      dispatch(setDesiredCategories(mentorPreferences.desiredCategories))
      localStorage.removeItem('mentorPreferences')

      const menteePreferences = JSON.parse(menteePreferencesStringified)
      dispatch(setMenteeDesiredCategories(menteePreferences.desiredCategories))
      dispatch(setMenteeDesiredTechnologies(menteePreferences.desiredTechnologies))

      const userInfo = JSON.parse(userInfoStringified)
      dispatch(changeLevel(userInfo.level))
      dispatch(setExpriencedWithTechnologies(userInfo.experiencedWithTechnologies))
      dispatch(changeDeveloperField(userInfo.developerField))
      dispatch(changePurpose(userInfo.purpose))
      localStorage.removeItem('userInfo');
    }
  }

  //----------------------------------------------------

  function handleUploadClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (ref.current) {
      const input = ref.current as HTMLInputElement
      input.click()
    }
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (ref.current && e.target.files?.length) {
      console.log(e.target.files[0])

      const formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('upload_preset', 'mk6cejhf')

      Axios.post('https://api.cloudinary.com/v1_1/gianni-bertuzzi/image/upload', formData).then(res => {
        console.log(res)
        if (res.data.secure_url) {
          setImgSrc(res.data.secure_url)
        }
      }).catch(error => console.log('There has been an error: ', error))
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, cb: any) {
    console.log(e.target.value)
    cb(e.target.value.trim())
    shouldUpdateProfile() && setShowRequired(false)
  }

  async function getCurrentUserState() {
    if (session && session.user && session.user.email) {
      const user: UserType = {
        username: name.toLowerCase().replace(/\s/g, '_'),
        email: session.user.email,
        first_name: name.split(' ')[0],
        last_name: name.split(' ').slice(1).join(' '),
        secret: uniqid(),
        custom_json: {
          mentors: [],
          mentees: [],
          avatar: imgSrc,
          bio,
          location,
          level,
          purpose,
          developerField,
          experiencedWithTechnologies,
          mentorPreferences,
          menteePreferences
        }
      }

      //Call MatchService.findMentors()
      user.custom_json.mentors = await MatchService.getFirstNMentors(user, 5);
      console.log('mentors id: ', user.custom_json.mentors)
      //Call MatchService.findMentees()
      user.custom_json.mentees = await MatchService.getFirstNMentees(user, 5)
      console.log('mentees id: ', user.custom_json.mentees)
      //Return user
      return user
    }
  }

  function shouldUpdateProfile() {
    return name && bio && location;
  }

  async function handleSave() {
    if (shouldUpdateProfile()) {
      const user = await getCurrentUserState();
      if (user) {
        setShowRequired(false);
        const userBeforeUpdate = await UserApi.updateUserProfile(user)
        const chatEngineResponse = await ChatEngineApi.createUser(user);
        console.log('Here is the chat engine response: ', chatEngineResponse)
        console.log("Here is the old user (before update): ", userBeforeUpdate)
      }
    } else {
      setShowRequired(true);
    }
  }

  if (status == 'authenticated') {
    return (
      <div className="profile-main-container flex-column outline align-center" >
        <Navbar progressValue={0} prevValue={0} />
        <div className="profile-title-button-container align-center">
          <Typewriter
            options={{ delay: 5, cursor: "" }}
            onInit={(typewriter) => {
              typewriter
                .typeString("<h1>Amazing! Review your profile</h1>").start()
            }} />
          <div className="profile-container flex-column align-center justify-center box-shadow">
            <div className="profile-section flex-row gap-2r align-center">
              <Avatar size='xl' src={imgSrc} />
              <button className="button-style" onClick={(e) => handleUploadClick(e)}>
                <input type='file'
                  className="input-file"
                  hidden={true} ref={ref}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadImage(e)}></input>
                <CloudUploadOutlined style={styleObject} /> Edit
              </button>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label" >Name </label>
              <input
                type='text' defaultValue={name}
                className={`${!name && showRequired ? 'profile-input-invalid' : 'profile-input'} ${isDark ? 'profile-input-dark' : 'profile-input-light'}`} required={true} spellCheck={false} onChange={(e) => handleInputChange(e, setName)}></input>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Bio </label>
              <textarea
                className={`${!bio && showRequired ? 'profile-input profile-textarea invalid' : 'profile-input profile-textarea'} ${isDark ? 'profile-input-dark' : 'profile-input-light'}`}
                rows={4.5} cols={22} required={true} placeholder={'What should people know about you?'}
                onChange={(e) => handleInputChange(e, setBio)}></textarea>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Location </label>
              <input
                type='text' className={`${!location && showRequired ? 'profile-input invalid' : 'profile-input'} ${isDark ? 'profile-input-dark' : 'profile-input-light'}`}
                required={true} placeholder='' onChange={(e) => handleInputChange(e, setLocation)}></input>
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
                        return <Tag>{technology}</Tag>
                      }
                      return <Avatar src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
                    })}
                  </AvatarGroup>
                </div>
              </>
            }

            {desiredCategories.length > 0 &&
              <>
                <Divider />
                <div className="profile-section flex-row gap-2r align-center">
                  <label className="profile-input-label">Mentor Topics</label>
                  <Wrap spacing={2} justify={'flex-end'}>
                    {desiredCategories.map((category) =>
                      <WrapItem>
                        <Tag key={category} size='lg' colorScheme='gray' borderRadius='full'>
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
                      <WrapItem>
                        <Tag key={category} size='lg' colorScheme='gray' borderRadius='full' textAlign={'center'} width={'fit-content'}>
                          {category[0].toUpperCase() + category.substring(1)}
                        </Tag>
                      </WrapItem>
                    )}
                  </Wrap>
                </div>
              </>
            }
            {desiredTechnologies.length > 0 &&
              <>
                <Divider />
                <div className="profile-section flex-row gap-2r align-center">
                  <label className="profile-input-label">Eager to learn </label>
                  <div>
                    <AvatarGroup size='md' max={4} marginRight='2rem' >
                      {desiredTechnologies.map(technology => {
                        if (typeof technology == 'string') {
                          return <Tag>{technology}</Tag>
                        }
                        return <Avatar src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
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
                        if (technology.imageSrc === '') {
                          return <Tag>{technology.name}</Tag>
                        }
                        return <Avatar src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
                      })}
                    </AvatarGroup>
                  </div>
                </div>
              </>
            }
            {desiredCareers.length > 0 &&
              <>
                <Divider />
                <div className="profile-section flex-row gap-2r align-center">
                  <label className="profile-input-label">Career interests </label>
                  <Wrap spacing={2} justify={'flex-end'}>
                    {desiredCareers.map((career) =>
                      <WrapItem>
                        <Tag key={career} size='md' colorScheme='gray' borderRadius='full'>
                          {career[0].toUpperCase() + career.substring(1)}
                        </Tag>
                      </WrapItem>
                    )}
                  </Wrap>
                </div>
              </>
            }
          </div>
          <Link href={'/quiz_init/finding_matches'}>
            <button className={`${"profile-find-matches"} ${isDark ? 'button-style-dark' : 'button-style'}`} onClick={handleSave} >&gt; Save and Find matches</button>
          </Link>
        </div>
      </div >
    )
  } else if (status === 'unauthenticated') {
    return (
      <div className="container flex-column align-center justify-center">
        <h1>You are not authorized here..</h1>
      </div>)
  } else {
    return (
      <div className="container flex-column outline align-center" >
        <Navbar progressValue={0} prevValue={0} />
        <div className="flex-column gap-2r m-top-auto m-bottom-auto">
          <div className="profile-container flex-column align-center justify-center">
            <Box padding='6' boxShadow='lg' bg='white' width={'25rem'} height={'25rem'}>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={12} spacing='4' />
            </Box>
          </div>
        </div>
      </div>
    )
  }
}

export default CompleteProfile;