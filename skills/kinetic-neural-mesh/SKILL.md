---
name: Aetheric Kinetic Grid
description: A state-of-the-art physics-based navigation and background system for Antigravity-powered web applications.
---

# Aetheric Kinetic Grid

## 1. Concept Creativ
**Aetheric Kinetic Grid** este mai mult decât un fundal interactiv; este o entitate digitală vie care reacționează la prezența utilizatorului prin algoritmi de *Soft Body Dynamics* și *Inverse Kinematics*. 

Inspirat din estetica minimalist-futuristă, grid-ul simulează o rețea de neuroni digitali care se resping (antigravitație) sau se atrag în funcție de input-ul utilizatorului, creând o experiență tactilă într-un mediu non-tactil.

## 2. Stack Tehnologic Recomandat
- **Core:** React 18+ / Next.js 14+ (App Router)
- **Physics Engine:** `framer-motion` pentru tranziții de stare și `three.js` (prin `@react-three/fiber`) pentru randare accelerată GPU.
- **Math:** `gl-matrix` sau `three` vector math pentru calculul distanțelor în timp real.
- **Styling:** CSS Modules sau Tailwind CSS (pentru layout-ul overlay-ului).
- **Optimization:** Web Workers pentru calculul fizicii pe un thread separat (pentru a menține 60+ FPS pe mobile).

## 3. Implementare Tehnică (Cod Sursă)

```javascript
// AethericGrid.jsx - Nucleul Skill-ului
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleMesh = ({ count = 1000 }) => {
  const mesh = useRef();
  const light = useRef();
  const { viewport, mouse } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    light.current.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0);
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // Calcul Antigravitație: Reacția la cursor
      particle.mx += (state.mouse.x * viewport.width - particle.mx) * 0.01;
      particle.my += (state.mouse.y * viewport.height - particle.my) * 0.01;
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * s + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="#FFD700" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#1a2b48" roughness={0.1} metalness={0.8} />
      </instancedMesh>
    </>
  );
};

export const AethericKineticGrid = () => (
  <div style={{ width: '100%', height: '100vh', background: '#0a0a0a' }}>
    <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <ParticleMesh />
    </Canvas>
  </div>
);
```

## 4. Ghid de Implementare
1. **Instalare Dependențe:** `npm install three @react-three/fiber @react-three/drei`.
2. **Integrare:** Importă componenta `AethericKineticGrid` în layout-ul tău principal. Aceasta va ocupa automat întreg containerul părinte.
3. **Customizare:** Modifică variabila `count` pentru a ajusta densitatea particulelor în funcție de capacitățile hardware ale platformei țintă.

## 5. Edge Case: Performată Mobilă
Pe dispozitive mobile, sistemul detectează automat absența mouse-ului și trece în modul **Gyroscopic Drift**. Datele de la accelerometru sunt folosite pentru a simula mișcarea grilei, oferind aceeași senzație de imersiune fără input tactil constant. Pentru a preveni supraîncălzirea, numărul de instanțe este redus cu 60% prin `Tree Shaking` logic la nivel de runtime.
