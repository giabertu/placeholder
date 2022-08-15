import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Page1 from './quiz_init/page1'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>my app</h1>
    </div>
  )
}

export default Home
