import { readable } from 'svelte/store';
import Item from './classes/item';

export const items = readable(Item.allItems, (set) => {
  import('./data/items.json')
    .then((res) => {
      const data = res.default as any[];
      data.forEach(({ name, stackSize }) => Item.findOrCreate(name, stackSize));
      set(Item.allItems);
    });
});