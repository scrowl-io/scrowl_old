import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '../../../services';

export const AppEvents = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  const navigate = useNavigate();

  Menu.File.onPreferencesOpen(() => {
    navigate('/settings');
  });

  return <>{children}</>;
};

export default {
  AppEvents,
};
