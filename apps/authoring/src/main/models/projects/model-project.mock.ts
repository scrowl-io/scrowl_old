import { ProjectData } from './model-projects.types';

export const data: ProjectData = {
  name: 'Untitled Project',
  description: '',
  scormConfig: {
    name: 'Untitled Course',
    description: '',
    authors: '',
  },
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
        {
          name: 'What is Harassment vs. Discrimination?',
          slides: [
            {
              name: 'Slide 1',
            },
            {
              name: 'Slide 2',
            },
            {
              name: 'Slide 3',
            },
          ],
        },
      ],
    },
    {
      name: 'Sexual Harassment',
      lessons: [
        {
          name: 'What is Sexual Harassment?',
          slides: [
            {
              name: 'Slide 1',
            },
          ],
        },
      ],
    },
    {
      name: 'Additional Training For Supervisors',
      lessons: [
        {
          name: 'Preventing Sexual Harassment as a Supervisor',
          slides: [
            {
              name: 'Slide 1',
            },
            {
              name: 'Slide 2',
            },
            {
              name: 'Slide 3',
            },
          ],
        },
      ],
    },
    {
      name: 'Conclusion',
      lessons: [
        {
          name: 'Final Thoughts',
          slides: [
            {
              name: 'Slide 1',
            },
            {
              name: 'Slide 2',
            },
          ],
        },
      ],
    },
  ],
  glossary: [
    {
      name: 'Agent',
      description:
        'One who acts for, or in the place of, another, by authority from him or her; one entrusted with the business of another; a substitute; a deputy. Managers and supervisors are agents of the employer.',
    },
    {
      name: 'Circuit courts',
      description:
        'The name informally used to refer to the existing U.S. court of appeals, which are organized into thirteen circuits covering different geographical areas of the country. The term derives from an age before mechanized transit, when judges and lawyers rode “the circuit” of their territory to hold court in various places.',
    },
    {
      name: 'Common Law Torts',
      description:
        'Legal actions against civil wrongs, including assault and battery, intentional infliction of emotional distress, interference with contract and defamation. Tort actions may provide more relief than the federal and state laws. Constructive Discharge.',
    },
    {
      name: 'Discrimination',
      description:
        'Any action that unlawfully or unjustly results in unequal treatment of persons or groups based on race, color, gender, national origin, religion, age, disability or other factors protected under federal, state or local laws, such as marital status or gender identity.',
    },
    {
      name: 'Coercion',
      description:
        'The use of authority or force to impose an unwanted advance. The act of compelling by force of authority.',
    },
    {
      name: 'Assault',
      description:
        'Assault can be defined as any act in which a person is abused, threatened, intimidated or assaulted in his or her employment. While exact definitions vary in legislation, generally speaking workplace violence or harassment includes: Threatening behaviour – such as shaking fists, destroying property or throwing objects.',
    },
    {
      name: 'Bullying',
      description:
        "Objectionable behavior in the form of repeated and hostile/unwanted conduct, verbal comments, actions, or gestures. This behavior affects an employee's dignity or pychological or physical integrity, serves no legitimate work-related purpose, and results in a harmful work environment for the employee.",
    },
  ],
  resources: [
    {
      name: 'Bill 168 Legistlation',
    },
    {
      name: 'Harassment Policy.pdf',
      description:
        'Report from 2017 explaining the Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
};

export default data;
