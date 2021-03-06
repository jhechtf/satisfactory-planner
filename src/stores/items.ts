import Item, { ItemType } from '../classes/item';
import { readable } from 'svelte/store';
import type { ItemsInterface } from 'types/json';

const quickMap = {
  RF_SOLID: ItemType.SOLID,
  RF_LIQUID: ItemType.LIQUID,
  RF_GAS: ItemType.GAS
};

export default readable<Map<string, Item>>(new Map<string, Item>(), (set) => {
  import('../data/items.json')
    .then((res) => {
      for (const imp of (res.default as ItemsInterface[])) {
        new Item(imp.name, imp.id, imp.description, quickMap[imp.type], !!imp.isRaw);
      }
      set(Item.allItems);
    })
    .catch(console.error);
  if (import.meta.hot) {
    import.meta.hot.accept(() => set(new Map<string, Item>()));
  }
});