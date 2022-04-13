import React from 'react';
import style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';
import { Default as Btn } from '@owlui/button';
import { Default as Icon } from '@owlui/icons';
import { Default as Table } from '@owlui/table';
import { sidebarItems, cards, filesList } from './data';
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
        <section>
          <div className={style.sectionContent}>
            <CardGrid cards={cards} />
          </div>
        </section>
        <section>
          <div className={style.sectionContent}>
            <h2 className={style.sectionTitle}>Your Files</h2>
            <Table
              className={style.filesList}
              columns={filesList.columns}
              items={filesList.items}
            />
          </div>
        </section>
        <section>
          <div className={style.sectionContent}>
            <h2 className={style.sectionTitle}>Templates</h2>
          </div>
        </section>
      </main>
    </>
  );
};

export default {
  Name,
  Route,
  Element,
};
