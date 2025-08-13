import { getAllUnit } from "@/services/unitServices";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Units from "./units";

const PrefetchUnits = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["units"],
    queryFn: getAllUnit,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Units />
    </HydrationBoundary>
  );
};

export default PrefetchUnits;
