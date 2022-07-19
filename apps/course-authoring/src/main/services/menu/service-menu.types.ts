export type MenuItemNewProject = {
  id: 'new-project';
  event: 'menu/new-project';
}

export type MenuItemSaveProject = {
  id: 'save-project';
  event: 'menu/save-project';
}

export type MenuItemSaveProjectAs = {
  id: 'save-project-as';
  event: 'menu/save-project';
}

export type MenuItemToggleItem = {
  id: 'toggle-itme';
  event: 'menu/toggle-item';
}

export type MenuItemAbout = {
  id: 'about';
  event: 'menu/about';
}

export type MenuItemPreferences = {
  id: 'preferences';
  event: 'menu/preferences';
}

export type MenuItemEvents =
  | MenuItemNewProject["event"]
  | MenuItemSaveProject["event"]
  | MenuItemSaveProjectAs["event"]
  | MenuItemToggleItem["event"]
  | MenuItemAbout["event"]
  | MenuItemPreferences["event"];
  
export type MenuItemIds =
  | MenuItemNewProject["id"]
  | MenuItemSaveProject["id"]
  | MenuItemSaveProjectAs["id"]
  | MenuItemToggleItem["id"]
  | MenuItemAbout["id"]
  | MenuItemPreferences["id"];

export interface MenuItems {
  [key: string]:
    | MenuItemNewProject
    | MenuItemSaveProject
    | MenuItemSaveProjectAs
    | MenuItemToggleItem
    | MenuItemAbout
    | MenuItemPreferences;
}

export interface MenuEvent {
  name: MenuItemEvents;
  type: 'on';
  fn?: Function;
}

export type MenuEvents = Array<MenuEvent>;
