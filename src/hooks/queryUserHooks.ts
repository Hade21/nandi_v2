import { submitForm } from "@/services/submit";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({ mutationFn: (data: FormData) => submitForm(data) });
};
