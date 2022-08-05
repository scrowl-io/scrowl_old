import React, { ReactNode } from 'react';
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
          <Card key={letter} style={{ borderRadius: '0', border: '0' }}>
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
                  <Card.Body key={card.id}>
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
                        items={dropdownItems}
                        children={children as unknown as ReactNode}
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
