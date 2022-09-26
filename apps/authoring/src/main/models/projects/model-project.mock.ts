import { ProjectData, ProjectSlide } from './model-projects.types';
import { TemplateManifest } from '../templates';
import templateManifestIntro from '../../assets/template-introduction/manifest.json';

export const mockSlide = (
  name: string,
  id: number,
  lessonID: number,
  moduleID: number
): ProjectSlide => {
  return {
    id: id,
    lessonID: lessonID,
    moduleID: moduleID,
    name: name,
    // template: templateManifestIntro as TemplateManifest,
    template: templateManifestIntro as any,
  };
};

export const data: ProjectData = {
  name: 'MyCourseProject',
  description: '',
  scormConfig: {
    name: 'Untitled Course',
    description: '',
    authors: '',
  },
  modules: [
    {
      id: 1,
      name: 'An Introduction to Harassment & Discrimination',
      lessons: [
        {
          id: 1,
          moduleID: 1,
          name: 'Building a Respectful Workplace',
          slides: [mockSlide('Introduction', 1, 1, 1)],
        },
        {
          id: 2,
          moduleID: 1,
          name: 'What is Harassment vs. Discrimination?',
          slides: [
            mockSlide('Slide 1', 2, 2, 1),
            mockSlide('Slide 2', 3, 2, 1),
            mockSlide('Slide 3', 4, 2, 1),
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Sexual Harassment',
      lessons: [
        {
          id: 3,
          moduleID: 2,
          name: 'What is Sexual Harassment?',
          slides: [mockSlide('Slide 4', 5, 3, 2)],
        },
      ],
    },
    {
      id: 3,
      name: 'Additional Training For Supervisors',
      lessons: [
        {
          id: 4,
          moduleID: 3,
          name: 'Preventing Sexual Harassment as a Supervisor',
          slides: [
            mockSlide('Slide 5', 6, 4, 3),
            mockSlide('Slide 6', 7, 4, 3),
            mockSlide('Slide 7', 8, 4, 3),
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'Conclusion',
      lessons: [
        {
          id: 5,
          moduleID: 4,
          name: 'Final Thoughts',
          slides: [
            mockSlide('Slide 8', 9, 5, 4),
            mockSlide('Slide 9', 10, 5, 4),
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
