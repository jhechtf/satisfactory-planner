import { derived } from 'svelte/store';
import items from './items';
import recipes from './recipe';
export default derived([items, recipes], ([$items, $recipes], set) => {
  set($items.size > 0 && $recipes.length > 0);
}, true);