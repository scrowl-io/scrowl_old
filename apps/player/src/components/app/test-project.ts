import { ProjectConfig } from '../project/project.types';

export const project: ProjectConfig = {
  name: 'Test Project',
  sections: [
    {
      name: 'Lesson 1',
      blocks: [
        {
          elements: [
            {
              type: 'button',
              props: {
                children: 'Lesson 1 - Slide One',
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
                children: 'Lesson 1 - Slide Two',
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
    {
      name: 'Lesson 2',
      blocks: [
        {
          elements: [
            {
              type: 'button',
              props: {
                children: 'Lesson 2 - Slide One',
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
                children: 'Lesson 2 - Slide Two',
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
