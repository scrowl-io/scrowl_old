import { requester } from '..';
import { ApiResult } from '../../../main/services/requester'
import { MenuEventGlobalApi, MenuItems } from '../../../main/services/menu'

export const ENDPOINTS:MenuEventGlobalApi = {
  itemList: 'menu/items',
  itemDisable: 'menu/item/disable',
  itemToggle: 'menu/item/toggle',
};

export let ITEMS:MenuItems = {};

export const init = () => {
  requester.invoke(ENDPOINTS.itemList).then((result: ApiResult) => {

    if (result.error) {
      console.error(result);
    }

    ITEMS = result.data.items;
  });
};

const isMenuInitialized = () => {
  return Object.keys(ITEMS).length > 0;
}

export const disable = (item: keyof typeof ITEMS) => {
  return new Promise<ApiResult>(resolve => {

    if (!isMenuInitialized) {
      resolve({
        error: true,
        message: `Unable to disable item: ${item} - Menu not initialized`
      });
      return;
    }

    if (!ITEMS[item]) {
      resolve({
        error: true,
        message: `Unable to disable item: ${item} - Item not found`,
        data: {
          items: ITEMS
        }
      });
      return;
    }

    requester.invoke(ENDPOINTS.itemDisable, ITEMS[item]).then(resolve);
  });
};

export const toggle = (item: keyof typeof ITEMS) => {
  return new Promise<ApiResult>(resolve => {

    if (!isMenuInitialized) {
      resolve({
        error: true,
        message: `Unable to toggle item: ${item} - Menu not initialized`
      });
      return;
    }

    if (!ITEMS[item]) {
      resolve({
        error: true,
        message: `Unable to toggle item: ${item} - Item not found`,
        data: {
          items: ITEMS
        }
      });
      return;
    }

    requester.invoke(ENDPOINTS.itemToggle, ITEMS[item]).then(resolve);
  });
};

export default {
  ITEMS,
  init,
  disable,
  toggle,
};
