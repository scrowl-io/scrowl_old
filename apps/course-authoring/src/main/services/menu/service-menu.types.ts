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

export interface MenuEventAboutOpen extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'about-open';
  name: 'menu/about/open';
};

export interface MenuEventPreferencesOpen extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'preferences-open';
  name: 'menu/preferences/open';
};

export interface MenuEventItemList extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'item-list';
  name: 'menu/items';
};

export interface MenuEventItemToggle extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'item-toggle';
  name: 'menu/item/toggle';
};

export interface MenuEventItemDisable extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'item-disable';
  name: 'menu/item/disable';
};

export type MenuItemEventNames =
  | MenuEventNewProject["name"]
  | MenuEventSaveProject["name"]
  | MenuEventSaveProjectAs["name"]
  | MenuEventAboutOpen["name"]
  | MenuEventPreferencesOpen["name"];
  
export type MenuItemEvent =
  | MenuEventNewProject
  | MenuEventSaveProject
  | MenuEventSaveProjectAs
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

export type MenuItems =
  Partial<MenuItemEventsApp>
  & Partial<MenuItemEventsFile>;

export type MenuEventsGlobal = {
  'itemList': MenuEventItemList;
  'itemToggle': MenuEventItemToggle;
  'itemDisable': MenuEventItemDisable;
};

export type MenuEventGlobalApi = {
  'itemList': MenuEventItemList["name"],
  'itemToggle': MenuEventItemToggle["name"];
  'itemDisable': MenuEventItemDisable["name"];
}

export type MenuEvents =
  Partial<MenuEventsGlobal>
  & Partial<MenuItemEventsApp>
  & Partial<MenuItemEventsFile>;
