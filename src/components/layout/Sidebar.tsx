import { X, Type, Image, Code, HelpCircle, PanelLeftClose, PanelLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems = [
  { to: "/", icon: Type, label: "Generate Text" },
  { to: "/image", icon: Image, label: "Generate Image" },
  { to: "/code", icon: Code, label: "Generate Code" },
  { to: "/tutorial", icon: HelpCircle, label: "Tutorial" },
];

export function Sidebar({ isOpen, onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-out lg:translate-x-0 lg:static",
          collapsed ? "lg:w-20" : "lg:w-72",
          "w-72",
          isOpen ? "translate-x-0 animate-slide-in" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={cn(
            "flex items-center border-b border-sidebar-border transition-all duration-300",
            collapsed ? "lg:justify-center lg:p-4" : "justify-between p-6"
          )}>
            <h1 className={cn(
              "text-xl font-semibold gradient-text transition-all duration-300",
              collapsed && "lg:hidden"
            )}>
              AI Content Generator
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Desktop collapse toggle */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
            >
              {collapsed ? (
                <PanelLeft className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className={cn(
            "flex-1 space-y-2 transition-all duration-300",
            collapsed ? "lg:p-2" : "p-4"
          )}>
            {navItems.map((item) => (
              <Tooltip key={item.to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl transition-all duration-200",
                        collapsed ? "lg:justify-center lg:px-3 lg:py-3" : "px-4 py-3",
                        "px-4 py-3",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary glow-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )
                    }
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className={cn(
                      "font-medium transition-all duration-300",
                      collapsed && "lg:hidden"
                    )}>
                      {item.label}
                    </span>
                  </NavLink>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="hidden lg:block">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>

          {/* Footer */}
          <div className={cn(
            "border-t border-sidebar-border transition-all duration-300",
            collapsed ? "lg:p-2" : "p-6"
          )}>
            <p className={cn(
              "text-xs text-muted-foreground text-center transition-all duration-300",
              collapsed && "lg:hidden"
            )}>
              Powered by AI
            </p>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
