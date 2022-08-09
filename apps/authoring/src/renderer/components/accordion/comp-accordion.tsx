import React from 'react';
import { Link } from 'react-router-dom';
// import { PageRouteProps } from '../../pages';
import {
  Accordion,
  AccordionDefaultProps,
  AccordionItemProps,
} from '@owlui/lib';

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
    view: (
      <ul style={{ borderLeft: '2px solid #e66f00' }}>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <p>Slide 1</p>
        </li>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <p>Slide 2</p>
        </li>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <p>Slide 3</p>
        </li>
        <li style={{ marginTop: '1em' }}>
          <a href="https://osg.ca">Add new slide</a>
        </li>
      </ul>
    ),
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
    view: (
      <ul style={{ borderLeft: '2px solid #e66f00' }}>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <p>Slide 1</p>
        </li>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <p>Slide 2</p>
        </li>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <p>Slide 3</p>
        </li>
      </ul>
    ),
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
