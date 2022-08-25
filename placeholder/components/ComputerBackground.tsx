import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import styles from '../styles/Home.module.css'
import { RetroWindows } from "./models/RetroWindows";

export default function ComputerBackground() {

  return (
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
  )
}