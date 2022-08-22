import { BuiltInProviderType } from "next-auth/providers"
import { getProviders, LiteralUnion, ClientSafeProvider, signIn } from "next-auth/react"
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from '../../styles/which_technologies.module.css'
import Typewriter from 'typewriter-effect';

import {GithubFilled, GoogleOutlined, MailOutlined} from '@ant-design/icons'

import { useAppSelector } from "../../redux/hooks";
import { Input, InputGroup, useColorMode } from "@chakra-ui/react";

const styleObject = { verticalAlign: 'middle', marginBottom: '3px' }


export default function CreateProfile({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> }) {

  console.log(providers)
  console.log(providers.github)
  const [value, setValue] = useState('');
  const { mentorPreferences, userInfo, menteePreferences } = useAppSelector(state => state)
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';


  localStorage.setItem('mentorPreferences', JSON.stringify(mentorPreferences));
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
  localStorage.setItem('menteePreferences', JSON.stringify(menteePreferences))

  return (
    <div className="container flex-column outline align-center">
      <Navbar progressValue={100} />

      <div className="flex-column gap-2r m-top-auto m-bottom-auto">
        <Typewriter
          options={{
            delay: 5,
            cursor: ""
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("<h1>One last step, create a profile</h1>").start()
          }} />
        <div className="providers-container flex-column align-center justify-center box-shadow">
          {Object.values(providers).map((provider) => {
            if (provider.name !== 'Email') {
              return <div key={provider.name}>
                <button
                  className="button-style flex-row align-center"
                  onClick={() => signIn(provider.id, { callbackUrl: '/quiz_init/complete_profile' })}>
                  <span>&gt; Sign in with </span>&nbsp;{provider.name == 'GitHub' ? <GithubFilled style={styleObject}/> : <GoogleOutlined style={styleObject} />}&nbsp;{provider.name}
                </button>
              </div>
            }
            return <div key={provider.name}>
              <h2 className={isDark ? styles.horizontalRuleDarkMode : styles.horizontalRule}><span className={isDark ? styles.horizontalRuleTextDarkMode : styles.horizontalRuleText}>OR</span></h2>
              <div className="flex-column ">
                {/* <input className='input-signin' placeholder="Type in email.." value={value} autoFocus={true} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.value)
                  setValue(e.target.value)
                }} /> */}
                <InputGroup>
                  <Input 
                    placeholder='Type in email...'
                    color={isDark ? 'gray.300' : 'gray.500'}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log(e.target.value)
                      setValue(e.target.value)
                    }} />
                </InputGroup>
                <button
                  className="button-style"
                  onClick={() => {
                    console.log('Button onClick', value);
                    signIn('email', { redirect: false, email: value, callbackUrl: '/quiz_init/complete_profile' })
                  }}>&gt; Sign in with <MailOutlined style={styleObject} />&nbsp;{provider.name}</button>
              </div>
            </div>
          }
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(/* context */) {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}