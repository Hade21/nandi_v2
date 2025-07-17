"use client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MapsProvider = ({ children }: { children: React.ReactNode }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error(
      "Google Maps API key is not defined in the environment variables."
    );
    return <div>Error: Google Maps API key is not defined.</div>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId={"ed3233d168ee9833"}
        defaultCenter={{ lat: -2.16, lng: 115.46 }}
        defaultZoom={11}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {children}
      </Map>
    </APIProvider>
  );
};

export default MapsProvider;
