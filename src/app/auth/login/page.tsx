import UserForm from "@/app/auth/login/user-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="back">
              <Link href={"/"}>
                <ArrowLeft className="cursor-pointer" />
              </Link>
            </div>
            <div className="text-right">
              <CardTitle>
                <h1 className="text-2xl">
                  Welcome to{" "}
                  <span className="font-[family-name:var(--font-rubik-moonrocks)] text-blue-500">
                    Nandi
                  </span>
                </h1>
              </CardTitle>
              <CardDescription>
                <p className="text-sm font-thin">
                  Login to get access all features
                </p>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
