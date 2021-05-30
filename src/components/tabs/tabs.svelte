<script lang="ts" context="module">
  import type { Writable } from 'svelte/store';
  export interface TabsContext {
    addTab(id: string, tab: string): void;
    currentTab: Writable<string>;
    setCurrentTab(current: string): void;
    removeTab(tab: string): void;
  }
</script>
<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  let tabs: { [key: string]: string } = { };
  export let currentTab = '';
  let tabStore = writable(currentTab);

  setContext<TabsContext>('tabs', {
    addTab(id: string, tab: string) {
      if(Object.keys(tabs).length === 0) {
        currentTab = id;
        tabStore.update(()=> id);
      }
      tabs[id] = tab;
    },
    currentTab: tabStore,
    setCurrentTab(currentId: string) {
      tabStore.update(()=>currentId);
    },
    removeTab(tabId: string) {
      delete tabs[tabId];
    }
  });

  $: currentTab = $tabStore;

</script>

<style>
  .active-tab {
    font-weight: bold;
    @apply border-b-4 border-blue-400;
  }
  .tab-header > div {
    cursor: pointer;
  }
  .tabs {
    @apply mt-4;
  }
</style>
<div class="tabs">
  <div class="tab-header text-lg flex items-stretch">
    {#each Object.entries(tabs) as [id, value], index}
      <div
        class="p-2"
        class:active-tab={currentTab === id}
        on:click={() => tabStore.update(() => id)}
      >
        {value}
      </div>
    {/each}
  </div>
  <div class="tab-body">
    <slot></slot>
  </div>
</div>