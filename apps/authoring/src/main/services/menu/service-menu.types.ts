import { Requester } from '..';

export interface MenuEventNewProject
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'new-project';
  name: 'menu/project/new';
}

export interface MenuEventOpenProject
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'open-project';
  name: 'menu/project/open';
}

export interface MenuEventSaveProject
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'save-project';
  name: 'menu/project/save';
}

export interface MenuEventSaveProjectAs
  extends Omit<Requester.RegisterEvent, 'name'> {
  id: 'save-project-as';
  name: 'menu/project/save-as';
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
  | MenuEventNewProject['name']
  | MenuEventOpenProject['name']
  | MenuEventSaveProject['name']
  | MenuEventSaveProjectAs['name']
  | MenuEventImportFile['name']
  | MenuEventAboutOpen['name']
  | MenuEventPreferencesOpen['name'];

export type MenuItemEvent =
  | MenuEventNewProject
  | MenuEventOpenProject
  | MenuEventSaveProject
  | MenuEventSaveProjectAs
  | MenuEventImportFile
  | MenuEventAboutOpen
  | MenuEventPreferencesOpen;

export type MenuItemEventsFile = {
  projectNew: MenuEventNewProject;
  projectOpen: MenuEventOpenProject;
  projectSave: MenuEventSaveProject;
  projectSaveAs: MenuEventSaveProjectAs;
  importFile: MenuEventImportFile;
};

export type MenuEventsFileApi = {
  projectNew: MenuEventNewProject['name'];
  projectOpen: MenuEventOpenProject['name'];
  projectSave: MenuEventSaveProject['name'];
  projectSaveAs: MenuEventSaveProjectAs['name'];
  importFile: MenuEventImportFile['name'];
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
