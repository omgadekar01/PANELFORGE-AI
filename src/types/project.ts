export interface Character {
  id: string;
  name: string;
  description: string;
  emotion: string;
  locked: boolean;
  variant: number;
  role: string;
  appearance: string;
}

export interface Panel {
  id: string;
  number: number;
  shot: string;
  action: string;
  emotion: string;
  speaker?: string;
  dialogue?: string;
  variant: number;
  character?: string;
}

export interface Project {
  id: string;
  name: string;
  story: string;
  style: string;
  panelCount: number;
  characters: Character[];
  panels: Panel[];
  scenes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
