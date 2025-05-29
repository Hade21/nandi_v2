"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { formSchema, FormSchema } from "@/schema/formSchema";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "@/hooks/queryUserHooks";

const UserForm = () => {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setshowConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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
    if (data) console.log(data);

    if (error) alert(error);

    if (isPending) alert("Uploading data");
  }, [data, error, isPending]);

  function onSubmit(values: FormSchema) {
    console.log(values);
    alert("form submited");
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
                      onClick={() => setshowPassword(!showPassword)}>
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
                        setshowConfirmPassword(!showConfirmPassword)
                      }>
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="buttons flex gap-3 mt-4 items-center">
            <Button type="submit">Register</Button>
            <p>or</p>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => router.push("/auth/login")}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
