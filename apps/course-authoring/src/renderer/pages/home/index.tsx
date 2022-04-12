import React from 'react';
import style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';
import { Default as Btn } from '@owlui/button';
import { Default as Icon } from '@owlui/icons';

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

const items = [
  {
    heading: 'RECENT FILES',
    items: [{ label: 'AODA v1.0.4' }, { label: 'Working at Heights v4.0.3' }],
  },
  {
    heading: 'HELP',
    items: [
      { label: 'User Guide' },
      { label: 'FAQ' },
      { label: 'Contact Support' },
    ],
  },
];

export const Element = () => {
  return (
    <div className={style.container}>
      <Nav className={style.nav} header={Header} items={items} />
    </div>
  );
};

export default {
  Name,
  Route,
  Element,
};
