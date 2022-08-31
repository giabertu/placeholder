import { Divider, Wrap, WrapItem, Tag, AvatarGroup, AvatarBadge } from "@chakra-ui/react"
import Axios from "axios"
import { useRef, useState } from "react"
import { Avatar } from '@chakra-ui/react'
import { CloudUploadOutline } from "react-ionicons"
import uniqid from "uniqid"
import { UserType } from "../lib/models/User"
import UserApi from "../services/UserApi"
import Typewriter from 'typewriter-effect'
import { useAppSelector } from "../redux/hooks"


const styleObject = { verticalAlign: 'middle', marginBottom: '3px' }

function ProfileEditable({ user }: { user: UserType }) {


  function handleUploadClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (ref.current) {
      const input = ref.current as HTMLInputElement
      input.click()
    }
  }

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
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

  function getCurrentUserState() {
    const newUser: UserType = {
      username: name.toLowerCase().replace(/\s/g, '_'),
      email: user.email,
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' '),
      secret: uniqid(),
      custom_json: {
        mentors: user.custom_json.mentors,
        mentees: user.custom_json.mentees,
        avatar: imgSrc,
        bio,
        location,
        level: user.custom_json.level,
        purpose: user.custom_json.purpose,
        developerField: user.custom_json.developerField,
        experiencedWithTechnologies: user.custom_json.experiencedWithTechnologies,
        mentorPreferences,
        menteePreferences
      }
    }
    return newUser
  }

  function shouldUpdateProfile() {
    return name && bio && location;
  }

  async function handleSave() {
    const user = getCurrentUserState()
    if (user && shouldUpdateProfile()) {
      setShowRequired(false);
      const userBeforeUpdate = await UserApi.updateUserProfile(user)
      //Update user in chatEngine ...
      // const chatEngineResponse = await ChatEngineApi.createUser(user);
      // console.log('Here is the chat engine response: ', chatEngineResponse)
      console.log("Here is the old user (before update): ", userBeforeUpdate)
    } else {
      setShowRequired(true);
    }
  }



  const [imgSrc, setImgSrc] = useState(user.custom_json.avatar)
  const [name, setName] = useState(user.first_name + " " + user.last_name)
  const [bio, setBio] = useState(user.custom_json.bio)
  const [location, setLocation] = useState(user.custom_json.location)
  const [showRequired, setShowRequired] = useState(false)


  const { mentorPreferences, menteePreferences, developerField, experiencedWithTechnologies } = user.custom_json
  const isDark = useAppSelector(state => state.darkMode)

  const ref = useRef(null)


  return (
    <div className="profile-title-button-container align-center">
      <div className={isDark ? "dashboard-profile-container-dark flex-column align-center justify-center box-shadow" : "dashboard-profile-container flex-column align-center justify-center box-shadow"}>
        <div className="profile-section flex-row gap-2r align-center">
          <Avatar size='xl' src={imgSrc}><AvatarBadge boxSize='0.4em' border='none' right='0.25em' bottom='0.2em' outline={'solid 1px white'} bg={'green.500'} /></Avatar>
          <button className={isDark ? "button-style-dark" : 'button-style'} onClick={(e) => handleUploadClick(e)}>
            <input type='file'
              className="input-file"
              hidden={true} ref={ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadImage(e)}></input>
            <CloudUploadOutline style={styleObject} color={isDark ? 'white' : 'black'} /> Edit
          </button>
        </div>
        <Divider />
        <div className="profile-section flex-row gap-2r align-center">
          <label className="profile-input-label" >Name </label>
          <input
            type='text' defaultValue={name}
            className={`${!name && showRequired ? 'profile-input-invalid' : 'profile-input'} ${isDark ? 'dashboard-profile-input-dark' : 'profile-input-light'}`} required={true} spellCheck={false} onChange={(e) => handleInputChange(e, setName)}></input>
        </div>
        <Divider />
        <div className="profile-section flex-row gap-2r align-center">
          <label className="profile-input-label">Bio </label>
          <textarea
            className={`${!bio && showRequired ? 'profile-input profile-textarea invalid' : 'profile-input profile-textarea'} ${isDark ? 'dashboard-profile-input-dark' : 'profile-input-light'}`}
            rows={4.5} cols={22} required={true} placeholder={'What should people know about you?'} defaultValue={bio}
            onChange={(e) => handleInputChange(e, setBio)}></textarea>
        </div>
        <Divider />
        <div className="profile-section flex-row gap-2r align-center">
          <label className="profile-input-label">Location </label>
          <input
            type='text' className={`${!location && showRequired ? 'profile-input invalid' : 'profile-input'} ${isDark ? 'dashboard-profile-input-dark' : 'profile-input-light'}`}
            required={true} placeholder='' defaultValue={location} onChange={(e) => handleInputChange(e, setLocation)}></input>
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
                    <Tag key={category} size='lg' colorScheme='gray' borderRadius='full'>
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
      <button className={isDark ? "button-style-dark profile-find-matches" : "button-style profile-find-matches"} onClick={handleSave} >&gt; Save Information</button>
    </div>
  )


}



export default ProfileEditable;