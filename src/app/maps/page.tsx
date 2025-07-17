import MapsProvider from "./maps-provider";
import Units from "./units";

const MapsPage = () => {
  return (
    <div className="w-full h-screen">
      <MapsProvider>
        <Units />
      </MapsProvider>
    </div>
  );
};

export default MapsPage;
