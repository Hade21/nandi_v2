import MapsProvider from "./maps-provider";
import PrefetchUnits from "./prefetch-units";

const MapsPage = () => {
  return (
    <div className="w-full h-screen relative">
      <MapsProvider>
        <PrefetchUnits />
      </MapsProvider>
    </div>
  );
};

export default MapsPage;
