import { derived } from 'svelte/store';
import items from './items';
import recipes from './recipe';
/**
 * @description loading state is derived from the state of the items and recipes. If the recipes have not been loaded yet they size and length of them will be zero.
 * Therefore, we set the boolean value to be true 
 */
export default derived([items, recipes], ([$items, $recipes], set) => {
  console.log($items.size != 0, $recipes.length != 0);
  set(!($items.size != 0 && $recipes.length != 0));
}, true);