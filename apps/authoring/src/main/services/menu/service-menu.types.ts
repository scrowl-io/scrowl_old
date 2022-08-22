import { Requester } from '..';

export interface MenuEventCreateProject
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'new-project';
  name: '/projects/create';
}

export interface MenuEventOpenProject
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'open-project';
  name: '/projects/open';
}

export interface MenuEventSaveProject
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'save-project';
  name: '/projects/save';
}

export interface MenuEventImportFile
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'import-file';
  name: 'menu/project/import';
}

export interface MenuEventAboutOpen
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'about-open';
  name: 'menu/about/open';
}

export interface MenuEventPreferencesOpen
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'preferences-open';
  name: 'menu/preferences/open';
}

export interface MenuEventItemList
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'menu/items';
}

export interface MenuEventItemToggle
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'menu/item/toggle';
}

export interface MenuEventItemDisable
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'menu/item/disable';
}

export interface MenuEventItemEnable
  extends Omit<Requester.RegisterEvent, 'name'> {
  name: 'menu/item/enable';
}

export type MenuItemEventNames =
  | MenuEventCreateProject['name']
  | MenuEventOpenProject['name']
  | MenuEventSaveProject['name']
  | MenuEventImportFile['name']
  | MenuEventAboutOpen['name']
  | MenuEventPreferencesOpen['name'];

export type MenuItemEvent =
  | MenuEventCreateProject
  | MenuEventOpenProject
  | MenuEventSaveProject
  | MenuEventImportFile
  | MenuEventAboutOpen
  | MenuEventPreferencesOpen;

export type MenuItemEventsFile = {
  projectsCreate: MenuEventCreateProject;
  projectOpen: MenuEventOpenProject;
  projectSave: MenuEventSaveProject;
  importFile: MenuEventImportFile;
};

export type MenuEventsFileApi = {
  projectsCreate: MenuEventCreateProject['name'];
  projectOpen: MenuEventOpenProject['name'];
  projectSave: MenuEventSaveProject['name'];
  importFile: MenuEventImportFile['name'];
  preferencesOpen: MenuEventPreferencesOpen['name'];
};

export type MenuItemEventsApp = {
  aboutOpen: MenuEventAboutOpen;
  preferencesOpen: MenuEventPreferencesOpen;
};

export type MenuEventsAppApi = {
  aboutOpen: MenuEventAboutOpen['name'];
  preferencesOpen: MenuEventPreferencesOpen['name'];
};

export type MenuItems = Partial<MenuItemEventsApp> &
  Partial<MenuItemEventsFile>;

export type MenuEventsGlobal = {
  itemList: MenuEventItemList;
  itemToggle: MenuEventItemToggle;
  itemDisable: MenuEventItemDisable;
  itemEnable: MenuEventItemEnable;
};

export type MenuEventGlobalApi = {
  itemList: MenuEventItemList['name'];
  itemToggle: MenuEventItemToggle['name'];
  itemDisable: MenuEventItemDisable['name'];
  itemEnable: MenuEventItemEnable['name'];
};

export type MenuEvents = Partial<MenuEventsGlobal> &
  Partial<MenuItemEventsApp> &
  Partial<MenuItemEventsFile>;
