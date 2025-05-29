"use client";

import React from "react";
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

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const formSchema = z.object({
  username: z.string().min(3).max(20),
  //   firstname: z.string().min(3).max(20).optional(),
  //   lastname: z.string().min(3).max(20).optional(),
  //   email: z.string().email(),
  password: z.string().min(8).regex(passwordRegex, {
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  }),
  //   confirmPassword: z
  //     .string()
  //     .min(8)
  //     .regex(passwordRegex, {
  //       message:
  //         "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  //     })
  //     .optional(),
});

const UserForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //   firstname: "",
      //   lastname: "",
      username: "",
      //   email: "",
      password: "",
      //   confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("form submited");
    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });
    console.log(result);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* {type === "register" && (
            <div>
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your firstname" {...field} />
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
                      <Input placeholder="Enter your lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )} */}
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
          {/* {type === "register" && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
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
          {/* {type === "register" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your confirmPassword"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}
          <div className="buttons flex gap-3 mt-4 items-center">
            <Button type="submit">Login</Button>
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
    </div>
  );
};

export default UserForm;
