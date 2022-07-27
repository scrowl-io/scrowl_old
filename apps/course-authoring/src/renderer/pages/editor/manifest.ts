export const manifest = {
  name: 'Scrowl Player Test',
  sections: [
    {
      name: 'Lesson 1',
      blocks: [
        {
          elements: [
            {
              type: 'button',
              props: {
                children: 'Lesson 1 - Introduction',
                style: {
                  top: '100px',
                  left: '3rem',
                },
              },
            },
            {
              type: 'heading',
              props: {
                children: 'Introduction',
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
                children: 'Welcome to a Scrowl packaged project',
                style: {
                  top: '150px',
                  left: '3rem',
                },
              },
            },
          ],
        }
      ],
    }
  ],
};

export default {
  manifest,
};
