"use client";

import { useEffect, useRef } from "react";

export default function Loading() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setSpeed = () => {
      video.playbackRate = 4; // ✅ use 1.5–2 for reliable results
    };

    video.addEventListener("loadedmetadata", setSpeed);

    return () => {
      video.removeEventListener("loadedmetadata", setSpeed);
    };
  }, []);

  return (
    <div className="loader-wrapper">
      <video
        ref={videoRef}
        src="/img/air.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="loader-video"
      />
    </div>
  );
}
