import { Requester } from '../../services';

export interface MenuEventNewProject extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'new-project';
  name: 'menu/project/new';
};

export interface MenuEventSaveProject extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'save-project';
  name: 'menu/project/save';
};

export interface MenuEventSaveProjectAs extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'save-project-as';
  name: 'menu/project/save';
};

export interface MenuEventToggleItem extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'toggle-item';
  name: 'menu/item/toggle';
};

export interface MenuEventAboutOpen extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'about-open';
  name: 'menu/about/open';
};

export interface MenuEventPreferencesOpen extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'preferences-open';
  name: 'menu/preferences/open';
};

export type MenuItemEventNames =
  | MenuEventNewProject["name"]
  | MenuEventSaveProject["name"]
  | MenuEventSaveProjectAs["name"]
  | MenuEventToggleItem["name"]
  | MenuEventAboutOpen["name"]
  | MenuEventPreferencesOpen["name"];
  
export type MenuItemEvent =
  | MenuEventNewProject
  | MenuEventSaveProject
  | MenuEventSaveProjectAs
  | MenuEventToggleItem
  | MenuEventAboutOpen
  | MenuEventPreferencesOpen;

export type MenuItemEventsFile = {
  'projectNew': MenuEventNewProject;
  'projectSave': MenuEventSaveProject;
  'projectSaveAs': MenuEventSaveProjectAs;
}

export type MenuItemEventsApp = {
  'aboutOpen': MenuEventAboutOpen;
  'preferencesOpen': MenuEventPreferencesOpen;
};

export type MenuEventsGlobal = {
  'itemToggle': MenuEventToggleItem;
};

export type MenuEvents =
  Partial<MenuEventsGlobal>
  & Partial<MenuItemEventsApp>
  & Partial<MenuItemEventsFile>;
