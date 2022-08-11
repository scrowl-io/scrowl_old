import React, { ReactNode } from 'react';
import {
  Accordion,
  AccordionDefaultProps,
  AccordionItemProps,
  Listgroup,
  Dropdown,
} from '@owlui/lib';
import {
  moduleDropdownItems,
  lessonDropdownItems,
} from '../leftpane/leftpane-data';

const slideItems = [
  {
    id: '1',
    header: (
      <div className="d-flex outline-item-header">
        <span className="material-symbols-outlined scrowl-outline__detail-icon">
          rectangle
        </span>
        <p>Slide 1</p>
      </div>
    ),
    bsProps: {
      action: true,
      // if we pass an href, this element is rendered as a button and will have an additional 'active' class added when clicked. Return here when we know what we want to do for active, focus, hover and whether we keep track of all that in state
      // href: '#',
    },
  },
  {
    id: '2',
    header: (
      <div className="d-flex outline-item-header">
        <span className="material-symbols-outlined scrowl-outline__detail-icon">
          rectangle
        </span>
        <p>Slide 2</p>
      </div>
    ),
    bsProps: {
      action: true,
    },
  },
  {
    id: '3',
    header: (
      <div className="d-flex outline-item-header">
        <span className="material-symbols-outlined scrowl-outline__detail-icon">
          rectangle
        </span>
        <p>Slide 3</p>
      </div>
    ),
    bsProps: {
      action: true,
    },
  },
];

const button = <span className="material-symbols-rounded">more_vert</span>;

const placeholderChildren = <h1>Placeholder</h1>;

const subOutlineItems: AccordionItemProps[] = [
  {
    id: '1',
    label: (
      <div className="outline-header d-flex justify-content-between w-100">
        <div className="outline-item-header-left d-flex align-items-center">
          <span className="material-symbols-sharp dropdown-arrow folder">
            arrow_drop_down
          </span>
          <span className="material-symbols-sharp folder">interests</span>
          <p>Building a Respectful Workplace</p>
        </div>

        <div className="outline-item-header-right d-flex">
          <Dropdown
            title="title"
            align="start"
            items={lessonDropdownItems}
            button={button}
            children={placeholderChildren as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
          />
        </div>
      </div>
    ),
    view: <Listgroup items={slideItems} className="outline-slides" />,
  },
  {
    id: '2',
    label: (
      <div className="outline-header d-flex justify-content-between w-100">
        <div className="outline-item-header-left d-flex align-items-center">
          <span className="material-symbols-sharp dropdown-arrow folder">
            arrow_drop_down
          </span>
          <span className="material-symbols-sharp folder">interests</span>
          <p>What is Harassment</p>
        </div>

        <div className="outline-item-header-right d-flex">
          <Dropdown
            title="title"
            align="start"
            items={lessonDropdownItems}
            button={button}
            children={placeholderChildren as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
          />
        </div>
      </div>
    ),
    view: <Listgroup items={slideItems} className="outline-slides" />,
  },
];

export const topOutlineItems: AccordionItemProps[] = [
  {
    id: '1',
    label: (
      <div className="outline-header d-flex justify-content-between w-100">
        <div className="outline-item-header-left d-flex align-items-center">
          <span className="material-symbols-sharp dropdown-arrow folder">
            arrow_drop_down
          </span>
          <span className="material-symbols-sharp folder">folder</span>
          <p>An Introduction to Harassment</p>
        </div>

        <div className="outline-item-header-right d-flex">
          <Dropdown
            title="title"
            align="start"
            items={moduleDropdownItems}
            button={button}
            children={placeholderChildren as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
          />
        </div>
      </div>
    ),
    view: (
      <Accordion
        alwaysOpen
        flush
        items={subOutlineItems}
        style={{ borderLeft: '2px solid #9624fe' }}
      />
    ),
  },
  {
    id: '2',
    label: (
      <div className="outline-header d-flex justify-content-between w-100">
        <div className="outline-item-header-left d-flex align-items-center">
          <span className="material-symbols-sharp dropdown-arrow folder">
            arrow_drop_down
          </span>
          <span className="material-symbols-sharp folder">folder</span>
          <p>Additional Training for Supervisors</p>
        </div>

        <div className="outline-item-header-right d-flex">
          <Dropdown
            title="title"
            align="start"
            items={moduleDropdownItems}
            button={button}
            children={placeholderChildren as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
          />
        </div>
      </div>
    ),
    view: (
      <Accordion
        alwaysOpen
        flush
        items={subOutlineItems}
        style={{ borderLeft: '2px solid #9624fe' }}
      />
    ),
  },
];

export const Outline = ({ items }: AccordionDefaultProps) => {
  return <Accordion items={items} flush alwaysOpen />;
};

export default {
  Outline,
};
