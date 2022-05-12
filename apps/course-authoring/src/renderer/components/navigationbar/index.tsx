import React from 'react';
import style from './styles.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { NavigationBarProps, NavigationLink } from './index.types';

const NavigationItem = ({ label, link }: NavigationLink) => {
  return (
    <li
      className={`${style.navigationItem} ${
        useLocation().pathname === link ? style.navigationItemActive : ''
      }`}
    >
      <Link to={link}>{label}</Link>
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
            label={navigationLink.label}
            link={navigationLink.link}
          />
        );
      })}
    </ul>
  );
};

export default {
  NavigationBar,
};
