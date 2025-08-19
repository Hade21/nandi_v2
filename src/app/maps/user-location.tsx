import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserLocation = () => {
  const [location, setLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setLocation(location);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
    } else {
      toast.warning("Cannot locate your position", {
        description: "Please enable location services",
      });
    }

    return () => {
      navigator.geolocation.clearWatch(0);
    };
  }, [location]);

  if (!location.lat || !location.lng) return null;

  return (
    <AdvancedMarker
      key={"user"}
      position={{ lat: location.lat, lng: location.lng }}
    >
      <span className="relative flex items-center justify-center">
        <Image
          src={"/position.svg"}
          width={32}
          height={32}
          alt={"User's Location"}
        />
        <div className="w-30 text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white text-slate-950 p-3 dark:bg-slate-900 dark:text-slate-50 rounded-xl shadow-md">
          <h3 className="text-xs font-semibold">Your position</h3>
        </div>
      </span>
    </AdvancedMarker>
  );
};

export default UserLocation;
