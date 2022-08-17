import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

export default NextAuth({
    providers: [
      GitHubProvider({
        //@ts-ignore
        clientId: process.env.GITHUB_ID,
        //@ts-ignore
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        //@ts-ignore
        clientId: process.env.GOOGLE_ID,
        //@ts-ignore
        clientSecret: process.env.GOOGLE_SECRET
      })
    ],
    adapter: MongoDBAdapter(clientPromise),
    pages: {
      signIn: '/auth/signin'
    },
  })