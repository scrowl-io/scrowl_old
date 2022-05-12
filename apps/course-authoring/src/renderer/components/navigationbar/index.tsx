import React from 'react';
import { Default as Btn } from '@owlui/button';
import style from './styles.module.scss';
import { Link } from 'react-router-dom';
import { NavigationBarProps, NavigationLink } from './index.types';

const NavigationItem = ({
  navigationLink,
}: {
  navigationLink: NavigationLink;
}) => {
  return (
    <li className={style.navigationItem}>
      <Link to={navigationLink.link}>{navigationLink.label}</Link>
    </li>
  );
};

export const NavigationBar = ({ navigationLinks }: NavigationBarProps) => {
  return (
    <ul className={style.navigationBar}>
      {navigationLinks.map((navigationLink: NavigationLink) => {
        return (
          <NavigationItem
            key={navigationLink.link}
            navigationLink={navigationLink}
          />
        );
      })}
    </ul>
  );
};

export default {
  NavigationBar,
};
