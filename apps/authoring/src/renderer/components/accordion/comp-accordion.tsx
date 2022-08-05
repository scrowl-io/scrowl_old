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
    label: 'Building a respectful workplace',
    view: (
      <ul style={{ borderLeft: '1px solid red' }}>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <a href="https://osg.ca" target="_blank">
            Slide 1
          </a>
        </li>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <a href="https://osg.ca" target="_blank">
            Slide 2
          </a>
        </li>
        <li>
          <span
            className="material-symbols-outlined scrowl-outline__detail-icon"
            style={{ color: '#ffba00' }}
          >
            rectangle
          </span>
          <a href="https://osg.ca" target="_blank">
            Slide 3
          </a>
        </li>
        <li style={{ marginTop: '1em' }}>
          <a href="https://osg.ca">Add new slide</a>
        </li>
      </ul>
    ),
  },
  {
    id: '2',
    label: 'What is harrassment?',
    view: (
      <ul style={{ borderLeft: '1px solid red' }}>
        <li>
          <span className="material-symbols-outlined scrowl-outline__detail-icon">
            rectangle
          </span>
          <a href="https://osg.ca" target="_blank">
            Slide 1
          </a>
        </li>
        <li>
          <span className="material-symbols-outlined scrowl-outline__detail-icon">
            rectangle
          </span>
          <a href="https://osg.ca" target="_blank">
            Slide 2
          </a>
        </li>
        <li>
          <span className="material-symbols-outlined scrowl-outline__detail-icon">
            rectangle
          </span>
          <a href="https://osg.ca" target="_blank">
            Slide 3
          </a>
        </li>
      </ul>
    ),
  },
];

export const topOutlineItems: AccordionItemProps[] = [
  {
    id: '1',
    label: 'Introduction to Harrassment',
    view: (
      <Accordion
        alwaysOpen
        flush
        items={subOutlineItems}
        style={{ borderLeft: '1px solid blue' }}
      />
    ),
  },
  {
    id: '2',
    label: 'Additional Training for Supervisors',
    view: (
      <Accordion
        alwaysOpen
        flush
        items={subOutlineItems}
        style={{ borderLeft: '1px solid blue' }}
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
