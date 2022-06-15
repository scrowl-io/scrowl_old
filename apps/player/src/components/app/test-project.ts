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
                children: 'Hello World',
                style: {
                  top: '100px',
                  left: '200px',
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
