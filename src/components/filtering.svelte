<script lang="ts">
  
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatcher = createEventDispatcher();
  
  function onFilterClick(item: any) {
    if(mode === 'single') isOpen = false;
    selected = mode === 'single' ? [item] : selected.concat(item)
    dispatcher('selection', {
      selection: selected
    });
  }

  let isOpen: boolean = false;
  export let onFilter: (item: any, value: string) => boolean = (item, value) => {
    return JSON.stringify(item).toLowerCase().includes(value.toLowerCase());
  }
  export let value: string = '';
  export let items: any[] = [];
  export let selected: any[] = [];
  export let mode: 'single' | 'multi' = 'single';
  export let placeholder = '';
  export let getLabel = (item: any) => item?.label || item?.key;

  let el: HTMLElement;
  let input: HTMLInputElement;

  $: filtered = items.filter((i) => onFilter(i, value));
  onMount(() => {
    // in order to remove the event later we have to have it in-memory or it will fail.
    const fn = (e: MouseEvent) => {
      if(isOpen && e.target !== null && !el?.contains(e.target as Node)) isOpen = false;
    };
    // Add the event
    document.addEventListener('click', fn);
    () => {
      document.removeEventListener('click', fn);
    }
  });
</script>

<style>
  .selected {
    @apply bg-gray-600;
  }
  
</style>

<div class="filtering flex flex-col border border-gray-500" bind:this={el}>
  <div class="filtering-label relative px-2" on:click={() => {isOpen = true; input?.focus()}}>
    <div class="flex justify-between">
      <div class="left">
        {#if selected.length === 0}
          {placeholder}
        {:else}
          {selected.map(getLabel).join(',')}
        {/if}
      </div>
      <div class="right">
        <span class="hover:text-red-500 text-red-400 text-lg cursor-pointer" class:hidden={selected.length === 0} on:click={() => {selected = [], value = ''}}>&times;</span>
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
      <input bind:this={input} type="text" class="w-full outline-none dark:bg-gray-800 dark:text-gray-300 md:px-2 xl:px-2" on:focus={() => isOpen = true} bind:value={value}>
    </div>
    <div class="filtering-items w-full absolute top-8 overflow-y-auto max-h-40 xl:max-h-60 bg-black z-50">
      {#each filtered as item, index}
        <div on:click={() => onFilterClick(item) } class="cursor-pointer filtering-item p-1" class:selected={selected.includes(item)} class:border-t={index!=0} class:border-gray-500={index!=0}>
          <slot name="filtering-item" item={item} index={index}>
            {getLabel(item)}
          </slot>
        </div>
      {:else}
        <div class="filtering-item p-1 border-gray-500">
          <slot name="no-match">
            No items match your search.
          </slot>
        </div>
      {/each}
    </div>
  </div>
</div>