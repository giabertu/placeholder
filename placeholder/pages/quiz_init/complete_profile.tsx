import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import Typewriter from 'typewriter-effect'
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { CloudUploadOutline } from 'react-ionicons'
import { Box, Divider, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const styleObject = { verticalAlign: 'middle', marginBottom: '3px' }

function ReviewProfile() {
  const { data: session, status } = useSession()

  const [imgSrc, setImgSrc] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (session) {
      session.user?.image == 'undefined' || session.user?.image == null ? setImgSrc('') : setImgSrc(session.user?.image)
    }
  }, [session])

  function handleUploadClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (ref.current) {
      const input = ref.current as HTMLInputElement
      input.click()
    }
  }

  if (status == 'authenticated') {
    return (
      <div className="container flex-column outline align-center" >
        <Navbar />
        <div className="flex-column gap-2r m-top-auto m-bottom-auto">
          <Typewriter
            options={{
              delay: 5,
              cursor: ""
            }}
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
                    console.log('ciao')
                    if (ref.current) {
                      const input = ref.current as HTMLInputElement
                      console.log(input.value)
                      setImgSrc(input.value)
                    }
                  }}></input> <CloudUploadOutline style={styleObject} /> Edit
              </button>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label" >Name </label>
              <input type='text' defaultValue={session.user?.name ? session.user.name : ''} className='profile-input' required={true} spellCheck={false}></input>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Bio </label>
              <textarea className="profile-input profile-textarea" rows={4.5} cols={22} required={true} placeholder={'What should people know about you?'}></textarea>
            </div>
            <Divider />
            <div className="profile-section flex-row gap-2r align-center">
              <label className="profile-input-label">Location </label>
              <input type='text' className="profile-input" required={true} placeholder=''></input>
            </div>
          </div>
        </div>
      </div >
    )
  } else if (status === 'unauthenticated') {
    return <div>You are not authorized here..</div>
  } else {
    return (
      <div className="container flex-column outline align-center" >
        <Navbar />
        <div className="flex-column gap-2r m-top-auto m-bottom-auto">
          {/* <Typewriter
            options={{
              delay: 5,
              cursor: ""
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("<h1>Amazing! Review your profile</h1>").start()
            }} /> */}
          <div className="profile-container flex-column align-center justify-center">
            {/* <h1>Loading... Hold tight.</h1> */}
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


export default ReviewProfile;