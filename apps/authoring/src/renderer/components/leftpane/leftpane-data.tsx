import React, { ReactNode } from 'react';
import { Dropdown } from '@owlui/lib';

export const glossaryCards = [
  {
    id: '1',
    header: 'Agent',
    content:
      'One who acts for, or in the place of, another, by authority from him or her; one entrusted with the business of another; a substitute; a deputy. Managers and supervisors are agents of the employer.',
  },
  {
    id: '2',
    header: 'Circuit courts',
    content:
      'The name informally used to refer to the existing U.S. court of appeals, which are organized into thirteen circuits covering different geographical areas of the country. The term derives from an age before mechanized transit, when judges and lawyers rode “the circuit” of their territory to hold court in various places.',
  },
  {
    id: '4',
    header: 'Common Law Torts',
    content:
      'Legal actions against civil wrongs, including assault and battery, intentional infliction of emotional distress, interference with contract and defamation. Tort actions may provide more relief than the federal and state laws. Constructive Discharge.',
  },
  {
    id: '5',
    header: 'Discrimination',
    content:
      'Any action that unlawfully or unjustly results in unequal treatment of persons or groups based on race, color, gender, national origin, religion, age, disability or other factors protected under federal, state or local laws, such as marital status or gender identity.',
  },
  {
    id: '3',
    header: 'Coercion',
    content:
      'The use of authority or force to impose an unwanted advance. The act of compelling by force of authority.',
  },
  {
    id: '6',
    header: 'Assault',
    content:
      'Assault can be defined as any act in which a person is abused, threatened, intimidated or assaulted in his or her employment. While exact definitions vary in legislation, generally speaking workplace violence or harassment includes: Threatening behaviour – such as shaking fists, destroying property or throwing objects.',
  },
  {
    id: '7',
    header: 'Bullying',
    content:
      "Objectionable behavior in the form of repeated and hostile/unwanted conduct, verbal comments, actions, or gestures. This behavior affects an employee's dignity or pychological or physical integrity, serves no legitimate work-related purpose, and results in a harmful work environment for the employee.",
  },
];

export const resourceDropdownItems = [
  {
    id: '1',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">edit_note</span>
        <span>Edit</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '2',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">visibility</span>
        <span>Preview</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '3',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">delete</span>
        <span>Delete Resource</span>
      </div>
    ),
    value: undefined,
  },
];

const button = <span className="material-symbols-rounded">more_vert</span>;

const placeholderChildren = <h1>Placeholder</h1>;

export const resourcesItems = [
  {
    id: '1',
    header: (
      <div className="d-flex resource-header justify-content-between">
        <div className="d-flex resource-header-left">
          <span className="material-symbols-sharp">description</span>
          <a className="resource-header-link" href="https://osg.ca">
            Bill 168 Legistlation
          </a>
        </div>

        <div className="d-flex resource-header-right">
          <Dropdown
            title="title"
            align="start"
            items={resourceDropdownItems}
            button={button}
            children={placeholderChildren as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
          />
        </div>
      </div>
    ),
  },
  {
    id: '2',
    header: (
      <div className="d-flex resource-header justify-content-between">
        <div className="d-flex resource-header-left">
          <span className="material-symbols-sharp">description</span>
          <a className="resource-header-link" href="https://osg.ca">
            Harassment Policy.pdf
          </a>
        </div>

        <div className="d-flex resource-header-right">
          <Dropdown
            title="title"
            align="start"
            items={resourceDropdownItems}
            button={button}
            children={placeholderChildren as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
          />
        </div>
      </div>
    ),
    description: (
      <p className="description">
        Report from 2017 explaining the Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    ),
  },
  {
    id: '3',
    header: (
      <div className="d-flex resource-header justify-content-between">
        <div className="d-flex resource-header-left">
          <span className="material-symbols-sharp">description</span>
          <a className="resource-header-link" href="https://osg.ca">
            Harassment Report.pdf
          </a>
        </div>

        <div className="d-flex resource-header-right">
          <Dropdown
            title="title"
            align="start"
            items={resourceDropdownItems}
            button={button}
            children={placeholderChildren as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
          />
        </div>
      </div>
    ),
    description: (
      <p className="description">
        Report from 2017 explaining the Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    ),
  },
  {
    id: '4',
    header: (
      <div className="d-flex resource-header justify-content-between">
        <div className="d-flex resource-header-left">
          <span className="material-symbols-sharp">description</span>
          <a className="resource-header-link" href="https://osg.ca">
            Example Resource
          </a>
        </div>

        <div className="d-flex resource-header-right">
          <Dropdown
            title="title"
            align="start"
            items={resourceDropdownItems}
            button={button}
            children={placeholderChildren as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
          />
        </div>
      </div>
    ),
    description: (
      <p className="description">
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    ),
  },
];

export const moduleDropdownItems = [
  {
    id: '1',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">interests</span>
        <span>Add Lesson</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '2',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">edit</span>
        <span>Rename</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '3',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">content_copy</span>
        <span>Duplicate</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '4',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">folder</span>
        <span>Add Module After</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '5',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">arrow_upward</span>
        <span>Move Up</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '6',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">arrow_downward</span>
        <span>Move Down</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '7',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">delete</span>
        <span>Delete Module</span>
      </div>
    ),
    value: undefined,
  },
];

export const lessonDropdownItems = [
  {
    id: '1',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">rectangle</span>
        <span>Add Slide</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '2',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">edit</span>
        <span>Rename</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '3',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">interests</span>
        <span>Duplicate</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '4',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">arrow_upward</span>
        <span>Move Up</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '5',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">arrow_downward</span>
        <span>Move Down</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '6',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">trending_flat</span>
        <span>Move To...</span>
      </div>
    ),
    value: undefined,
  },
  {
    id: '7',
    label: (
      <div className="d-flex align-items-center">
        <span className="material-symbols-sharp">delete</span>
        <span>Delete Lesson</span>
      </div>
    ),
    value: undefined,
  },
];
