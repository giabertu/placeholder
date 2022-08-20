import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import Typewriter from 'typewriter-effect'
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { CloudUploadOutline } from 'react-ionicons'
import { AvatarGroup, Box, Divider, HStack, SkeletonCircle, SkeletonText, Tag, TagLabel, Wrap, WrapItem } from "@chakra-ui/react";
import UserApi from "../../services/UserApi";
import { UserType } from "../../lib/models/User";
import { logos } from '../../utils/logos'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeDesiredCareers, changeDesiredTechnologies, changeDesiredCategory, setDesiredTechnologies, setDesiredCareers } from "../../redux/slices/mentorPreferencesSlice";

const styleObject = { verticalAlign: 'middle', marginBottom: '3px' }

function CompleteProfile() {
  const { data: session, status } = useSession()

  const [imgSrc, setImgSrc] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [showRequired, setShowRequired] = useState(false)

  const desiredTechnologies = useAppSelector(state => state.mentorPreferences.desiredTechnologies)
  const desiredCareers = useAppSelector(state => state.mentorPreferences.desiredCareers)

  const dispatch = useAppDispatch();
  const ref = useRef(null)

  console.log('Desired careers: ', desiredCareers)
  console.log('Desired tech: ', desiredTechnologies)

  useEffect(() => {
    if (session) {
      session.user?.image == 'undefined' || session.user?.image == null ? setImgSrc('') : setImgSrc(session.user?.image)
      session.user?.name == 'undefined' || session.user?.name == null ? setName('') : setName(session.user?.name)
    }
  }, [session])


  /*************** REPOPULATE REDUX STATE ****************/
  if (typeof window !== 'undefined') {
    const res = localStorage.getItem('mentorPreferences');
    if (res) {
      const mentorPreferences = JSON.parse(res)
      console.log('Here are the mentor preferences from local storage', mentorPreferences)
      // desiredCareers.forEach(career => dispatch(changeDesiredCareers(career)))
      dispatch(setDesiredTechnologies(mentorPreferences.desiredTechnologies))
      dispatch(setDesiredCareers(mentorPreferences.desiredCareers))
      // dispatch(changeDesiredCategory(JSON.stringify(mentorPreferences.desiredCategories)))
      localStorage.removeItem('mentorPreferences')
    }
  }

  function handleUploadClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (ref.current) {
      const input = ref.current as HTMLInputElement
      input.click()
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, cb: any) {
    console.log(e.target.value)
    cb(e.target.value.trim())
    shouldUpdateProfile() && setShowRequired(false)
  }

  function getCurrentUserState() {
    if (session && session.user && session.user.email) {
      const user: UserType = {
        name,
        email: session.user.email,
        avatar: imgSrc,
        bio,
        location
      }
      return user
    }
  }

  function shouldUpdateProfile() {
    return name && bio && location;
  }
  async function handleSave() {
    const user = getCurrentUserState()
    if (user && shouldUpdateProfile()) {
      setShowRequired(false);
      const result = await UserApi.updateUserProfile(user)
      console.log("Here is the old user (before update): ", result)
    } else {
      setShowRequired(true);
    }
  }

  if (status == 'authenticated') {
    return (
      <div className="profile-main-container flex-column outline align-center" >
        <Navbar progressValue={0} />
        <div className="profile-title-button-container align-center">
          <Typewriter
            options={{ delay: 5, cursor: "" }}
            onInit={(typewriter) => {
              typewriter
                .typeString("<h1>Amazing! Review your profile</h1>").start()
            }} />
          <div className="profile-container flex-column align-center justify-center box-shadow">
            <div className="profile-section flex-row gap-2r align-center">
              <Avatar size='xl' name='Dan Abrahmov' src={imgSrc} />
              <button className="button-style" onClick={(e) => handleUploadClick(e)}>
                <input type='file'
                  className="input-file"
                  hidden={true} ref={ref}
                  onChange={(e) => {
                    if (ref.current) {
                      const input = ref.current as HTMLInputElement
                      console.log(input.value)
                      setImgSrc(input.value)
                    }
                  }}></input>
                <CloudUploadOutline style={styleObject} /> Edit
              </button>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label" >Name </label>
              <input
                type='text' defaultValue={name}
                className={!name && showRequired ? 'profile-input invalid' : 'profile-input'} required={true} spellCheck={false} onChange={(e) => handleInputChange(e, setName)}></input>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Bio </label>
              <textarea
                className={!bio && showRequired ? 'profile-input profile-textarea invalid' : 'profile-input profile-textarea'}
                rows={4.5} cols={22} required={true} placeholder={'What should people know about you?'}
                onChange={(e) => handleInputChange(e, setBio)}></textarea>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Location </label>
              <input
                type='text' className={!location && showRequired ? 'profile-input invalid' : 'profile-input'}
                required={true} placeholder='' onChange={(e) => handleInputChange(e, setLocation)}></input>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Eager to learn </label>
              <div>
                <AvatarGroup size='md' max={4} >
                  {desiredTechnologies.map(technology => {
                    if (typeof technology == 'string') {
                      return <Tag>{technology}</Tag>
                    }
                    return <Avatar src={technology.imageSrc} bg='transparent' border='none' borderRadius='none' scale={0.7} minWidth='fit-content' />
                  })}
                </AvatarGroup>
              </div>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Career interests </label>
              {/* <label className="profile-input-label">{['Front End, Back End, Mobile']}</label> */}
              <Wrap spacing={2} justify={'center'}>
                {desiredCareers.map((career) =>
                  <WrapItem>
                    <Tag key={career} size='md' colorScheme='gray' borderRadius='full'>
                      {career[0].toUpperCase() + career.substring(1)}
                    </Tag>
                  </WrapItem>
                )}
              </Wrap>
            </div>

          </div>

          <button className="button-style profile-find-matches" onClick={handleSave} >&gt; Save and Find matches</button>
        </div>
      </div >
    )
  } else if (status === 'unauthenticated') {
    return <div>You are not authorized here..</div>
  } else {
    return (
      <div className="container flex-column outline align-center" >
        <Navbar progressValue={0} />
        <div className="flex-column gap-2r m-top-auto m-bottom-auto">
          <div className="profile-container flex-column align-center justify-center">
            <Box padding='6' boxShadow='lg' bg='white' width={'25rem'} height={'25rem'}>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={8} spacing='4' />
            </Box>
          </div>
        </div>
      </div>
    )
  }
}

export default CompleteProfile;