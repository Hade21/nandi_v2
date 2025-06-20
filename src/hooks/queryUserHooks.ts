import { register } from "@/services/userServices";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({ mutationFn: (data: FormData) => register(data) });
};
