import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from "next-auth/providers/email";
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
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          }
        },
        from: process.env.EMAIL_FROM
      })
    ],
    adapter: MongoDBAdapter(clientPromise),
    pages: {
      signIn: '/auth/signin'
    },
  })