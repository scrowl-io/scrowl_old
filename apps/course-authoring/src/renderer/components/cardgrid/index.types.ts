export interface CardProps {
  id: number;
  title: React.ReactNode;
  content: React.ReactNode;
  btnTitle?: string;
  btnRoute?: string;
}

export interface CardsProps {
  cards: CardProps[];
}
