// VantaFog.js
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';


const VantaFog = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          highlightColor: "#000000",
          midtoneColor: "#312e2e",
          lowlightColor: "#ffffff",
          baseColor: "#464646",
          speed: 2.00,
          blurFactor: 0.6,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      {/* This empty div allows Vanta to apply the effect */}
    </div>
  );
};

export default VantaFog;