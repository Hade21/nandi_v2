"use client";

import React, { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import MapIcon from "../../../public/assets/icons/wired-lineal-18-location-pin-hover-jump.json";

interface MapPinProps {
  size?: number;
}

const MapPin = ({ size }: MapPinProps) => {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return (
    <Player
      ref={playerRef}
      icon={MapIcon}
      size={size}
      onComplete={() => playerRef.current?.playFromBeginning}
    />
  );
};

export default MapPin;
