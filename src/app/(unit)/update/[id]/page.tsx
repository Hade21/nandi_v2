import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UnitForm from "./unit-form";

const UpdateUnit = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-between items-center gap-2">
            <div className="back">
              <Link href={"/maps"}>
                <ArrowLeft className="cursor-pointer" />
              </Link>
            </div>
            <div className="text-right">
              <CardTitle>
                <h1 className="text-2xl text-red-500">Update Unit</h1>
              </CardTitle>
              <CardDescription>
                <p className="text-sm font-light">
                  Update the details of the unit. <br />
                  Make sure to fill in all the required fields.
                </p>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <UnitForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUnit;
