import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react'

function calculateFOVForPortraitMode(){
    return 55;
}

function calculateFOVForLandscapeMode(){
    return 30;
}

const CameraAdjuster = () => {
    const { camera, size } = useThree();
    
    useEffect(() => {
      // Your logic to adjust the camera
      // For example, adjust the FOV or the camera's position
      const aspectRatio = size.width / size.height;
      
      if (aspectRatio < 1) {
        // This is a tall screen (e.g., mobile device in portrait mode)
        camera.fov = calculateFOVForPortraitMode(); // Define this function based on your needs
      } else {
        // This is a wide screen (e.g., desktop or mobile device in landscape mode)
        camera.fov = calculateFOVForLandscapeMode(); // Define this function based on your needs
      }

      console.log("Aspect: ", aspectRatio, "FOV: ", camera.fov, "W: ", size.width, "H: ", size.height);

      camera.updateProjectionMatrix();
    }, [camera, size.width, size.height]);
  
    return null; // This component does not render anything itself
  }

export default CameraAdjuster