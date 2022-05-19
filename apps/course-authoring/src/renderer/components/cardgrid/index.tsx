import React from 'react';
import { Default as Card, CardHeader, CardBody, CardFooter } from '@owlui/card';
import { Default as Btn } from '@owlui/button';
import { CardProps, CardsProps } from './index.types';
import style from './styles.module.scss';
import { Link } from 'react-router-dom';

export const CardGrid = ({ cards }: CardsProps) => {
  const cardsRenderer = cards.map((card: CardProps) => {
    let btnElement;

    if (!card.btnRoute) {
      btnElement = (
        <Btn className={style.cardBtn} size="Sm">
          {card.btnTitle}
        </Btn>
      );
    } else {
      btnElement = (
        <Link className={style.cardBtn} to={card.btnRoute}>
          {card.btnTitle}
        </Link>
      );
    }

    return (
      <div key={card.id} className="owlui-grid-col-xs-6">
        <Card className={style.card}>
          <CardHeader className={style.cardHeader}>{card.title}</CardHeader>
          <CardBody className={style.cardBody}>{card.content}</CardBody>
          <CardFooter className={style.cardFooter}>{btnElement}</CardFooter>
        </Card>
      </div>
    );
  });

  return (
    <div className={`owlui-grid-row ${style.cardGrid}`}>{cardsRenderer}</div>
  );
};

export default {
  CardGrid,
};
