import React, { BaseSyntheticEvent, ReactNode } from 'react';
// import { Card, CardDefaultProps } from '@owlui/lib';
import { Card } from 'react-bootstrap';
import { Dropdown } from '@owlui/lib';

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
        <span className="material-symbols-sharp">delete</span>
        <span>Delete Term</span>
      </div>
    ),
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

const button = <span className="material-symbols-rounded">more_vert</span>;

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
          <Card className="glossary-card" key={letter}>
            <Card.Header className="glossary-card-header">{letter}</Card.Header>
            {sortedCards.map((card: CardItemProps) => {
              if (card.header[0] === letter) {
                return (
                  <Card.Body
                    className="glossary-item"
                    key={card.id}
                    id={card.id}
                  >
                    <Card.Title className="glossary-card-title">
                      {card.header}
                      <Dropdown
                        title="title"
                        align="start"
                        items={dropdownItems}
                        button={button}
                        children={children as unknown as ReactNode}
                        id={`dropdown-${card.id}`}
                        className="glossary-dropdown"
                        variant="light"
                      />
                    </Card.Title>
                    <Card.Text className="glossary-card-body">
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
