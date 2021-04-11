<script context="module" lang="ts">
  export interface Item {
    key: any;
    label: string;
  }
</script>
<script lang="ts">
  
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatcher = createEventDispatcher();
  
  function onFilterClick(item: Item) {
    if(mode === 'single') isOpen = false;
    selected = mode === 'single' ? [item] : selected.concat(item)
    dispatcher('selection', {
      selection: selected
    });
  }
  let isOpen: boolean = false;
  export let value: string = '';
  export let items: Item[] = [];
  export let selected: Item[] = [];
  export let mode: 'single' | 'multi' = 'single';
  export let placeholder = '';
  let el: HTMLElement;
  $: filtered = items.filter(item =>  item.label.toLowerCase().includes(value.toLowerCase()));
  onMount(() => {
    // in order to remove the event later we have to have it in-memory or it will fail.
    const fn = (e: MouseEvent) => {
      console.log(el, e.target);
      // if(e.target !== null && !el.contains(e.target as Node)) isOpen = false;
    };
    // Add the event
    document.addEventListener('click', fn);
    () => {
      document.removeEventListener('click', fn);
    }
  })
</script>

<style>
  .selected {
    @apply bg-gray-600;
  }
  
</style>

<div class="filtering flex flex-col border border-gray-500" bind:this={el}>
  <div class="filtering-label relative px-2" on:click={() => isOpen = true}>
    <div class="flex justify-between">
      <div class="left">
        {#if selected.length === 0}
          {placeholder}
        {:else}
          {selected.map(v => v.label).join(',')}
        {/if}
      </div>
      <div class="right">
        <span class="hover:text-red-500 text-red-400 text-lg" class:hidden={selected.length === 0} on:click={() => {selected = [], value = ''}}>&times;</span>
        {#if isOpen}
        &bigtriangleup;
        {:else}
        &bigtriangledown;
        {/if}
      </div>
    </div>
  </div>
  <div class="filtering-dropdown relative" class:hidden={!isOpen}>
    <div class="filtering-input relative">
      <input type="text" class="w-full outline-none dark:bg-gray-800 dark:text-gray-300 md:px-2 xl:px-2" on:focus={() => isOpen = true} bind:value={value}>
    </div>
    <div class="filtering-items w-full absolute top-8 overflow-y-auto max-h-40 xl:max-h-60">
      {#each filtered as item, index}
        <div on:click={() => onFilterClick(item) } class="cursor-pointer filtering-item p-1" class:selected={selected.some(s => s.key === item.key)} class:border-t={index!=0} class:border-gray-500={index!=0}>{item.label}</div>
      {:else}
        <div class="filtering-item p-1 border-gray-500">No Items</div>
      {/each}
    </div>
  </div>
</div>