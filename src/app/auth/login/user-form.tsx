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
import { LoginSchema, loginSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { SignInResult } from "../../../../types";

const UserForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const router = useRouter();
  const { theme } = useTheme();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function handleResult(result: SignInResult | undefined) {
    if (result?.ok) return router.push("/maps");

    if (!result?.ok && result?.status === 401) {
      setAlertTitle("Something went wrong");
      setAlertDesc("Username or password invalid");
      setShowAlert(true);
    } else {
      setAlertTitle("Something went wrong");
      setAlertDesc("Network error. Please check connection");
      setShowAlert(true);
    }
  }

  async function onSubmit(values: LoginSchema) {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    handleResult(result);
    setLoading(false);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
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
          <Link
            href={"/auth/forgot-password"}
            className="font-thin italic text-xs opacity-50 hover:text-red-500 hover:opacity-100"
          >
            Forgot password?
          </Link>
          <div className="buttons flex gap-3 mt-4 items-center">
            <Button type="submit">
              {loading && (
                <ClipLoader
                  size={20}
                  color={theme === "dark" ? "black" : "white"}
                />
              )}
              Login
            </Button>
            <p>or</p>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => router.push("/auth/register")}
            >
              Register
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialogComp
        title={alertTitle}
        description={alertDesc}
        open={showAlert}
        setOpen={setShowAlert}
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
