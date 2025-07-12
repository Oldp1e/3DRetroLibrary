import { extend } from '@react-three/fiber'
import { Mesh, BoxGeometry, MeshStandardMaterial, Group, AmbientLight, DirectionalLight, PointLight, GridHelper } from 'three'

// Extend ThreeJS elements for React Three Fiber
extend({ 
  Mesh, 
  BoxGeometry, 
  MeshStandardMaterial, 
  Group, 
  AmbientLight, 
  DirectionalLight, 
  PointLight, 
  GridHelper 
})

// Global type declarations for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
      mesh: any
      boxGeometry: any
      meshStandardMaterial: any
      ambientLight: any
      directionalLight: any
      pointLight: any
      gridHelper: any
    }
  }
}
