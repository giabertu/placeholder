import { BuiltInProviderType } from "next-auth/providers"
import { getProviders, LiteralUnion, ClientSafeProvider, signIn } from "next-auth/react"
import { useState } from "react";
import Navbar from "../../components/Navbar";
import styles from '../../styles/which_technologies.module.css'
import Typewriter from 'typewriter-effect';

import { LogoGithub, LogoGoogle, Mail } from 'react-ionicons'
import uniqid from "uniqid";

const styleObject = { verticalAlign: 'middle', marginBottom: '3px' }


export default function CreateProfile({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> }) {

  console.log(providers)
  console.log(providers.github)
  const [value, setValue] = useState('');

  return (
    <div className="container flex-column outline align-center">
      <Navbar />

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
                  <span>&gt; Sign in with </span>&nbsp;{provider.name == 'GitHub' ? <LogoGithub style={styleObject} /> : <LogoGoogle style={styleObject} />}&nbsp;{provider.name}
                </button>
              </div>
            } else {
              return <div key={uniqid()}>
                <h2 className={styles.horizontalRule}><span className={styles.horizontalRuleText}>OR</span></h2>
                <div className="flex-column ">
                  <input className='input-signin' placeholder="Type in email.." onChange={(e) => setValue(e.currentTarget.value)}></input>
                  <button
                    className="button-style"
                    onClick={() => {
                      console.log(value);
                      signIn('email', { redirect: false, email: value, callbackUrl: '/quiz_init/complete_profile' })
                    }}>&gt; Sign in with <Mail style={styleObject} />&nbsp;{provider.name}</button>
                </div>
              </div>
            }
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