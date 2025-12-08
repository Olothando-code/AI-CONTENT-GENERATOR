import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-4 py-4 bg-background/80 backdrop-blur-xl border-b border-border lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </Button>
      <h2 className="text-lg font-semibold">{title}</h2>
    </header>
  );
}
