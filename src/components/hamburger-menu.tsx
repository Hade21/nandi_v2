"use client";

import { cn } from "@/lib/utils";
import { LogIn, LogOut, SquarePlus, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {" "}
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />{" "}
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />{" "}
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />{" "}
  </svg>
);

const HamburgerMenu = () => {
  const session = useSession();
  const router = useRouter();

  function handleLogout() {
    signOut();
  }
  function handleLogin() {
    router.push("/auth/login");
  }

  return (
    <div className="absolute -top-[98vh] right-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
            variant="outline"
            size="icon"
          >
            <HamburgerIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="flex flex-col gap-4 w-fit">
            <div>
              {session.status === "authenticated" ? (
                <Link href={`/profile/${session?.data?.user?.id}`}>
                  <p className="font-medium text-sm cursor-pointer flex gap-2 items-center">
                    <Image
                      src={session?.data?.user?.profilePict}
                      alt={session?.data?.user?.firstName}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    {`${session?.data?.user?.firstName} ${session?.data?.user?.lastName}`}
                  </p>
                </Link>
              ) : (
                <p className="font-medium text-sm flex gap-2 items-center">
                  <User width={30} height={30} />
                  Profile
                </p>
              )}
            </div>
            <Separator />
            <div>
              <Link href={"/new"}>
                <p className="flex gap-2 items-center font-medium text-sm cursor-pointer">
                  <SquarePlus width={30} height={30} />
                  Add New Unit
                </p>
              </Link>
            </div>
            <Separator />
            <div>
              <Button
                className="w-full"
                variant="ghost"
                onClick={
                  session.status === "authenticated"
                    ? handleLogout
                    : handleLogin
                }
                type="button"
              >
                {session.status === "authenticated" ? (
                  <p className="flex gap-2 items-center font-medium text-sm cursor-pointer">
                    <LogOut width={30} height={30} />
                    Logout
                  </p>
                ) : (
                  <p className="flex gap-2 items-center font-medium text-sm cursor-pointer">
                    <LogIn width={30} height={30} />
                    Login
                  </p>
                )}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HamburgerMenu;
