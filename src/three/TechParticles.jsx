import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Galaxy/data-center espiral — Signal/Neural/Pulse
// Movimiento en espiral hacia el centro + bloom moderado

const COUNT = 420;

function DataParticles() {
  const pointsRef = useRef();
  const materialRef = useRef();

  const { positions, scales, randomness, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const randomness = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const cSignal = new THREE.Color('#00D4AA');
    const cNeural = new THREE.Color('#6C5CE7');
    const cPulse = new THREE.Color('#00CEFF');

    const radius = 6;
    const branches = 5;
    const spin = 1.4;
    const randomnessPower = 3.0;

    for (let i = 0; i < COUNT; i++) {
      const r = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const rx =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * r;
      const ry =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * r;
      const rz =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * r;

      positions[i * 3 + 0] = Math.cos(branchAngle + spinAngle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r;

      randomness[i * 3 + 0] = rx;
      randomness[i * 3 + 1] = ry;
      randomness[i * 3 + 2] = rz;

      scales[i] = 0.4 + Math.random() * 1.2;

      // 60% Signal, 25% Neural, 15% Pulse
      const rand = Math.random();
      let c;
      if (rand < 0.6) c = cSignal;
      else if (rand < 0.85) c = cNeural;
      else c = cPulse;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, scales, randomness, colors };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 28 },
    }),
    [],
  );

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
        <bufferAttribute attach="attributes-aRandomness" args={[randomness, 3]} count={COUNT} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} count={COUNT} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={COUNT} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        vertexShader={`
          uniform float uTime;
          uniform float uPixelRatio;
          uniform float uSize;
          attribute float aScale;
          attribute vec3 aRandomness;
          varying vec3 vColor;
          varying float vPulse;

          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            // Movimiento espiral hacia el centro
            float angle = atan(modelPosition.x, modelPosition.z);
            float distanceToCenter = length(modelPosition.xz);
            float angleOffset = (1.0 / max(distanceToCenter, 0.5)) * uTime * 0.18;
            angle += angleOffset;
            modelPosition.x = cos(angle) * distanceToCenter;
            modelPosition.z = sin(angle) * distanceToCenter;

            modelPosition.xyz += aRandomness;

            // Vertical wave gentle
            modelPosition.y += sin(uTime * 0.6 + aRandomness.x * 5.0) * 0.15;

            vec4 viewPosition = viewMatrix * modelPosition;
            gl_Position = projectionMatrix * viewPosition;

            // Pulso de tamaño
            float pulse = 0.85 + 0.15 * sin(uTime * 1.8 + aRandomness.y * 6.0);
            gl_PointSize = uSize * aScale * uPixelRatio * pulse;
            gl_PointSize *= (1.0 / -viewPosition.z);

            vColor = color;
            vPulse = pulse;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vPulse;
          void main() {
            float dist = length(gl_PointCoord - 0.5);
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, dist);
            float core = smoothstep(0.18, 0.0, dist);
            vec3 finalColor = vColor + core * 0.6;
            gl_FragColor = vec4(finalColor, alpha * 0.85 * vPulse);
          }
        `}
      />
    </points>
  );
}

export default function TechParticles() {
  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [0, 2.5, 7.5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <DataParticles />
      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.15} luminanceSmoothing={0.7} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
