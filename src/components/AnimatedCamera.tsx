import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';
import gsap from 'gsap';

interface AnimatedCameraProps {
  isEnabled: boolean;
  isAnimating: boolean;
  targetPosition?: Vector3;
}

const AnimatedCamera: React.FC<AnimatedCameraProps> = ({ 
  isEnabled, 
  isAnimating, 
  targetPosition 
}) => {
  const cameraRef = useRef<any>(null);
  const { camera, set } = useThree();
  
  // Posições da câmera
  const defaultPosition = new Vector3(0, 2, 8);
  const followPosition = new Vector3(2, 0, 3);
  const insertionPosition = new Vector3(1, -1, 1);
  
  useEffect(() => {
    if (cameraRef.current && isEnabled) {
      // Tornar esta câmera a ativa
      set({ camera: cameraRef.current });
      
      if (isAnimating && targetPosition) {
        // Animar câmera seguindo o cartucho
        const timeline = gsap.timeline();
        
        // Primeira fase: mover para posição de acompanhamento
        timeline.to(cameraRef.current.position, {
          duration: 1.5,
          x: followPosition.x,
          y: followPosition.y,
          z: followPosition.z,
          ease: "power2.out"
        });
        
        // Segunda fase: acompanhar inserção
        timeline.to(cameraRef.current.position, {
          duration: 0.8,
          x: insertionPosition.x,
          y: insertionPosition.y,
          z: insertionPosition.z,
          ease: "power2.inOut"
        }, "+=0.3");
        
        // Terceira fase: voltar para posição padrão
        timeline.to(cameraRef.current.position, {
          duration: 2,
          x: defaultPosition.x,
          y: defaultPosition.y,
          z: defaultPosition.z,
          ease: "power2.out"
        }, "+=2");
      }
    } else if (!isEnabled) {
      // Voltar para câmera padrão
      set({ camera });
    }
  }, [isEnabled, isAnimating, targetPosition, camera, set]);
  
  useFrame(() => {
    if (cameraRef.current && isEnabled) {
      // Sempre olhar para o centro do console
      cameraRef.current.lookAt(0, -1.5, -0.8);
    }
  });

  if (!isEnabled) return null;

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={defaultPosition}
      fov={75}
      near={0.1}
      far={1000}
    />
  );
};

export default AnimatedCamera;
