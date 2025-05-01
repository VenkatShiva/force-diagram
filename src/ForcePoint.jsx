import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // ✅ Correct import

function ForcePoint({ x, y, z, Fx = 0, Fy = 0, Fz = 0, name = "" }) {
  const currentVec = useRef(new THREE.Vector3(Fx, Fy, Fz));
  const targetVec = useRef(new THREE.Vector3(Fx, Fy, Fz));

  const [magnitude, setMagnitude] = useState(currentVec.current.length());
  const [normalizedVec, setNormalizedVec] = useState(
    currentVec.current.clone().normalize()
  );

  // Update target vector when props change
  useEffect(() => {
    targetVec.current.set(Fx, Fy, Fz);
  }, [Fx, Fy, Fz]);

  // Animate the vector smoothly on each frame
  useFrame(() => {
    currentVec.current.lerp(targetVec.current, 0.2); // interpolation speed
    const mag = currentVec.current.length();
    const norm =
      mag > 0 ? currentVec.current.clone().normalize() : new THREE.Vector3();

    setMagnitude(mag);
    setNormalizedVec(norm);
  });

  const arrowLength = magnitude * 0.1;
  const labelPosition = normalizedVec.clone().multiplyScalar(arrowLength * 0.9);
  const angleRadians = Math.atan2(currentVec.current.y, currentVec.current.x);
  const angleDegrees = THREE.MathUtils.radToDeg(angleRadians).toFixed(1);

  return (
    <group position={[x, y, z]}>
      <mesh>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <Text
        position={[0, 0.25, 0]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {/* Coordinate axes */}
      <arrowHelper
        args={[
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          0.5,
          0xff0000,
        ]}
      />
      <arrowHelper
        args={[
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 0),
          0.5,
          0x00ff00,
        ]}
      />
      <arrowHelper
        args={[
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(0, 0, 0),
          0.5,
          0x0000ff,
        ]}
      />

      {/* Axis labels */}
      <Text position={[0.6, 0, 0]} fontSize={0.15} color="red">
        X
      </Text>
      <Text position={[0, 0.6, 0]} fontSize={0.15} color="green">
        Y
      </Text>
      <Text position={[0, 0, 0.6]} fontSize={0.15} color="blue">
        Z
      </Text>

      {magnitude > 0 && (
        <>
          <arrowHelper
            args={[
              normalizedVec,
              new THREE.Vector3(0, 0, 0),
              arrowLength,
              0x7d3c98,
            ]}
          />
          <Text
            position={[labelPosition.x, labelPosition.y, labelPosition.z]}
            fontSize={0.15}
            fontWeight={700}
            color="#1b4f72"
            anchorX="center"
            anchorY="middle"
          >
            {`${magnitude.toFixed(2)} (${angleDegrees}°)`}
          </Text>
        </>
      )}
    </group>
  );
}

export default ForcePoint;
