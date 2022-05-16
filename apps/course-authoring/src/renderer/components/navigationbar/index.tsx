import React from 'react';
import style from './styles.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { NavigationBarProps, NavigationLink } from './index.types';

const pathPrefix = '/editor';

const NavigationItem = ({ page }: { page: NavigationLink }) => {
  return (
    <li
      className={`${style.navigationItem} ${
        useLocation().pathname === `${pathPrefix}${page.PageRoute}`
          ? style.navigationItemActive
          : ''
      }`}
    >
      <Link
        to={
          page.PageName !== 'Home'
            ? `${pathPrefix}${page.PageRoute}`
            : page.PageRoute
        }
      >
        {page.PageName}
      </Link>
    </li>
  );
};

export const NavigationBar = ({ pages }: NavigationBarProps) => {
  return (
    <ul className={style.navigationBar}>
      {pages.map((page: NavigationLink, index) => {
        return <NavigationItem key={index} page={page} />;
      })}
    </ul>
  );
};

export default {
  NavigationBar,
};
