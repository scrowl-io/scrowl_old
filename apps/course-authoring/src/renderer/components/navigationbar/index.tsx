import React from 'react';
import style from './styles.module.scss';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { PageNavItem } from '../../pages/index.types';
import { Button } from '@owlui/lib';
import { NavigationBarProps } from './index.types';

const NavigationItem = ({ page }: { page: PageNavItem }) => {
  const resolved = useResolvedPath(page.link);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li
      className={`${style.navigationItem} ${
        match ? style.navigationItemActive : ''
      }`}
    >
      <Link to={page.link}>{page.label}</Link>
    </li>
  );
};

export const NavigationBar = ({ pages, exportPackage }: NavigationBarProps) => {
  return (
    <div className={style.topContainer}>
      <ul className={style.navigationBar}>
        {pages.map((page: PageNavItem, index: number) => {
          return <NavigationItem key={index} page={page} />;
        })}
      </ul>
      <Button onClick={exportPackage}>Export</Button>
    </div>
  );
};

export default {
  NavigationBar,
};
