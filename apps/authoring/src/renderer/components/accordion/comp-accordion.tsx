import React, { ReactNode } from 'react';
import {
  Accordion,
  AccordionDefaultProps,
  AccordionItemProps,
  Listgroup,
  Dropdown,
  Icon,
} from '@owlui/lib';
import {
  moduleDropdownItems,
  lessonDropdownItems,
  outlineSlideItems,
  dropdownButton,
  placeholderChild,
} from '../leftpane/leftpane-data';

const subOutlineItems: AccordionItemProps[] = [
  {
    id: '1',
    label: (
      <div className="outline-header d-flex justify-content-between w-100">
        <div className="outline-item-header-left d-flex align-items-center">
          <div className="dropdown-arrow">
            <Icon
              display="Outlined"
              icon="arrow_drop_down"
              style={{ fontSize: '2em' }}
            />
          </div>
          <Icon display="Outlined" icon="widgets" />
          <p>Building a Respectful Workplace</p>
        </div>

        <div className="outline-item-header-right d-flex">
          <Dropdown
            title="title"
            align="start"
            items={lessonDropdownItems}
            button={dropdownButton}
            children={placeholderChild as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
            onClick={e => e.stopPropagation()}
          />
        </div>
      </div>
    ),
    view: <Listgroup items={outlineSlideItems} className="outline-slides" />,
  },
  {
    id: '2',
    label: (
      <div className="outline-header d-flex justify-content-between w-100">
        <div className="outline-item-header-left d-flex align-items-center">
          <div className="dropdown-arrow">
            <Icon
              display="Outlined"
              icon="arrow_drop_down"
              style={{ fontSize: '2em' }}
            />
          </div>
          <Icon display="Outlined" icon="widgets" />
          <p>What is Harassment</p>
        </div>

        <div className="outline-item-header-right d-flex">
          <Dropdown
            title="title"
            align="start"
            items={lessonDropdownItems}
            button={dropdownButton}
            children={placeholderChild as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
            onClick={e => e.stopPropagation()}
          />
        </div>
      </div>
    ),
    view: <Listgroup items={outlineSlideItems} className="outline-slides" />,
  },
];

export const topOutlineItems: AccordionItemProps[] = [
  {
    id: '1',
    label: (
      <div className="outline-header d-flex justify-content-between w-100">
        <div className="outline-item-header-left d-flex align-items-center">
          <div className="dropdown-arrow">
            <Icon
              display="Outlined"
              icon="arrow_drop_down"
              style={{ fontSize: '2em' }}
            />
          </div>
          <Icon display="Outlined" icon="folder" />
          <p>An Introduction to Harassment</p>
        </div>

        <div className="outline-item-header-right d-flex">
          <Dropdown
            title="title"
            align="start"
            items={moduleDropdownItems}
            button={dropdownButton}
            children={placeholderChild as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
            onClick={e => e.stopPropagation()}
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
          <div className="dropdown-arrow">
            <Icon
              display="Outlined"
              icon="arrow_drop_down"
              style={{ fontSize: '2em' }}
            />
          </div>
          <Icon display="Outlined" icon="folder" />
          <p>Additional Training for Supervisors</p>
        </div>

        <div className="outline-item-header-right d-flex">
          <Dropdown
            title="title"
            align="start"
            items={moduleDropdownItems}
            button={dropdownButton}
            children={placeholderChild as unknown as ReactNode}
            className="resources-dropdown"
            variant="light"
            onClick={e => e.stopPropagation()}
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
