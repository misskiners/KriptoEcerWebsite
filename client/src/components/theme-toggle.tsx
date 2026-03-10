import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

type Theme = "dark" | "light" | "system";

const cycleMap: Record<Theme, Theme> = {
  system: "dark",
  dark: "light",
  light: "system",
};

const labels: Record<Theme, string> = {
  system: "Ikuti perangkat",
  dark: "Mode gelap",
  light: "Mode terang",
};

const icons: Record<Theme, JSX.Element> = {
  system: <Monitor className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  light: <Sun className="h-5 w-5" />,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(cycleMap[theme])}
      title={labels[theme]}
      data-testid="button-theme-toggle"
    >
      {icons[theme]}
      <span className="sr-only">{labels[theme]}</span>
    </Button>
  );
}
