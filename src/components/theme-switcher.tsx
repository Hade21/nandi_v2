"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "./animate-ui/base/switch";

const ThemeSwitcher = () => {
  const [checked, setChecked] = useState(false);
  const ThumbIcon = checked ? <MoonIcon /> : <SunIcon />;
  const { setTheme } = useTheme();

  useEffect(() => {
    if (checked) setTheme("dark");
    else setTheme("light");
  }, [checked, setTheme]);

  return (
    <div>
      <Switch
        checked={checked}
        onCheckedChange={(value) => setChecked(value)}
        aria-label="Toggle theme switcher"
        leftIcon={<SunIcon />}
        rightIcon={<MoonIcon />}
        thumbIcon={ThumbIcon}
      />
    </div>
  );
};

export default ThemeSwitcher;
