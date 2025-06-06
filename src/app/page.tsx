import { BubbleBackground } from "@/components/animate-ui/backgrounds/bubble";
import { GradientText } from "@/components/animate-ui/text/gradient";
import MapPin from "@/components/animated-icon/mappin";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="w-full h-screen flex flex-col justify-center items-center relative bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70">
        <div className="absolute top-5 right-5">
          <ThemeSwitcher />
        </div>
        <div className="title">
          <h1 className="text-5xl font-bold flex flex-wrap gap-y-2 justify-center gap-3 items-center relative -translate-x-3">
            <GradientText text="Welcome to" />
            <span className="font-[family-name:var(--font-rubik-moonrocks)] text-blue-500">
              Nandi
            </span>
            <span className="-translate-y-3">
              <MapPin size={78} />
            </span>
          </h1>
        </div>
        <div className="desc">
          <p className="text-base font-light text-slate-800 italic dark:text-slate-300">
            Find me anywhere around the world
          </p>
        </div>
        <div className="action mt-4 flex flex-col gap-2 items-center">
          <div className="register-login flex justify-center gap-4">
            <Link href="/auth/register">
              <Button variant={"default"}>Register</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant={"default"}>Login</Button>
            </Link>
          </div>
          <p>or</p>
          <div className="guest">
            <Link href="/maps">
              <Button variant={"outline"}>Continue as Guest</Button>
            </Link>
          </div>
        </div>
        <footer className="absolute bottom-3 text-sm">
          &copy; 2025 by Hade21 | All rights reserved
        </footer>
        <BubbleBackground interactive className="absolute inset-0 -z-50" />
      </main>
    </div>
  );
}
