import { BuiltInProviderType } from "next-auth/providers"
import { getProviders, /* getCsrfToken */ LiteralUnion, ClientSafeProvider, signIn } from "next-auth/react"
import { useState } from "react";

export default function SignIn({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> }) {

  console.log(providers)
  console.log(providers.github)
  const [value, setValue] = useState('');


  return (
    <div className="container flex-column outline justify-center align-center">
      <div className="providers-container ">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="button-style" onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              &gt; Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
      <input placeholder="enter email" onChange={(e) => setValue(e.currentTarget.value)}></input>
      <button onClick={() => {
        console.log(value);
        signIn('email', { email: value, callbackUrl: '/' })
      }}>submit</button>
    </div>
  )
}



export async function getServerSideProps(/* context */) {
  const providers = await getProviders()
  // const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      // csrfToken
    },
  }
}