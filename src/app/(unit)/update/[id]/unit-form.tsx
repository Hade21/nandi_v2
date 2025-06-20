"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { useUnitQuery, useUpdateUnit } from "@/hooks/queryUnitHooks";
import { unitSchema, UnitSchema } from "@/schema/unitSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const UnitForm = () => {
  const { theme } = useTheme();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<UnitSchema>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      name: "",
      type: "",
      egi: "",
    },
  });

  const {
    data: unitData,
    error: unitError,
    isLoading,
    isFetching,
  } = useUnitQuery(params.id);
  const { data, error, isPending, mutate } = useUpdateUnit();

  function handleSubmit(values: UnitSchema) {
    setLoading(true);
    // Create a FormData object to send the data as multipart/form-data
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("egi", values.egi);
    formData.append("id", params.id || "");
    mutate(formData);
    console.log("mutating data with values:", values);
  }

  useEffect(() => {
    if (error || unitError) {
      toast.error("Something went wrong", {
        description: error?.message || unitError?.message,
        position: "top-center",
      });
    }
    if (data) {
      toast.success("Unit updated successfully", { position: "top-center" });
      // Reset the form after successful submission
      form.reset();
    }
    if (!isPending && loading) {
      setLoading(false);
    }
    if (unitData) {
      form.setValue("name", unitData.data.name);
      form.setValue("type", unitData.data.type);
      form.setValue("egi", unitData.data.egi);
    }
  }, [
    error,
    data,
    form,
    isPending,
    loading,
    unitError,
    params,
    unitData,
    isLoading,
  ]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-3 bg-re"
        >
          {!isLoading || !isFetching ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name &#40;Unit Number&#41;</FormLabel>
                  <FormControl>
                    <Input placeholder="TL001-0001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <Skeleton className="h-10 w-full" />
          )}
          {!isLoading || !isFetching ? (
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit type</FormLabel>
                  <FormControl>
                    <Input placeholder="Tower Lamp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <Skeleton className="h-10 w-full" />
          )}
          {!isLoading || !isFetching ? (
            <FormField
              control={form.control}
              name="egi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit EGI</FormLabel>
                  <FormControl>
                    <Input placeholder="B5+SV1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <Skeleton className="h-10 w-full" />
          )}
          <div className="buttons flex justify-between items-center mt-4">
            <Button
              type="submit"
              className="min-w-[40%] flex justify-center gap-2"
              disabled={loading}
            >
              {loading && (
                <ClipLoader
                  size={20}
                  color={theme === "dark" ? "black" : "white"}
                />
              )}
              Save
            </Button>
            <Button
              type="reset"
              className="min-w-[40%]"
              variant="destructive"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UnitForm;
