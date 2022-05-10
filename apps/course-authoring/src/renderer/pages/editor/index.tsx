import React from 'react';
import style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';

export const Route = '/editor';
export const Name = 'Course Editor';

export const Element = () => {
  return (
    <>
      <Nav className={style.nav} />
      <main className={style.main}>
        <section>
          <div>
            <h1>Course Editor</h1>
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
