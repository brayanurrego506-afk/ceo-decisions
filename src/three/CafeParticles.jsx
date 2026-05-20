import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vapor de café — partículas orgánicas dorado/verde/crema
// Drift suave hacia arriba con ondulación sinusoidal (Perlin simulado)

const COUNT = 480;

function VaporParticles() {
  const pointsRef = useRef();
  const materialRef = useRef();

  const { positions, randomness, scales, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const randomness = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const cGold = new THREE.Color('#D4872A');
    const cGreen = new THREE.Color('#2A6A2F');
    const cCream = new THREE.Color('#F5E6C8');

    for (let i = 0; i < COUNT; i++) {
      // Distribución en un volumen ancho — pantalla completa
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 6;

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      randomness[i * 3 + 0] = (Math.random() - 0.5) * 2;
      randomness[i * 3 + 1] = Math.random() * 2;
      randomness[i * 3 + 2] = (Math.random() - 0.5) * 2;

      scales[i] = 0.7 + Math.random() * 1.6;

      // 50% dorado, 30% verde, 20% crema
      const rand = Math.random();
      let c;
      if (rand < 0.5) c = cGold;
      else if (rand < 0.8) c = cGreen;
      else c = cCream;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, randomness, scales, colors };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 36 },
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

          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            // Drift orgánico — vapor que sube
            float t = uTime * 0.18;
            modelPosition.y += mod(t * aRandomness.y + aRandomness.y * 4.0, 14.0) - 7.0;
            modelPosition.x += sin(t * 0.7 + aRandomness.x * 3.0) * 0.8;
            modelPosition.z += cos(t * 0.5 + aRandomness.z * 3.0) * 0.6;

            // Pequeña ondulación más rápida (turbulencia)
            modelPosition.x += sin(uTime * 1.4 + aRandomness.x * 7.0) * 0.15;
            modelPosition.y += cos(uTime * 1.2 + aRandomness.y * 7.0) * 0.10;

            vec4 viewPosition = viewMatrix * modelPosition;
            gl_Position = projectionMatrix * viewPosition;

            gl_PointSize = uSize * aScale * uPixelRatio;
            gl_PointSize *= (1.0 / -viewPosition.z);

            vColor = color;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - 0.5);
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, dist);
            float core = smoothstep(0.25, 0.0, dist);
            vec3 finalColor = vColor + core * 0.35;
            gl_FragColor = vec4(finalColor, alpha * 0.85);
          }
        `}
      />
    </points>
  );
}

export default function CafeParticles() {
  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <VaporParticles />
    </Canvas>
  );
}
