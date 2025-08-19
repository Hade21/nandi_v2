import { Button } from "@/components/ui/button";
import { useUnitStore } from "@/utils/storeProvider";

export default function UpdateAction() {
  const setLocation = useUnitStore((state) => state.setLocation);

  function handleUpdate(type: "gps" | "pin") {
    if (type === "gps") {
      setLocation("gps");
    }
  }

  return (
    <div className="flex gap-2 justify-center w-full dark:bg-black">
      <Button
        variant="default"
        className="w-full -translate-x-5"
        onClick={() => {
          handleUpdate("gps");
        }}
      >
        Use My GPS
      </Button>
      <Button
        variant="default"
        className="w-full translate-x-5"
        onClick={() => {
          handleUpdate("pin");
        }}
      >
        Pin on Maps
      </Button>
    </div>
  );
}
