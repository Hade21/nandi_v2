"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AlertDialogComp from "@/components/alert-dialog";
import { Eye, EyeOff } from "lucide-react";
import { SignInResult } from "../../../../types";
import { ClipLoader } from "react-spinners";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const formSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8).regex(passwordRegex, {
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  }),
});

const UserForm = () => {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function handleResult(result: SignInResult | undefined) {
    if (result?.ok) router.push("/maps");

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
                      onClick={() => setshowPassword(!showPassword)}>
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
            className="font-thin italic text-xs opacity-50 hover:text-red-500 hover:opacity-100">
            Forgot password?
          </Link>
          <div className="buttons flex gap-3 mt-4 items-center">
            <Button type="submit">
              {loading && <ClipLoader size={20} color="#fff" />}Login
            </Button>
            <p>or</p>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => router.push("/auth/register")}>
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
              onClick={() => setShowAlert(false)}>
              Close
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default UserForm;
