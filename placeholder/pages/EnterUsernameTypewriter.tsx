import React from 'react'
import Typewriter from 'typewriter-effect';

export default function EnterUsernameTypewriter() {
  return (
    <Typewriter
        options={{
          delay: 5,
          cursor: ""
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("enter username")
            .start();
        }}
      />
  )
}
