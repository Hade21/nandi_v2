"use client";

import AlertDialogComp from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/queryUserHooks";
import { RegisterSchema, registerSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const UserForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const router = useRouter();
  const { theme } = useTheme();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, error, isPending, data } = useRegister();

  useEffect(() => {
    if (data) router.push("/auth/login");

    if (error) {
      setAlertTitle("Error");
      setAlertDesc(error.message);
      setShowAlert(true);
    }
  }, [data, error, router]);

  function onSubmit(values: RegisterSchema) {
    const data = new FormData();
    data.append("firstname", values.firstname);
    data.append("lastname", values.lastname);
    data.append("username", values.username);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("confirmPassword", values.confirmPassword);
    mutate(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-start gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="Michael" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="Sutopo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="mcsut123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mcsut123@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <div
                      className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                    />
                    <div
                      className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="buttons flex gap-3 mt-4 items-center">
            <Button type="submit">
              {isPending && (
                <ClipLoader
                  size={20}
                  color={theme === "dark" ? "black" : "white"}
                />
              )}
              Register
            </Button>
            <p>or</p>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialogComp
        open={showAlert}
        setOpen={setShowAlert}
        title={alertTitle}
        description={alertDesc}
        action={
          <div>
            <Button
              type="button"
              variant={"default"}
              onClick={() => setShowAlert(false)}
            >
              Close
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default UserForm;
