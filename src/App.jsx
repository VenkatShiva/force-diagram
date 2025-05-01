import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import ForcePoint from "./ForcePoint";
import "./App.css";
import useForce from "./store/store";

function App() {
  const [index, setIndex] = useState(0);
  const controlsRef = useRef();
  const { data, changeForce } = useForce();
  const currentSet = data[index];
  const forcePoints = currentSet?.points || [];
  const goNext = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };
  const goPrev = () => {
    setIndex((prev) => {
      if (prev > 0) return prev - 1;
      return data.length - 1;
    });
  };
  return (
    <>
      <div className="header">
        <button onClick={goPrev}>Previous</button>
        <p>{currentSet.name}</p>
        <button onClick={goNext}>Next</button>
      </div>
      <div className="tv-frame">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls
            ref={controlsRef}
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
        <button
          className="reset-btn"
          onClick={() => controlsRef.current?.reset()}
        >
          Reset
        </button>
      </div>
      <h2 className="force-inputs">Force Points</h2>
      {forcePoints.map((point, ind) => (
        <div key={`${index}-${ind}`}>
          Name: {point.name} <br />
          Fx :
          <input
            onChange={(e) => changeForce(index, ind, "Fx", e.target.value)}
            name="Fx"
            placeholder="Enter"
            type="number"
            value={point.Fx}
          />
          Fy :
          <input
            onChange={(e) => changeForce(index, ind, "Fy", e.target.value)}
            name="Fy"
            placeholder="Enter"
            type="number"
            value={point.Fy}
          />
          Fz :
          <input
            onChange={(e) => changeForce(index, ind, "Fz", e.target.value)}
            name="Fz"
            placeholder="Enter"
            type="number"
            value={point.Fz}
          />
        </div>
      ))}
    </>
  );
}

export default App;
