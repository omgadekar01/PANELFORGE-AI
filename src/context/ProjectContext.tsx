import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createProjectFromStory, demoProject } from '../data/demoProject';
import type { Character, Panel, Project } from '../types/project';

const STORAGE_KEY = 'panelforge_projects';

interface ProjectContextValue {
  project: Project | null;
  toasts: { id: number; message: string; type: 'success' | 'error' | 'info' }[];
  createProject: (input: { name: string; story: string; style: string; panelCount: number }) => Project;
  updateProject: (patch: Partial<Project>) => void;
  updateCharacter: (id: string, patch: Partial<Character>) => void;
  updatePanel: (id: string, patch: Partial<Panel>) => void;
  deletePanel: (id: string) => void;
  regeneratePanel: (id: string) => void;
  regenerateCharacter: (id: string) => void;
  lockCharacter: (id: string) => void;
  saveProject: (projectToSave: Project) => void;
  loadProject: () => Project;
  pushToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

const readStoredProject = (): Project => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return demoProject;
    const parsed = JSON.parse(raw) as Project;
    return parsed && parsed.name ? parsed : demoProject;
  } catch {
    return demoProject;
  }
};

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project | null>(() => readStoredProject());
  const [toasts, setToasts] = useState<ProjectContextValue['toasts']>([]);

  const pushToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2500);
  };

  const saveProject = (projectToSave: Project) => {
    setProject(projectToSave);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectToSave));
  };

  const loadProject = () => {
    const loaded = readStoredProject();
    setProject(loaded);
    return loaded;
  };

  const updateProject = (patch: Partial<Project>) => {
    setProject((current) => {
      if (!current) return current;
      const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const updateCharacter = (id: string, patch: Partial<Character>) => {
    setProject((current) => {
      if (!current) return current;
      const next = {
        ...current,
        characters: current.characters.map((character) =>
          character.id === id ? { ...character, ...patch } : character,
        ),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const updatePanel = (id: string, patch: Partial<Panel>) => {
    setProject((current) => {
      if (!current) return current;
      const next = {
        ...current,
        panels: current.panels.map((panel) =>
          panel.id === id ? { ...panel, ...patch } : panel,
        ),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const deletePanel = (id: string) => {
    setProject((current) => {
      if (!current) return current;
      const filtered = current.panels.filter((panel) => panel.id !== id);
      const remapped = filtered.map((panel, index) => ({ ...panel, number: index + 1 }));
      const next = { ...current, panels: remapped, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const regeneratePanel = (id: string) => {
    setProject((current) => {
      if (!current) return current;
      const next = {
        ...current,
        panels: current.panels.map((panel) =>
          panel.id === id ? { ...panel, variant: (panel.variant % 4) + 1 } : panel,
        ),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const regenerateCharacter = (id: string) => {
    setProject((current) => {
      if (!current) return current;
      const next = {
        ...current,
        characters: current.characters.map((character) =>
          character.id === id ? { ...character, variant: (character.variant % 4) + 1 } : character,
        ),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const lockCharacter = (id: string) => {
    setProject((current) => {
      if (!current) return current;
      const next = {
        ...current,
        characters: current.characters.map((character) =>
          character.id === id ? { ...character, locked: !character.locked } : character,
        ),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const createProject = ({
    name,
    story,
    style,
    panelCount,
  }: {
    name: string;
    story: string;
    style: string;
    panelCount: number;
  }) => {
    const generated = createProjectFromStory(name, story, style, panelCount);
    setProject(generated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(generated));
    return generated;
  };

  useEffect(() => {
    if (project) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    }
  }, [project]);

  const value = useMemo<ProjectContextValue>(
    () => ({
      project,
      toasts,
      createProject,
      updateProject,
      updateCharacter,
      updatePanel,
      deletePanel,
      regeneratePanel,
      regenerateCharacter,
      lockCharacter,
      saveProject,
      loadProject,
      pushToast,
    }),
    [project, toasts],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used inside ProjectProvider');
  }
  return context;
}
