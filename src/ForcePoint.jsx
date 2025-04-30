import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

function ForcePoint({ x, y, z, Fx = 0, Fy = 0, Fz = 0, name = "" }) {
  const forceVec = new THREE.Vector3(Fx, Fy, Fz);
  const magnitude = forceVec.length();
  const normalizedVec = forceVec.clone().normalize();
  const arrowLength = magnitude * 0.5;

  // Arrow end point position for placing label
  const labelPosition = normalizedVec.clone().multiplyScalar(arrowLength * 0.9); // Slightly before arrow tip

  // Angle with respect to X-axis in XY plane
  const angleRadians = Math.atan2(Fy, Fx);
  const angleDegrees = THREE.MathUtils.radToDeg(angleRadians).toFixed(1);

  return (
    <group position={[x, y, z]}>
      {/* Point marker */}
      <mesh>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Point name */}
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {/* Axis arrows */}
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

      {/* Resultant arrow and label */}
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
