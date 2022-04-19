import React from 'react';
import style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';
import { Default as Btn } from '@owlui/button';
import { Default as Icon } from '@owlui/icons';
import { Default as Table } from '@owlui/table';
import { Default as Card } from '@owlui/card';
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
      <div>
        <Btn size="Sm" onClick={async ()=>{
            // Send to Main and get return
            const messageFromMain = await window.exportScormApi.startScormExportProcess(
              'Test Course'
            );

            console.log(messageFromMain);
        }}>Export</Btn>
      </div>
    </div>
    <div className={style.navDivider} />
  </>
);

const TemplatesList = () => {
  const tempTemplatesQty = 6;

  return Array.from(Array(tempTemplatesQty), (e, i) => {
    return (
      <div key={i} className="owlui-grid-col-xs-2">
        <Card
          className={style.template}
          style={{ height: '110px', cursor: 'pointer' }}
        ></Card>
      </div>
    );
  });
};

export const Element = () => {
  return (
    <>
      <Nav className={style.nav} header={Header} items={sidebarItems} />
      <main className={style.main}>
        <section>
          <div>
            <CardGrid cards={cards} />
          </div>
        </section>
        <section className={style.filesList}>
          <div>
            <h2 className={style.sectionTitle}>Your Files</h2>
            <Table columns={filesList.columns} items={filesList.items} />
          </div>
        </section>
        <section className={style.templatesList}>
          <div>
            <h2 className={style.sectionTitle}>Templates</h2>
            <div className="owlui-grid-row">{TemplatesList()}</div>
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
