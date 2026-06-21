"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  projectName?: string;
}

export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
  projectName = "Untitled System",
}: EditorNavbarProps) {
  return (
    <header 
      id="editor-navbar"
      className="h-14 border-b border-surface-border bg-surface flex items-center justify-between px-4 sticky top-0 z-40 select-none"
    >
      {/* Left Section - Toggle button & project breadcrumb */}
      <div className="flex items-center gap-3">
        <Button
          id="sidebar-toggle-btn"
          variant="ghost"
          size="icon-sm"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="text-copy-secondary hover:text-copy-primary hover:bg-subtle transition-colors"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
        <span className="text-sm font-medium text-copy-secondary">
          {projectName}
        </span>
      </div>

      {/* Center Section - Minimalist App Brand */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
        <span className="font-sans font-medium tracking-wider text-copy-primary text-xs uppercase">
          Ghost AI
        </span>
      </div>

      {/* Right Section - Empty for now */}
      <div className="flex items-center gap-2 w-10 sm:w-28" />
    </header>
  );
}
