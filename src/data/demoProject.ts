import type { Project } from '../types/project';

export const demoProject: Project = {
  id: 'demo-project',
  name: 'The Last Signal',
  story:
    'A young engineer enters an abandoned railway station at midnight. A strange blue light appears at the end of the platform. She walks toward it and discovers an old robot waiting beside a broken train.',
  style: 'Ink & Manga',
  panelCount: 4,
  scenes: ['Abandoned Railway Station', 'Blue Light', 'Platform Edge', 'Broken Train'],
  characters: [
    {
      id: 'maya',
      name: 'Maya',
      description: 'Young female engineer with short dark hair, blue jacket and backpack.',
      emotion: 'Curious',
      locked: true,
      variant: 1,
      role: 'Main Character',
      appearance: 'Young female engineer, short dark hair, blue jacket, backpack.',
    },
    {
      id: 'atlas',
      name: 'Atlas',
      description: 'Old industrial robot with scratched metal body and glowing blue eye.',
      emotion: 'Guarded',
      locked: true,
      variant: 1,
      role: 'Supporting Character',
      appearance: 'Old industrial robot with scratched metal shell and glowing blue eye.',
    },
  ],
  panels: [
    {
      id: 'panel-1',
      number: 1,
      shot: 'Wide Shot',
      action: 'Maya enters the abandoned station.',
      emotion: 'Cautious',
      speaker: 'Maya',
      dialogue: '',
      variant: 1,
      character: 'Maya',
    },
    {
      id: 'panel-2',
      number: 2,
      shot: 'Medium Shot',
      action: 'Maya notices a blue light.',
      emotion: 'Surprised',
      speaker: 'Maya',
      dialogue: 'What is that?',
      variant: 1,
      character: 'Maya',
    },
    {
      id: 'panel-3',
      number: 3,
      shot: 'Close Up',
      action: 'Maya approaches the mysterious light.',
      emotion: 'Curious',
      speaker: 'Maya',
      dialogue: '',
      variant: 2,
      character: 'Maya',
    },
    {
      id: 'panel-4',
      number: 4,
      shot: 'Wide Shot',
      action: 'An old robot appears beside the train.',
      emotion: 'Shock',
      speaker: 'Atlas',
      dialogue: 'You finally came.',
      variant: 2,
      character: 'Atlas',
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const createProjectFromStory = (
  name: string,
  story: string,
  style: string,
  panelCount: number,
): Project => {
  const cleanedName = name.trim() || 'New Project';
  const baseStory = story.trim() || 'A lone hero enters a forgotten place and discovers a hidden truth.';

  return {
    id: `project-${Date.now()}`,
    name: cleanedName,
    story: baseStory,
    style,
    panelCount,
    scenes: ['Opening Moment', 'Unexpected Signal', 'Hidden Path', 'Final Reveal'].slice(
      0,
      Math.max(2, Math.min(4, panelCount / 2)),
    ),
    characters: [
      {
        id: 'maya',
        name: 'Maya',
        description: 'Young female engineer with short dark hair, blue jacket and backpack.',
        emotion: 'Curious',
        locked: true,
        variant: 1,
        role: 'Main Character',
        appearance: 'Young female engineer, short dark hair, blue jacket, backpack.',
      },
      {
        id: 'atlas',
        name: 'Atlas',
        description: 'Old industrial robot with scratched metal body and glowing blue eye.',
        emotion: 'Guarded',
        locked: true,
        variant: 1,
        role: 'Supporting Character',
        appearance: 'Old industrial robot with scratched metal shell and glowing blue eye.',
      },
    ],
    panels: Array.from({ length: panelCount }, (_, index) => ({
      id: `panel-${index + 1}`,
      number: index + 1,
      shot: ['Wide Shot', 'Medium Shot', 'Close Up', 'Tracking Shot'][index % 4],
      action:
        index === 0
          ? 'The hero steps into the scene.'
          : index === 1
            ? 'A mysterious signal disrupts the silence.'
            : index === 2
              ? 'The protagonist investigates the anomaly.'
              : 'The reveal lands with a dramatic twist.',
      emotion: ['Cautious', 'Surprised', 'Curious', 'Shock'][index % 4],
      speaker: index % 2 === 0 ? 'Maya' : 'Atlas',
      dialogue: index % 2 === 0 ? '' : 'The signal was waiting for you.',
      variant: (index % 3) + 1,
      character: index % 2 === 0 ? 'Maya' : 'Atlas',
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
