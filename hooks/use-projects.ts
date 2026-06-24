"use client";

import { useState } from "react";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  ownerId: string; // "user_me" or "user_other"
}

export type DialogType = "create" | "rename" | "delete" | null;

export interface DialogState {
  type: DialogType;
  isOpen: boolean;
  targetProjectId: string | null;
  loading: boolean;
}

export interface FormState {
  name: string;
  slug: string;
  description: string;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    name: "E-Commerce Microservices",
    slug: "e-commerce-microservices",
    description: "A scale-out microservices platform with event-driven architecture.",
    ownerId: "user_me",
  },
  {
    id: "2",
    name: "Serverless Payment Gateway",
    slug: "serverless-payment-gateway",
    description: "Real-time payment clearing platform with Stripe integration.",
    ownerId: "user_me",
  },
  {
    id: "3",
    name: "Realtime Chat Backend",
    slug: "realtime-chat-backend",
    description: "Shared workspace for our team's socket server layout.",
    ownerId: "user_other",
  },
];

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const [dialogState, setDialogState] = useState<DialogState>({
    type: null,
    isOpen: false,
    targetProjectId: null,
    loading: false,
  });

  const [formState, setFormState] = useState<FormState>({
    name: "",
    slug: "",
    description: "",
  });

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  const openCreateDialog = () => {
    setFormState({
      name: "",
      slug: "",
      description: "",
    });
    setDialogState({
      type: "create",
      isOpen: true,
      targetProjectId: null,
      loading: false,
    });
  };

  const openRenameDialog = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    setFormState({
      name: project.name,
      slug: project.slug,
      description: project.description || "",
    });
    setDialogState({
      type: "rename",
      isOpen: true,
      targetProjectId: projectId,
      loading: false,
    });
  };

  const openDeleteDialog = (projectId: string) => {
    setDialogState({
      type: "delete",
      isOpen: true,
      targetProjectId: projectId,
      loading: false,
    });
  };

  const closeDialog = () => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNameChange = (name: string) => {
    setFormState((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleDescriptionChange = (description: string) => {
    setFormState((prev) => ({
      ...prev,
      description,
    }));
  };

  const handleCreateProject = () => {
    if (!formState.name.trim()) return;
    setDialogState((prev) => ({ ...prev, loading: true }));

    setTimeout(() => {
      const newProject: Project = {
        id: Date.now().toString(),
        name: formState.name,
        slug: formState.slug || generateSlug(formState.name),
        description: formState.description,
        ownerId: "user_me",
      };
      setProjects((prev) => [...prev, newProject]);
      setActiveProjectId(newProject.id);
      setDialogState({
        type: null,
        isOpen: false,
        targetProjectId: null,
        loading: false,
      });
    }, 400);
  };

  const handleRenameProject = () => {
    const targetId = dialogState.targetProjectId;
    if (!targetId || !formState.name.trim()) return;
    setDialogState((prev) => ({ ...prev, loading: true }));

    setTimeout(() => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === targetId
            ? {
                ...p,
                name: formState.name,
                slug: formState.slug || generateSlug(formState.name),
                description: formState.description,
              }
            : p
        )
      );
      setDialogState({
        type: null,
        isOpen: false,
        targetProjectId: null,
        loading: false,
      });
    }, 400);
  };

  const handleDeleteProject = () => {
    const targetId = dialogState.targetProjectId;
    if (!targetId) return;
    setDialogState((prev) => ({ ...prev, loading: true }));

    setTimeout(() => {
      setProjects((prev) => prev.filter((p) => p.id !== targetId));
      if (activeProjectId === targetId) {
        setActiveProjectId(null);
      }
      setDialogState({
        type: null,
        isOpen: false,
        targetProjectId: null,
        loading: false,
      });
    }, 400);
  };

  const selectProject = (projectId: string) => {
    setActiveProjectId(projectId);
  };

  return {
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
    setDialogState,
    setFormState,
  };
}
