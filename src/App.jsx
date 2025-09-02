import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [textContent, setTextContent] = useState('Waiting for shake...');

  useEffect(() => {
    let lastX = null, lastY = null, lastZ = null;
    let threshold = 15; // adjust sensitivity

    window.addEventListener("devicemotion", function(event) {
      let acc = event.accelerationIncludingGravity;
      if (!acc) return;

      let x = acc.x;
      let y = acc.y;
      let z = acc.z;

      if (lastX !== null && lastY !== null && lastZ !== null) {
        let deltaX = Math.abs(x - lastX);
        let deltaY = Math.abs(y - lastY);
        let deltaZ = Math.abs(z - lastZ);

        if (deltaX + deltaY + deltaZ > threshold) {
          setTextContent("🎅 You shook it!");
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    });
  }, []);

  return (
    <>
      {textContent}
    </>
  )
}

export default App
