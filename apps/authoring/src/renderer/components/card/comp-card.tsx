import React, { BaseSyntheticEvent, ReactNode, useState } from 'react';
// import { Card, CardDefaultProps } from '@owlui/lib';
import { Card } from 'react-bootstrap';
import { Dropdown } from '@owlui/lib';
import { propTypes } from 'react-bootstrap/esm/Image';

export interface CardItemProps {
  id: string;
  header: string;
  content: string;
}

export interface CardProps {
  cards: CardItemProps[];
}

const dropdownItems = [
  {
    id: '1',
    label: 'Edit',
    value: undefined,
    as: 'button',
  },
  {
    id: '2',
    label: 'Delete Term',
    value: undefined,
  },
];

const children = () => {
  return (
    <>
      <h1>test</h1>
      <h2>test 2</h2>
    </>
  );
};

const handleCardOff = (e: BaseSyntheticEvent) => {
  const dropdowns = document.querySelectorAll('.glossary-dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove('dropdown-visible');
  });
};

const handleHoverOff = (e: BaseSyntheticEvent) => {
  const dropdown = document.querySelector(`#dropdown-${e.target.id}`);
  dropdown?.classList.remove('dropdown-visible');
};

const handleHoverOn = (e: BaseSyntheticEvent) => {
  const dropdown = document.querySelector(`#dropdown-${e.target.id}`);
  dropdown?.classList.add('dropdown-visible');
};

export const GlossaryCard = ({ cards }: CardProps) => {
  const sortedCards = cards.sort((a, b) => {
    return a.header.localeCompare(b.header);
  });
  const firstLetters: string[] = [];
  sortedCards.forEach(card => {
    if (!firstLetters.includes(card.header[0])) {
      firstLetters.push(card.header[0]);
    }
  });
  return (
    <>
      {firstLetters.map((letter: string) => {
        return (
          <Card
            key={letter}
            style={{ borderRadius: '0', border: '0' }}
            onMouseLeave={handleCardOff}
            onScroll={handleCardOff}
          >
            <Card.Header
              style={{
                fontSize: '0.6em',
                backgroundColor: '#e9ecef',
                border: '0',
                borderRadius: '0',
              }}
            >
              {letter}
            </Card.Header>
            {sortedCards.map((card: CardItemProps) => {
              if (card.header[0] === letter) {
                return (
                  <Card.Body
                    className="glossary-item"
                    onMouseOver={handleHoverOn}
                    onMouseLeave={handleHoverOff}
                    key={card.id}
                    id={card.id}
                  >
                    <Card.Title
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.6em',
                        paddingTop: '0.25em',
                        paddingBottom: '0.25em',
                      }}
                    >
                      {card.header}
                      <Dropdown
                        title="title"
                        align="start"
                        items={dropdownItems}
                        children={children as unknown as ReactNode}
                        id={`dropdown-${card.id}`}
                        className="glossary-dropdown"
                      />
                    </Card.Title>
                    <Card.Text style={{ fontSize: '0.4em' }}>
                      {card.content}
                    </Card.Text>
                  </Card.Body>
                );
              }
            })}
          </Card>
        );
      })}
    </>
  );
};

export default {
  GlossaryCard,
};
