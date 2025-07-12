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
  
  // Posições da câmera com zoom suave
  const defaultPosition = new Vector3(0, 2, 8);
  const followPosition = new Vector3(2, 0, 3);
  const insertionPosition = new Vector3(0.8, -0.5, 2); // Mais próximo para zoom
  const zoomPosition = new Vector3(0.5, -1, 1.2); // Zoom próximo do console
  
  useEffect(() => {
    if (cameraRef.current && isEnabled) {
      // Tornar esta câmera a ativa
      set({ camera: cameraRef.current });
      
      if (isAnimating && targetPosition) {
        // Timeline completa da animação
        const timeline = gsap.timeline();
        
        // Fase 1: Mover para posição de acompanhamento (1.5s)
        timeline.to(cameraRef.current.position, {
          duration: 1.5,
          x: followPosition.x,
          y: followPosition.y,
          z: followPosition.z,
          ease: "power2.out"
        });
        
        // Fase 2: Acompanhar aproximação do cartucho (0.8s)
        timeline.to(cameraRef.current.position, {
          duration: 0.8,
          x: insertionPosition.x,
          y: insertionPosition.y,
          z: insertionPosition.z,
          ease: "power2.inOut"
        }, "+=0.3");
        
        // Fase 3: ZOOM IN no momento da inserção (0.4s)
        timeline.to(cameraRef.current.position, {
          duration: 0.4,
          x: zoomPosition.x,
          y: zoomPosition.y,
          z: zoomPosition.z,
          ease: "power3.in"
        }, "+=0.5");
        
        // Fase 4: Manter zoom durante card (2s)
        timeline.to(cameraRef.current.position, {
          duration: 0.1,
          x: zoomPosition.x,
          y: zoomPosition.y,
          z: zoomPosition.z,
        }, "+=2");
        
        // Fase 5: ZOOM OUT gradual antes da remoção (0.6s)
        timeline.to(cameraRef.current.position, {
          duration: 0.6,
          x: insertionPosition.x,
          y: insertionPosition.y,
          z: insertionPosition.z,
          ease: "power2.out"
        });
        
        // Fase 6: Acompanhar saída do cartucho (0.3s)
        timeline.to(cameraRef.current.position, {
          duration: 0.3,
          x: followPosition.x,
          y: followPosition.y,
          z: followPosition.z,
          ease: "power2.out"
        });
        
        // Fase 7: Retornar suavemente para posição padrão (1.5s)
        timeline.to(cameraRef.current.position, {
          duration: 1.5,
          x: defaultPosition.x,
          y: defaultPosition.y,
          z: defaultPosition.z,
          ease: "power2.out"
        });
      }
    } else if (!isEnabled) {
      // Voltar para câmera padrão
      set({ camera });
    }
  }, [
    isEnabled, 
    isAnimating, 
    targetPosition, 
    camera, 
    set,
    defaultPosition.x,
    defaultPosition.y,
    defaultPosition.z,
    followPosition.x,
    followPosition.y,
    followPosition.z,
    insertionPosition.x,
    insertionPosition.y,
    insertionPosition.z,
    zoomPosition.x,
    zoomPosition.y,
    zoomPosition.z
  ]);
  
  useFrame(() => {
    if (cameraRef.current && isEnabled) {
      // Sempre olhar para o centro do console com suavidade
      const consolePosition = new Vector3(0, -1.5, -0.8);
      cameraRef.current.lookAt(consolePosition);
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
