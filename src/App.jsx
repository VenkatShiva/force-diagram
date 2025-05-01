import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import ForcePoint from "./ForcePoint";
import "./App.css";

const FORCE_POINTS = [
  { name: "A", x: -2, y: 2.4, z: 0, Fx: 1, Fy: 2, Fz: 0 },
  { name: "B", x: 0, y: 2.4, z: 0, Fx: 0, Fy: 1, Fz: 0 },
  { name: "C", x: 2, y: 2.4, z: 0, Fx: 2, Fy: 0, Fz: 0 },
  { name: "D", x: -2, y: -2.4, z: 0, Fx: 2, Fy: 0, Fz: 0 },
  { name: "E", x: 0, y: -2.4, z: 0, Fx: 2, Fy: 0, Fz: 0 },
  { name: "F", x: 2, y: -2.4, z: 0, Fx: 2, Fy: 0, Fz: 0 },
  { name: "A`", x: -2, y: 2.4, z: -5, Fx: 1, Fy: 2, Fz: 0 },
  { name: "B`", x: 0, y: 2.4, z: -5, Fx: 0, Fy: 1, Fz: 0 },
  { name: "C`", x: 2, y: 2.4, z: -5, Fx: 2, Fy: 0, Fz: 0 },
  { name: "D`", x: -2, y: -2.4, z: -5, Fx: 2, Fy: 0, Fz: 0 },
  { name: "E`", x: 0, y: -2.4, z: -5, Fx: 2, Fy: 0, Fz: 0 },
  { name: "F`", x: 2, y: -2.4, z: -5, Fx: 2, Fy: 0, Fz: 0 },
];

function App() {
  const [forcePoints, setForcePoints] = useState(FORCE_POINTS);
  return (
    <div className="tv-frame">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls
          target={[0, 0, 0]}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          enableZoom={true}
          enablePan={true}
          maxDistance={20}
          minDistance={2}
        />

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {forcePoints.map((point, idx) => (
          <ForcePoint key={idx} {...point} />
        ))}

        {/* <Line
          points={[
            [-2, 2.4, 0],
            [-2, -2.4, 0],
          ]}
          color="purple"
          lineWidth={2}
        /> */}
      </Canvas>
    </div>
  );
}

export default App;
