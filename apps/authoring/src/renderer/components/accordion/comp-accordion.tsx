import React from 'react';
import {
  Accordion,
  AccordionDefaultProps,
  AccordionItemProps,
  Listgroup,
} from '@owlui/lib';

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

const subOutlineItems: AccordionItemProps[] = [
  {
    id: '1',
    label: (
      <div className="outline-item-header d-flex">
        <span className="material-symbols-sharp dropdown-arrow interests">
          arrow_drop_down
        </span>
        <span className="material-symbols-sharp interests">interests</span>
        <p>Building a Respecful Workplace</p>
      </div>
    ),
    view: <Listgroup items={slideItems} className="outline-slides" />,
  },
  {
    id: '2',
    label: (
      <div className="outline-item-header d-flex">
        <span className="material-symbols-sharp dropdown-arrow interests">
          arrow_drop_down
        </span>
        <span className="material-symbols-sharp interests">interests</span>
        <p>What is Harassment?</p>
      </div>
    ),
    view: <Listgroup items={slideItems} className="outline-slides" />,
  },
];

export const topOutlineItems: AccordionItemProps[] = [
  {
    id: '1',
    label: (
      <div className="outline-item-header d-flex">
        <span className="material-symbols-sharp dropdown-arrow folder">
          arrow_drop_down
        </span>
        <span className="material-symbols-sharp folder">folder</span>
        <p>An Introduction to Harassment</p>
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
      <div className="outline-item-header d-flex">
        <span className="material-symbols-sharp dropdown-arrow folder">
          arrow_drop_down
        </span>
        <span className="material-symbols-sharp folder">folder</span>
        <p>Additional Training for Supervisors</p>
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
