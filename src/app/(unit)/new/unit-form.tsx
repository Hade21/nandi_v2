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
import { useAddUnit } from "@/hooks/queryUnitHooks";
import { unitSchema, UnitSchema } from "@/schema/unitSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const UnitForm = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<UnitSchema>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      name: "",
      type: "",
      egi: "",
    },
  });

  const { data, error, isPending, mutate } = useAddUnit();

  function handleSubmit(values: UnitSchema) {
    setLoading(true);
    // Create a FormData object to send the data as multipart/form-data
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("egi", values.egi);
    mutate(formData);
  }

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        description: error.message,
        position: "top-center",
      });
    }
    if (data) {
      toast.success("Unit added successfully", { position: "top-center" });
      // Reset the form after successful submission
      form.reset();
    }
    if (!isPending && loading) {
      setLoading(false);
    }
  }, [error, data, form, isPending, loading]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-3 bg-re"
        >
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
