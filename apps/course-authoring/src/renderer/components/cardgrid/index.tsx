import React from 'react';
import { Default as Card, CardHeader, CardBody, CardFooter } from '@owlui/card';
import { Default as Btn } from '@owlui/button';
import { CardProps, CardsProps } from './index.types';
import style from './styles.module.scss';

export const CardGrid = ({ cards }: CardsProps) => {
  const cardsRenderer = cards.map((card: CardProps) => (
    <Card key={card.id} className={style.card}>
      <CardHeader className={style.cardHeader}>{card.title}</CardHeader>
      <CardBody className={style.cardBody}>{card.content}</CardBody>
      <CardFooter className={style.cardFooter}>
        <Btn className={style.cardBtn} size="Sm">
          {card.btnTitle}
        </Btn>
      </CardFooter>
    </Card>
  ));

  return <div className={style.cardGrid}>{cardsRenderer}</div>;
};

export default {
  CardGrid,
};
