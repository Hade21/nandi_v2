"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Switch } from "./animate-ui/base/switch";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const [checked, setChecked] = useState(false);
  const ThumbIcon = checked ? <MoonIcon /> : <SunIcon />;
  const { setTheme } = useTheme();

  useEffect(() => {
    if (checked) setTheme("dark");
    else setTheme("light");
  }, [checked, setTheme]);

  return (
    <div className="flex items-center space-x-3">
      <Switch
        checked={checked}
        onCheckedChange={(value) => setChecked(value)}
        aria-label="Toggle theme switcher"
        leftIcon={<SunIcon className="-translate-y-1/2" />}
        rightIcon={<MoonIcon className="-translate-y-1/2" />}
        thumbIcon={ThumbIcon}
      />
    </div>
  );
};

export default ThemeSwitcher;
