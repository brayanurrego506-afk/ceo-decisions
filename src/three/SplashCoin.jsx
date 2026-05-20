import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Moneda 3D rotando entre los splits del splash
// Dos caras: café (dorado) y tech (signal+neural)
// Rotación constante en Y + flotación suave

function CoinMesh({ hovered }) {
  const groupRef = useRef();
  const ringRef = useRef();
  const targetSpeed = useRef(0.6);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Aumentar velocidad cuando hay hover
    targetSpeed.current = THREE.MathUtils.damp(
      targetSpeed.current,
      hovered ? 2.2 : 0.6,
      4,
      delta,
    );

    groupRef.current.rotation.y += targetSpeed.current * delta;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.4;
    }
  });

  // Geometría: cilindro plano (moneda)
  const coinGeo = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.14, 64, 1, false), []);
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.18, 0.025, 8, 64), []);
  const innerRingGeo = useMemo(() => new THREE.TorusGeometry(0.78, 0.02, 8, 64), []);

  return (
    <group ref={groupRef} rotation={[Math.PI / 2.6, 0, 0]}>
      {/* Cuerpo de la moneda */}
      <mesh geometry={coinGeo} castShadow>
        <meshStandardMaterial
          color="#1a0e04"
          metalness={0.85}
          roughness={0.25}
          emissive="#D4872A"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Cara CAFÉ (frontal) — dorado */}
      <group position={[0, 0.073, 0]} rotation={[0, 0, 0]}>
        <mesh>
          <circleGeometry args={[0.99, 64]} />
          <meshStandardMaterial
            color="#D4872A"
            metalness={0.95}
            roughness={0.15}
            emissive="#D4872A"
            emissiveIntensity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Símbolo café — círculo con anillo */}
        <mesh position={[0, 0.001, 0]}>
          <ringGeometry args={[0.55, 0.62, 64]} />
          <meshStandardMaterial
            color="#0D0400"
            metalness={0.2}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.002, 0]}>
          <circleGeometry args={[0.42, 64]} />
          <meshStandardMaterial
            color="#2A6A2F"
            metalness={0.4}
            roughness={0.35}
            emissive="#2A6A2F"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Cara TECH (trasera) — Signal teal */}
      <group position={[0, -0.073, 0]} rotation={[Math.PI, 0, 0]}>
        <mesh>
          <circleGeometry args={[0.99, 64]} />
          <meshStandardMaterial
            color="#00D4AA"
            metalness={0.95}
            roughness={0.15}
            emissive="#00D4AA"
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Símbolo tech — diamante (Branex) */}
        <mesh position={[0, 0.001, 0]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.85, 0.85]} />
          <meshStandardMaterial
            color="#060B18"
            metalness={0.3}
            roughness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.002, 0]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.55, 0.55]} />
          <meshStandardMaterial
            color="#6C5CE7"
            metalness={0.6}
            roughness={0.3}
            emissive="#6C5CE7"
            emissiveIntensity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Anillo exterior decorativo (siempre visible) */}
      <mesh ref={ringRef} geometry={ringGeo} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.55} />
      </mesh>

      {/* Anillo interior */}
      <mesh geometry={innerRingGeo} rotation={[0, 0, 0]} position={[0, 0.08, 0]}>
        <meshBasicMaterial color="#D4872A" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function SplashCoin({ hovered }) {
  return (
    <div className="splash-coin">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 4]} intensity={2.2} color="#ffffff" />
          <pointLight position={[-3, 2, 3]} intensity={1.6} color="#00D4AA" />
          <pointLight position={[2, -3, 3]} intensity={1.4} color="#D4872A" />
          <pointLight position={[0, 0, -4]} intensity={0.8} color="#6C5CE7" />
          <CoinMesh hovered={hovered} />
          <EffectComposer>
            <Bloom intensity={1.0} luminanceThreshold={0.25} luminanceSmoothing={0.7} mipmapBlur />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
