import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

function ForcePoint({ x, y, z, Fx = 0, Fy = 0, Fz = 0, name = "" }) {
  const forceVec = new THREE.Vector3(Fx, Fy, Fz);
  const magnitude = forceVec.length();

  return (
    <group position={[x, y, z]}>
      {/* Point marker */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Name label */}
      <Text
        position={[0, 0.2, 0]} // Slightly above the point
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {/* Axes */}
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

      {/* Resultant Force */}
      {magnitude > 0 && (
        <arrowHelper
          args={[
            forceVec.clone().normalize(),
            new THREE.Vector3(0, 0, 0),
            magnitude * 0.5,
            0xff0000,
          ]}
        />
      )}
    </group>
  );
}

export default ForcePoint;
