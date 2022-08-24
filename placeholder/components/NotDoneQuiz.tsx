import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { RetroWindows } from "./models/RetroWindows"
import styles from '../styles/Home.module.css'
import Typewriter from 'typewriter-effect'
import Link from "next/link"

/************ THIS COMPONENT WILL BE RENDERED IF A USER SIGNS IN FROM HOMEPAGE BUT HAS NEVER DONE QUIZ **********/

export default function NotDoneQuiz() {
  return (
    <div className="container flex-column align-center justify-center">
      <div className="flex-column align-center title-buttons-container box-shadow">
        <Typewriter
          options={{ delay: 5, cursor: "" }}
          onInit={(typewriter) => {
            typewriter
              .typeString("<h1>Uh oh, it looks like you have not done the quiz</h1>").start()
          }} />
        <div className="flex-row gap-2r fade-in">
          <div className="button-container flex-row justify-center ">
            <Link href={'/'}>
              <button className="button-style back-button">Homepage</button>
            </Link>
          </div>
          <div className="button-container flex-row justify-center ">
            <Link href={'/quiz_init/experience_level'}>
              <button className="button-style">Start Quiz</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.canvasContainer + ' outline'}>
        <Canvas >
          <OrbitControls target={[-1, 0, 4]} enableZoom={false} autoRotate={true} enablePan={false} autoRotateSpeed={1.5} enableDamping={true} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
          <ambientLight intensity={0.5} />
          <directionalLight
            color={"white"}
            intensity={0.5}
            position={[-20, 100, 50]}
          />
          <Suspense>
            <RetroWindows scale={[7, 7, 7]} position={[0, 0, 2]} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )


}