"use client";

import { X, Plus, FolderOpen, Share2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  ownerId: string;
}

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
  onCreateNewProject: () => void;
  onRenameProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  activeProjectId,
  onSelectProject,
  onCreateNewProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.ownerId === "user_me");
  const sharedProjects = projects.filter((p) => p.ownerId !== "user_me");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop layer to capture clicks and close the sidebar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/40 xl:bg-transparent"
            onClick={onClose}
          />

          {/* Sidebar drawer container */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-80 bg-surface/95 border-r border-surface-border text-copy-primary backdrop-blur-md shadow-2xl flex flex-col justify-between"
          >
            <div className="flex flex-col flex-1 p-5 min-h-0">
              {/* Header section with heading and close icon */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                <span className="text-sm font-semibold tracking-tight text-copy-primary">
                  Projects
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={onClose}
                  aria-label="Close sidebar"
                  className="text-copy-muted hover:text-copy-primary hover:bg-subtle transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Main content tabs with empty state visualizer */}
              <div className="flex-1 min-h-0 pt-4 flex flex-col">
                <Tabs defaultValue="my-projects" className="flex flex-col flex-grow min-h-0">
                  <TabsList className="grid grid-cols-2 w-full bg-subtle p-0.5 rounded-lg border border-surface-border">
                    <TabsTrigger 
                      value="my-projects"
                      className="data-active:bg-elevated text-xs py-1.5 transition-all text-copy-muted data-active:text-copy-primary font-medium"
                    >
                      My Projects
                    </TabsTrigger>
                    <TabsTrigger 
                      value="shared"
                      className="data-active:bg-elevated text-xs py-1.5 transition-all text-copy-muted data-active:text-copy-primary font-medium"
                    >
                      Shared
                    </TabsTrigger>
                  </TabsList>

                  {/* Scrollable area for tab lists */}
                  <div className="flex-1 min-h-0 mt-4">
                    <ScrollArea className="h-full">
                      <TabsContent value="my-projects" className="h-full focus-visible:outline-none">
                        {ownedProjects.length > 0 ? (
                          <div className="flex flex-col gap-1 pr-2">
                            {ownedProjects.map((project) => {
                              const isActive = project.id === activeProjectId;
                              return (
                                <div
                                  key={project.id}
                                  className={`group flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-all duration-150 cursor-pointer ${
                                    isActive
                                      ? "bg-brand/15 border-l-2 border-brand text-brand font-medium"
                                      : "hover:bg-subtle text-copy-secondary hover:text-copy-primary"
                                  }`}
                                  onClick={() => {
                                    onSelectProject(project.id);
                                    onClose(); // Close sidebar on mobile/selection
                                  }}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <FolderOpen className={`h-4 w-4 shrink-0 ${isActive ? "text-brand" : "text-copy-muted"}`} />
                                    <div className="flex flex-col truncate min-w-0">
                                      <span className="truncate font-medium">{project.name}</span>
                                      {project.description && (
                                        <span className="text-[10px] text-copy-muted truncate mt-0.5 font-normal">
                                          {project.description}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Actions - show rename/delete buttons on hover/group-hover */}
                                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity pl-2 shrink-0">
                                    <Button
                                      variant="ghost"
                                      size="icon-xs"
                                      className="h-6 w-6 rounded text-copy-muted hover:text-copy-primary hover:bg-elevated cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onRenameProject(project.id);
                                      }}
                                      aria-label="Rename project"
                                    >
                                      <Pencil className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon-xs"
                                      className="h-6 w-6 rounded text-copy-muted hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteProject(project.id);
                                      }}
                                      aria-label="Delete project"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-subtle/50 border border-surface-border mb-4">
                              <FolderOpen className="h-5 w-5 text-brand" />
                            </div>
                            <span className="text-sm font-medium text-copy-primary">
                              No projects yet
                            </span>
                            <p className="text-xs text-copy-muted mt-1 max-w-[200px] leading-normal">
                              Create your first workspace to start architecting systems.
                            </p>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="shared" className="h-full focus-visible:outline-none">
                        {sharedProjects.length > 0 ? (
                          <div className="flex flex-col gap-1 pr-2">
                            {sharedProjects.map((project) => {
                              const isActive = project.id === activeProjectId;
                              return (
                                <div
                                  key={project.id}
                                  className={`group flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-all duration-150 cursor-pointer ${
                                    isActive
                                      ? "bg-brand/15 border-l-2 border-brand text-brand font-medium"
                                      : "hover:bg-subtle text-copy-secondary hover:text-copy-primary"
                                  }`}
                                  onClick={() => {
                                    onSelectProject(project.id);
                                    onClose(); // Close sidebar on mobile/selection
                                  }}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <FolderOpen className={`h-4 w-4 shrink-0 ${isActive ? "text-brand" : "text-copy-muted"}`} />
                                    <div className="flex flex-col truncate min-w-0">
                                      <span className="truncate font-medium">{project.name}</span>
                                      {project.description && (
                                        <span className="text-[10px] text-copy-muted truncate mt-0.5 font-normal">
                                          {project.description}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-subtle/50 border border-surface-border mb-4">
                              <Share2 className="h-5 w-5 text-accent-ai-text" />
                            </div>
                            <span className="text-sm font-medium text-copy-primary">
                              No shared workspaces
                            </span>
                            <p className="text-xs text-copy-muted mt-1 max-w-[200px] leading-normal">
                              Systems shared with you by collaborators will appear here.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </ScrollArea>
                  </div>
                </Tabs>
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="p-4 border-t border-surface-border bg-subtle/20">
              <Button
                id="btn-new-project"
                variant="default"
                onClick={onCreateNewProject}
                className="w-full h-10 gap-2 bg-brand hover:bg-brand/90 text-bg-base font-medium transition-all duration-200 cursor-pointer"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                New Project
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
