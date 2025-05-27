import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to{" "}
            <span className="font-[family-name:var(--font-rubik-moonrocks)] text-blue-500">
              Nandi
            </span>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Login;
