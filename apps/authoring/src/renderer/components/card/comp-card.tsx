import React, { ReactNode } from 'react';
// import { Card, CardDefaultProps } from '@owlui/lib';
import { Card } from 'react-bootstrap';
import { Dropdown } from '@owlui/lib';
import {
  glossaryDropdownItems,
  dropdownButton,
  placeholderChild,
} from '../leftpane/leftpane-data';

export interface CardItemProps {
  id: string;
  header: string;
  content: string;
}

export interface CardProps {
  cards: CardItemProps[];
}

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
                        items={glossaryDropdownItems}
                        button={dropdownButton}
                        children={placeholderChild as unknown as ReactNode}
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
