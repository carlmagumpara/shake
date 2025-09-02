import React, { useEffect, useState } from "react";
import './App.css'

export default function ShakeDetector() {
  const [message, setMessage] = useState("Waiting for shake... 🎄");

  useEffect(() => {
    let lastX = null,
      lastY = null,
      lastZ = null;
    const threshold = 15; // sensitivity

    function handleMotion(event) {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const { x, y, z } = acc;

      if (lastX !== null && lastY !== null && lastZ !== null) {
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);

        if (deltaX + deltaY + deltaZ > threshold) {
          setMessage("🎅 You shook it! ❄️ Snow is falling...");
          // Example: trigger a snow animation or play sound
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    }

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Shake Your Phone 🎄
      </h1>
      <p className="text-xl text-gray-800">{message}</p>
    </div>
  );
}