import { ProjectConfig } from '../project/project.types';

export const project: ProjectConfig = {
  name: 'Test Project',
  sections: [
    {
      name: 'Test Lesson',
      blocks: [
        {
          elements: [
            {
              type: 'button',
              props: {
                children: 'Slide One',
                style: {
                  top: '100px',
                  left: '200px',
                },
              },
            },
          ],
        },
        {
          elements: [
            {
              type: 'button',
              props: {
                children: 'Slide Two',
                style: {
                  top: '50px',
                  left: '50px',
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export default {
  project,
};
