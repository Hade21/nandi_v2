import {
  addUnit,
  getAllUnit,
  getUnit,
  updateUnit,
} from "@/services/unitServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function changeErrorMessage(error: Error) {
  console.log(`Error: ${error}`);
  if (error.message === "Unauthorized") {
    return (error.message =
      "Unauthorized access. Please login as admin to continue.");
  }
  return error;
}

export const useAddUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => addUnit(data),
    onError(error) {
      return changeErrorMessage(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => updateUnit(data),
    onError(error) {
      return changeErrorMessage(error);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", data.data.id] });
    },
  });
};

export const useUnitQuery = (id: string) => {
  return useQuery({
    queryKey: ["unit", id],
    queryFn: () => getUnit(id),
    enabled: !!id, // Only run the query if id is defined
  });
};

export const useUnitsQuery = () => {
  return useQuery({
    queryKey: ["units"],
    queryFn: getAllUnit,
    staleTime: 1000 * 10,
    gcTime: 20000,
  });
};
