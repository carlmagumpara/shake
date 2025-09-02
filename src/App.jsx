import './App.css'
import React, { useEffect, useState } from "react";

export default function ShakeDetector() {
  const [message, setMessage] = useState("Tap button to enable motion 🚀");
  const [enabled, setEnabled] = useState(false);
  const [snow, setSnow] = useState(false);

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
          setSnow(true);
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
    <>
      {snow && Array.from({ length: Math.floor(1000 / 3) + 1 }, (_, i) => i * 3).map(v => <div className="snow"></div>)}
      <div className="container">
        <div className="landing">
          <h1>
            Shake Your Phone 🎄
          </h1>
          <p>{message}</p>
          {!enabled && (
            <button
              onClick={enableMotion}
            >
              Enable Motion
            </button>
          )}
        </div>
      </div>
    </>
  );
}