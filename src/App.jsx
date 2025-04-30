import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ForcePoint from "./ForcePoint";
import "./App.css";

const forcePoints = [
  { name: "A", x: -2, y: 2.4, z: 0, Fx: 1, Fy: 2, Fz: 0 },
  { name: "B", x: 0, y: 2.4, z: 0, Fx: 0, Fy: 1, Fz: 0 },
  { name: "C", x: 2, y: 2.4, z: 0, Fx: 2, Fy: 0, Fz: 0 },
  { name: "D", x: -2, y: -2.4, z: 0, Fx: 2, Fy: 0, Fz: 0 },
  { name: "E", x: 0, y: -2.4, z: 0, Fx: 2, Fy: 0, Fz: 0 },
  { name: "F", x: 2, y: -2.4, z: 0, Fx: 2, Fy: 0, Fz: 0 },
  { name: "A`", x: -2, y: 2.4, z: -2, Fx: 1, Fy: 2, Fz: 0 },
  { name: "B`", x: 0, y: 2.4, z: -2, Fx: 0, Fy: 1, Fz: 0 },
  { name: "C`", x: 2, y: 2.4, z: -2, Fx: 2, Fy: 0, Fz: 0 },
  { name: "D`", x: -2, y: -2.4, z: -2, Fx: 2, Fy: 0, Fz: 0 },
  { name: "E`", x: 0, y: -2.4, z: -2, Fx: 2, Fy: 0, Fz: 0 },
  { name: "F`", x: 2, y: -2.4, z: -2, Fx: 2, Fy: 0, Fz: 0 },
];

function App() {
  return (
    <div className="tv-frame">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.1}
        />

        {/* Origin Marker (Small Dot) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} /> {/* Very small dot */}
          <meshStandardMaterial color="black" /> {/* Color the dot */}
        </mesh>

        {forcePoints.map((point, idx) => (
          <ForcePoint key={idx} {...point} />
        ))}
      </Canvas>
    </div>
  );
}

export default App;
