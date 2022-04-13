import React from 'react';
import style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';
import { Default as Btn } from '@owlui/button';
import { Default as Icon } from '@owlui/icons';
import { sidebarItems, cards } from './data';
import { CardGrid } from '../../components/cardgrid';

export const Route = '/';
export const Name = 'Home';

const Header = (
  <>
    <div>
      <h1 className={style.navTitle}>
        <Icon className={style.navTitleIcon} icon="school" aria-hidden="true" />
        <span>Scrowl</span>
      </h1>
    </div>
    <div className={style.navActions}>
      <div>
        <Btn size="Sm">New Project</Btn>
      </div>
      <div>
        <Btn size="Sm" appearance="Link">
          Open
        </Btn>
      </div>
    </div>
    <div className={style.navDivider} />
  </>
);

export const Element = () => {
  return (
    <>
      <Nav className={style.nav} header={Header} items={sidebarItems} />
      <main className={style.main}>
        <CardGrid cards={cards} />
      </main>
    </>
  );
};

export default {
  Name,
  Route,
  Element,
};
