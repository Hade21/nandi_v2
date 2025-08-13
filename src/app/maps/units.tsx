"use client";

import AlertDialogComp from "@/components/alert-dialog";
import HamburgerMenu from "@/components/hamburger-menu";
import SearchBox from "@/components/search-box";
import { useUnitsQuery } from "@/hooks/queryUnitHooks";
import { useUnitStore } from "@/utils/storeProvider";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { UnitData } from "../../../types/types";
import CardUnit from "./card";
import UpdateModals from "./update-modals";

const Units = () => {
  const selectedUnit = useUnitStore((state) => state.selectedUnit);
  const updatingUnit = useUnitStore((state) => state.updatingUnit);
  const setSelectedUnit = useUnitStore((state) => state.setSelectedUnit);
  const setUnits = useUnitStore((state) => state.setUnits);
  const units = useUnitStore((state) => state.units);
  const setLocation = useUnitStore((state) => state.setLocation);
  const showModals = useUnitStore((state) => state.showUpdateModal);
  const setShowModals = useUnitStore((state) => state.setShowUpdateModal);
  const { data, isLoading, error } = useUnitsQuery();
  const searchItems = useRef<{ value: string; label: string }[]>([]);
  const [clicked, setClicked] = useState<UnitData | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    head: number | null;
    label: string;
  } | null>(null);

  const updateAction = [
    {
      title: "Use my GPS",
      function: () => handleUpdate("gps"),
    },
    {
      title: "Pin on maps",
      function: () => handleUpdate("pin"),
    },
  ];

  function handleUpdate(type: "gps" | "pin") {
    if (type === "gps") {
      setLocation("gps");
    }
  }

  function setSelectedUnitById(id: string) {
    const selectedUnit = units.find((unit: UnitData) => unit.name === id);

    if (selectedUnit) setSelectedUnit(selectedUnit);
    else {
      setSelectedUnit({
        id: "",
        name: "",
        type: "",
        egi: "",
        createdBy: "",
      });
    }
  }

  useEffect(() => {
    if (data) {
      setUnits(data.data);
      toast.success("Units Data Fetched Successfully.");
      toast.dismiss();
      searchItems.current = data.data.map((unit: UnitData) => {
        return {
          value: unit.id,
          label: unit.name,
        };
      });
      searchItems.current.sort((a, b) => a.label.localeCompare(b.label));
    }
  }, [data, setUnits]);

  useEffect(() => {
    if (!updatingUnit) {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const userLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              head: position.coords.heading,
              label: "My Location",
            };
            setUserLocation(userLoc);
          },
          (error) => {
            toast.warning("Can't locate your position", {
              description: error.message,
            });
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          }
        );
      } else {
        toast.warning("Can't locate your position", {
          description: "Please enable geolocation on your browser",
        });
      }
    }
  }, [updatingUnit]);

  if (isLoading) toast.loading("Loading Units Data...");

  if (error) {
    toast.dismiss();
    if (error.message) toast.error(error.message);
    else toast.error("Something went wrong. Please try again later.");
  }

  return (
    <div className="relative">
      {!updatingUnit &&
        !selectedUnit.id &&
        units &&
        units.map(
          (unit: UnitData) =>
            unit.locations && (
              <AdvancedMarker
                key={unit.id}
                position={{
                  lat: Number(unit.locations.lat),
                  lng: Number(unit.locations.long),
                }}
                onClick={() => setClicked(unit)}
                zIndex={clicked?.id === unit.id ? 1000 : 1}
              >
                <span className="relative flex items-center justify-center">
                  <Image
                    src={selectIcon(unit.type)}
                    width={24}
                    height={24}
                    alt={unit.type}
                  />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                    <CardUnit
                      id={unit.id}
                      name={unit.name}
                      type={unit.type}
                      egi={unit.egi}
                      key={unit.id}
                      location={unit.locations.location}
                      dateTime={unit.locations.dateTime}
                      createdBy={unit.createdBy}
                    />
                  </div>
                </span>
              </AdvancedMarker>
            )
        )}

      {selectedUnit.locations && (
        <AdvancedMarker
          key={selectedUnit.id}
          position={{
            lat: Number(selectedUnit.locations?.lat),
            lng: Number(selectedUnit.locations?.long),
          }}
          onClick={() => setClicked(selectedUnit)}
          zIndex={clicked?.id === selectedUnit.id ? 1000 : 1}
        >
          <span className="relative flex items-center justify-center">
            <Image
              src={selectIcon(selectedUnit.type)}
              width={24}
              height={24}
              alt={selectedUnit.type}
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <CardUnit
                id={selectedUnit.id}
                name={selectedUnit.name}
                type={selectedUnit.type}
                egi={selectedUnit.egi}
                key={selectedUnit.id}
                location={selectedUnit.locations.location}
                dateTime={selectedUnit.locations.dateTime}
              />
            </div>
          </span>
        </AdvancedMarker>
      )}
      {userLocation?.label && (
        <AdvancedMarker
          key={"user"}
          position={{ lat: userLocation.lat, lng: userLocation.lng }}
        >
          <span className="relative flex items-center justify-center">
            <Image
              src={"/position.svg"}
              width={24}
              height={24}
              alt={"User's Location"}
            />
            <div className="label absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
              {userLocation.label}
            </div>
          </span>
        </AdvancedMarker>
      )}

      {units && (
        <div className="absolute -top-[98vh] left-2">
          <SearchBox
            items={searchItems.current}
            selectAction={setSelectedUnitById}
          />
        </div>
      )}

      <HamburgerMenu />
      {updatingUnit && <UpdateModals />}
      {updatingUnit && (
        <AlertDialogComp
          open={showModals}
          setOpen={setShowModals}
          title="Update Location"
          description="Are you sure you want to update the location of this unit?"
          action={updateAction}
        />
      )}
    </div>
  );
};

function selectIcon(type: string) {
  switch (type) {
    case "TOWER LAMP":
      return "/tower-lamp.png";
    case "GENSET":
      return "/generator.svg";
    case "AIR COMPRESSOR":
      return "/air-compressor.png";
    case "MEGA TOWER":
      return "/mega-tower.svg";
    case "WELDING MACHINE":
      return "/welding-machine.png";
  }
  return "/location.png"; // Fallback icon
}

export default Units;
