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
                  left: '3rem',
                },
              },
            },
            {
              type: 'heading',
              props: {
                children: 'Hello World',
                type: 'h1',
                style: {
                  top: '1.5rem',
                  left: '2.5rem',
                },
              },
            },
            {
              type: 'textbox',
              props: {
                children: 'The future is now',
                style: {
                  top: '150px',
                  left: '3rem',
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
