import { addUnit } from "@/services/unitServices";
import { useMutation } from "@tanstack/react-query";

export const useAddUnit = () => {
  return useMutation({
    mutationFn: (data: FormData) => addUnit(data),
    onError(error) {
      if (error.message === "Unauthorized") {
        return (error.message =
          "Unauthorized access. Please login as admin to continue.");
      }
      return error;
    },
  });
};
