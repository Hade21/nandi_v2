"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUpdateLocation } from "@/hooks/queryUnitHooks";
import { locationSchema, LocationSchema } from "@/schema/unitSchema";
import { useUnitStore } from "@/utils/storeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const UpdateModals = () => {
  const { data } = useSession();
  const { theme } = useTheme();
  const selectedUnit = useUnitStore((state) => state.selectedUnit);
  const setUpdatingUnit = useUnitStore((state) => state.setUpdatingUnit);
  const setSelectedUnit = useUnitStore((state) => state.setSelectedUnit);
  const {
    mutate,
    isPending: isLoading,
    error,
    isSuccess,
  } = useUpdateLocation();

  const form = useForm<LocationSchema>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      alt: "0",
      long: "0",
      lat: "0",
      location: "",
      dateTime: "",
      createdBy: "",
    },
  });

  const handleClose = useCallback(() => {
    setUpdatingUnit(false);
    form.reset();
    setSelectedUnit({
      name: "",
      id: "",
      type: "",
      egi: "",
      createdBy: "",
      locations: form.getValues(),
    });
  }, [form, setSelectedUnit, setUpdatingUnit]);

  async function onSubmit(values: LocationSchema) {
    console.log(values);
    const checkedData = locationSchema.safeParse(values);

    if (!checkedData.success) throw new Error(checkedData.error.message);

    const formData = new FormData();
    formData.append("alt", values.alt);
    formData.append("long", values.long);
    formData.append("lat", values.lat);
    formData.append("location", values.location);
    formData.append("dateTime", values.dateTime);
    formData.append("createdBy", values.createdBy);

    mutate(formData);
  }

  useEffect(() => {
    form.setValue("alt", selectedUnit.locations?.alt || "0");
    form.setValue("long", selectedUnit.locations?.long || "0");
    form.setValue("lat", selectedUnit.locations?.lat || "0");
    form.setValue("location", selectedUnit.locations?.location || "");
    form.setValue("dateTime", new Date().toISOString());
    form.setValue("createdBy", data?.user?.id || "");
  }, [form, selectedUnit.locations, data?.user?.id]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      toast.success("Location updated");
    }
    if (error) {
      toast.error(error.message);
    }
  }, [error, handleClose, isSuccess]);

  return (
    <div className="absolute z-50 bottom-0 left-0 w-screen">
      <Card>
        <CardHeader className="relative">
          <CardTitle>Update Location</CardTitle>
          <CardDescription>Enter detail unit location</CardDescription>
          <div
            className="close absolute top-2 right-2 cursor-pointer"
            onClick={handleClose}
          >
            <X />
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-10">
                <h4 className="col-span-2">Name</h4>
                <Separator orientation="vertical" />
                <p className="col-span-7">{selectedUnit.name}</p>
              </div>
              <div className="grid grid-cols-10">
                <h4 className="col-span-2">Location</h4>
                <Separator orientation="vertical" />
                <div className="col-span-7">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter location name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4 flex items-center gap-2">
                {isLoading && (
                  <ClipLoader
                    size={20}
                    color={theme === "dark" ? "black" : "white"}
                  />
                )}
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateModals;
