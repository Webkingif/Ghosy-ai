"use client";

import { useState } from "react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Sparkles, Code, Play, Plus } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const {
    projects,
    activeProjectId,
    activeProject,
    dialogState,
    formState,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    handleNameChange,
    handleDescriptionChange,
    handleCreateProject,
    handleRenameProject,
    handleDeleteProject,
    selectProject,
  } = useProjects();

  const workspaceProjectName = activeProject ? activeProject.name : "No project open";

  return (
    <div className="flex h-screen w-screen flex-col bg-base text-copy-primary overflow-hidden font-sans select-none">
      {/* 1. Base Workspace Navbar */}
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        projectName={workspaceProjectName}
      />

      {/* 2. Floating Sidebar */}
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={selectProject}
        onCreateNewProject={() => {
          setIsSidebarOpen(false);
          openCreateDialog();
        }}
        onRenameProject={(id) => {
          setIsSidebarOpen(false);
          openRenameDialog(id);
        }}
        onDeleteProject={(id) => {
          setIsSidebarOpen(false);
          openDeleteDialog(id);
        }}
      />

      {/* 3. Main Workspace Area (The Design Canvas mock) */}
      <main className="relative flex-1 bg-base min-w-0 transition-all duration-300">
        {/* Subtle grid background to simulate React Flow and system designer context */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{
            backgroundImage: "radial-gradient(var(--border-default) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient background decoration */}
        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 pointer-events-none bg-accent-dim blur-[140px] rounded-full opacity-65" />

        {activeProject ? (
          /* Active Project Workspace View */
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-xl p-8 rounded-3xl bg-surface/85 border border-surface-border shadow-2xl backdrop-blur-md flex flex-col gap-6 relative z-10">
              {/* Tech tag */}
              <div className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-subtle/70 border border-surface-border text-[0.7rem] uppercase tracking-wider text-brand font-medium">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Engine V1.0 Ready
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col gap-1.5">
                <h1 className="text-xl font-semibold tracking-tight text-copy-primary font-sans antialiased">
                  {activeProject.name}
                </h1>
                <p className="text-xs text-copy-muted leading-relaxed">
                  {activeProject.description || "Describe your desired system architecture (e.g., \"microservice platform with Kafka message broker and Redis caching\"). Our AI generator will map nodes and connections inside the collaborative canvas."}
                </p>
              </div>

              {/* Mini Prompt Generator Box */}
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your system architecture in plain English..."
                    className="min-h-[100px] w-full resize-none rounded-xl border border-surface-border bg-base/50 p-3.5 text-xs text-copy-primary placeholder:text-copy-faint focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand transition-all font-sans"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-copy-faint">
                    <Code className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-mono select-none">No active rooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsSidebarOpen(true)}
                      className="h-8.5 rounded-lg text-xs cursor-pointer"
                    >
                      Open Projects
                    </Button>
                    <Button
                      variant="default"
                      className="h-8.5 rounded-lg text-xs gap-1.5 bg-brand text-bg-base hover:bg-brand/90 font-medium cursor-pointer"
                      onClick={() => {
                        if (!prompt) return;
                        alert(`Mocking system design for: "${prompt}"`);
                      }}
                    >
                      Generate Design
                      <Play className="h-3 w-3 fill-current" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Editor Home View (Minimalist, no cards) */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight text-copy-primary font-sans antialiased mb-2">
              Create a project or open an existing one
            </h1>
            <p className="text-sm text-copy-muted mb-6 leading-relaxed max-w-md">
              Start a new architecture workspace, or choose a project from the sidebar.
            </p>
            <Button
              variant="default"
              className="h-10 px-5 rounded-lg text-sm gap-2 bg-brand text-bg-base hover:bg-brand/90 font-medium cursor-pointer shadow-lg shadow-brand/10 transition-all"
              onClick={openCreateDialog}
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              New Project
            </Button>
          </div>
        )}
      </main>

      {/* Dynamic Dialogs (Create, Rename, Delete) */}
      <Dialog 
        open={dialogState.isOpen} 
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
      >
        <DialogContent className="max-w-md bg-surface border border-surface-border rounded-2xl p-6 shadow-2xl">
          {dialogState.type === "create" && (
            <form onSubmit={(e) => { e.preventDefault(); handleCreateProject(); }} className="flex flex-col gap-5">
              <DialogHeader>
                <DialogTitle className="text-md font-semibold text-copy-primary font-sans">
                  Create New Project
                </DialogTitle>
                <DialogDescription className="text-xs text-copy-muted">
                  Define the workspace settings for your interactive system architecture.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="create-project-name" className="text-[11px] font-semibold text-copy-muted uppercase tracking-wider">
                    Project Name
                  </label>
                  <Input
                    id="create-project-name"
                    value={formState.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Serverless API Platform"
                    required
                    autoFocus
                    className="h-9 rounded-lg border border-surface-border bg-base/50 text-xs px-3 focus-visible:ring-1 focus-visible:ring-brand text-copy-primary placeholder:text-copy-faint"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-copy-muted uppercase tracking-wider">
                    Project Slug Preview
                  </span>
                  <div className="text-xs font-mono text-brand/80 truncate py-1.5 px-3 bg-brand/5 border border-brand/10 rounded-lg select-all">
                    {formState.slug || "your-slug-here"}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="create-project-desc" className="text-[11px] font-semibold text-copy-muted uppercase tracking-wider">
                    Description
                  </label>
                  <Textarea
                    id="create-project-desc"
                    value={formState.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Brief description of the stack or intent (optional)"
                    className="min-h-[80px] rounded-lg border border-surface-border bg-base/50 text-xs p-3 focus-visible:ring-1 focus-visible:ring-brand text-copy-primary placeholder:text-copy-faint resize-none"
                  />
                </div>
              </div>

              <DialogFooter className="mt-2 border-t border-surface-border pt-4 -mx-6 -mb-6 px-6 bg-subtle/30 rounded-b-2xl">
                <Button
                  variant="outline"
                  type="button"
                  onClick={closeDialog}
                  className="h-8.5 rounded-lg text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  type="submit"
                  disabled={dialogState.loading}
                  className="h-8.5 rounded-lg text-xs bg-brand text-bg-base hover:bg-brand/90 font-semibold cursor-pointer"
                >
                  {dialogState.loading ? "Creating..." : "Create Workspace"}
                </Button>
              </DialogFooter>
            </form>
          )}

          {dialogState.type === "rename" && (
            <form onSubmit={(e) => { e.preventDefault(); handleRenameProject(); }} className="flex flex-col gap-5">
              <DialogHeader>
                <DialogTitle className="text-md font-semibold text-copy-primary font-sans">
                  Rename Project
                </DialogTitle>
                <DialogDescription className="text-xs text-copy-muted">
                  Currently renaming <span className="font-semibold text-copy-primary">{projects.find(p => p.id === dialogState.targetProjectId)?.name}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rename-project-name" className="text-[11px] font-semibold text-copy-muted uppercase tracking-wider">
                    New Project Name
                  </label>
                  <Input
                    id="rename-project-name"
                    value={formState.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter new project name"
                    required
                    autoFocus
                    className="h-9 rounded-lg border border-surface-border bg-base/50 text-xs px-3 focus-visible:ring-1 focus-visible:ring-brand text-copy-primary placeholder:text-copy-faint"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-copy-muted uppercase tracking-wider">
                    Project Slug Preview
                  </span>
                  <div className="text-xs font-mono text-brand/80 truncate py-1.5 px-3 bg-brand/5 border border-brand/10 rounded-lg select-all">
                    {formState.slug || "your-slug-here"}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rename-project-desc" className="text-[11px] font-semibold text-copy-muted uppercase tracking-wider">
                    Description
                  </label>
                  <Textarea
                    id="rename-project-desc"
                    value={formState.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Brief description of the stack or intent (optional)"
                    className="min-h-[80px] rounded-lg border border-surface-border bg-base/50 text-xs p-3 focus-visible:ring-1 focus-visible:ring-brand text-copy-primary placeholder:text-copy-faint resize-none"
                  />
                </div>
              </div>

              <DialogFooter className="mt-2 border-t border-surface-border pt-4 -mx-6 -mb-6 px-6 bg-subtle/30 rounded-b-2xl">
                <Button
                  variant="outline"
                  type="button"
                  onClick={closeDialog}
                  className="h-8.5 rounded-lg text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  type="submit"
                  disabled={dialogState.loading}
                  className="h-8.5 rounded-lg text-xs bg-brand text-bg-base hover:bg-brand/90 font-semibold cursor-pointer"
                >
                  {dialogState.loading ? "Renaming..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}

          {dialogState.type === "delete" && (
            <div className="flex flex-col gap-5">
              <DialogHeader>
                <DialogTitle className="text-md font-semibold text-destructive font-sans">
                  Delete Project
                </DialogTitle>
                <DialogDescription className="text-xs text-copy-muted leading-relaxed">
                  Are you sure you want to delete <span className="font-semibold text-copy-primary">{projects.find(p => p.id === dialogState.targetProjectId)?.name}</span>? This action is permanent and cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="mt-2 border-t border-surface-border pt-4 -mx-6 -mb-6 px-6 bg-subtle/30 rounded-b-2xl">
                <Button
                  variant="outline"
                  type="button"
                  onClick={closeDialog}
                  className="h-8.5 rounded-lg text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  type="button"
                  disabled={dialogState.loading}
                  onClick={handleDeleteProject}
                  className="h-8.5 rounded-lg text-xs bg-destructive text-white hover:bg-destructive/90 font-semibold border-none cursor-pointer"
                >
                  {dialogState.loading ? "Deleting..." : "Delete Project"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
