import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../compontent/FaceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Waiting");
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    async function startCamera() {
      try {
        await init({ landmarkerRef, videoRef, streamRef });
        setCameraReady(true);
        setExpression("Ready");
      } catch {
        setCameraError("Camera permission is needed to detect your mood.");
      }
    }

    startCamera();

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  function handleClick() {
    const nextExpression = detect({ landmarkerRef, videoRef, setExpression });
    onClick(nextExpression);
  }

  return (
    <div className="face-card">
      <div className="face-card__top">
        <div>
          <p>Live camera</p>
          <h2>Mood scan</h2>
        </div>
        <span className={cameraReady ? "status-dot status-dot--ready" : "status-dot"} />
      </div>

      <div className="face-card__preview">
        <video ref={videoRef} playsInline muted />
        {!cameraReady && !cameraError && <span>Starting camera...</span>}
        {cameraError && <span>{cameraError}</span>}
      </div>

      <div className="face-card__result">
        <span>Detected mood</span>
        <strong>{expression}</strong>
      </div>

      <button onClick={handleClick} className="button face-card__button" disabled={!cameraReady}>
        Detect mood
      </button>
    </div>
  );
}
