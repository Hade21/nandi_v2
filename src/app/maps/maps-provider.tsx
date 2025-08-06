"use client";
import { useUnitStore } from "@/utils/storeProvider";
import { APIProvider, Map, MapMouseEvent } from "@vis.gl/react-google-maps";

const MapsProvider = ({ children }: { children: React.ReactNode }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const updatingUnit = useUnitStore((state) => state.updatingUnit);
  const selectedUnit = useUnitStore((state) => state.selectedUnit);
  const setSelectedUnit = useUnitStore((state) => state.setSelectedUnit);

  const pinOnMaps = (event: MapMouseEvent) => {
    if (!updatingUnit && !selectedUnit.id) return;
    if (event.detail.latLng) {
      const location = {
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
        alt: 0,
        label: selectedUnit.name,
      };
      const updatedLocation = {
        ...selectedUnit,
        location: {
          ...location,
          lat: location.lat,
          long: location.lng,
          alt: location.alt,
        },
      };
      setSelectedUnit(updatedLocation);
    }
  };

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
        onClick={updatingUnit ? pinOnMaps : undefined}
      >
        {children}
      </Map>
    </APIProvider>
  );
};

export default MapsProvider;
