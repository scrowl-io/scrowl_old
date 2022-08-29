export const data = {
  name: 'Untitled Project',
  modules: [
    {
      name: 'An Introduction to Harassment & Discrimination',
      lessons: [
        {
          name: 'Building a Respectful Workplace',
          slides: [
            {
              name: 'Introduction',
              template: {
                version: '1.0.0',
                slide: {
                  aspect: '16:9',
                },
                meta: {
                  name: 'image grid',
                  component: 'ImageGrid',
                },
                elements: {
                  componentExample: {
                    editable: true,
                    value: 'Hello World',
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export default data;
