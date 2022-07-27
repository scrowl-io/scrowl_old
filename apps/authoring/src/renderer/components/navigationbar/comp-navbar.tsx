import React from 'react';
import * as styles from './comp-navbar.module.scss';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { PageRouteProps } from '../../pages';
import { Button } from '@owlui/lib';
import { NavigationBarProps } from './comp-navbar.types';

const NavigationItem = ({ page }: { page: PageRouteProps }) => {
  const resolved = useResolvedPath(page.url);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li
      className={`${styles.navigationItem} ${
        match ? styles.navigationItemActive : ''
      }`}
    >
      <Link to={page.url}>{page.label}</Link>
    </li>
  );
};

export const NavigationBar = ({
  pages,
  publishProject,
}: NavigationBarProps) => {
  return (
    <div className={styles.topContainer}>
      <ul className={styles.navigationBar}>
        {pages.map((page: PageRouteProps, index: number) => {
          return <NavigationItem key={index} page={page} />;
        })}
      </ul>
      {publishProject ? <Button onClick={publishProject}>Publish</Button> : ''}
    </div>
  );
};

export default {
  NavigationBar,
};
