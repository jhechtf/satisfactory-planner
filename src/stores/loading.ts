import { derived } from 'svelte/store';
import items from './items';
import recipes from './recipe';
export default derived([items, recipes], ([$items, $recipes], set) => {
  setTimeout(() => set(false), 5000)
}, true);