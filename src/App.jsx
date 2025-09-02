import './App.css'
import React, { useEffect, useState } from "react";

export default function ShakeDetector() {
  const [message, setMessage] = useState("Tap button to enable motion 🚀");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let lastX = null,
      lastY = null,
      lastZ = null;
    const threshold = 15;

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
  }, [enabled]);

  const enableMotion = async () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceMotionEvent.requestPermission();
        if (response === "granted") {
          setEnabled(true);
          setMessage("Shake your phone 🎄");
        } else {
          setMessage("Permission denied ❌");
        }
      } catch (e) {
        console.error(e);
        setMessage("Error requesting permission ❌");
      }
    } else {
      // Android & other browsers
      setEnabled(true);
      setMessage("Shake your phone 🎄");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Shake Your Phone 🎄
      </h1>
      <p className="text-xl text-gray-800 mb-6">{message}</p>
      {!enabled && (
        <button
          onClick={enableMotion}
          className="px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold shadow-md"
        >
          Enable Motion
        </button>
      )}
    </div>
  );
}