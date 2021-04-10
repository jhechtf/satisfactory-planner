<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatcher = createEventDispatcher();
  const items = new Array(10).fill(false).map((_,i) => `Item ${i+1}`);
  function onFilterClick(item: any) {
    isOpen = false;
    console.log(item);
  }
  let isOpen: boolean = false;
  let curVal: string = '';
  $: filtered = items.filter(item => item.includes(curVal))
  
</script>

<div class="filtering flex flex-col border border-gray-500">
  <div class="filtering-input">
    <input type="text" class="w-full dark:bg-gray-800 dark:text-gray-300 xl:px-2" on:focus={() => isOpen = true} bind:value={curVal}>
  </div>
  <div class="filtering-items overflow-y-auto max-h-32 xl:max-h-48" class:hidden={!isOpen}>
    {#each filtered as item, index}
      <div on:click={() => onFilterClick(item) } class="filtering-item p-1" class:border-t={index!=0} class:border-gray-500={index!=0}>{item}</div>
    {/each}
  </div>
</div>